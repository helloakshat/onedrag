"use client";

import { useEffect, useRef } from "react";
import { BAYER4, DITHER_CONTRAST } from "@/lib/halftone";
import { cn } from "@/lib/utils";

interface DitheredCoverProps {
  /** Public path to the source image. */
  src: string;
  alt: string;
  /** Target dithered pixel size in CSS px — see CLAUDE.md §8. */
  pixel?: number;
  className?: string;
}

/** "#202020" -> [32, 32, 32]; falls back to black if the token is missing. */
function rgbOf(token: string): [number, number, number] {
  const hex = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return [0, 0, 0];
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/**
 * The real cover path: a source image run through the same 4×4 ordered
 * dither the generated stand-ins use (CLAUDE.md §8). Contrast is normalised
 * against the image's own range first, so a flat photograph still resolves
 * into a readable subject rather than an even field of dots.
 *
 * Drawn at one canvas pixel per dithered pixel and scaled up with
 * `image-rendering: pixelated`, so the pixels stay square at any width.
 */
export function DitheredCover({ src, alt, pixel = 3, className }: DitheredCoverProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    let cancelled = false;
    const img = new Image();
    img.decoding = "async";

    img.onload = () => {
      if (cancelled) return;

      const width = canvas.getBoundingClientRect().width || img.width;
      const cols = Math.max(24, Math.round(width / pixel));
      const rows = Math.max(24, Math.round((cols * img.height) / img.width));

      // sample the source down to one sample per dithered pixel
      const src2d = document.createElement("canvas");
      src2d.width = cols;
      src2d.height = rows;
      const sctx = src2d.getContext("2d", { willReadFrequently: true });
      if (!sctx) return;
      sctx.drawImage(img, 0, 0, cols, rows);
      const data = sctx.getImageData(0, 0, cols, rows).data;

      // luminance as darkness, 0 = white, 1 = black
      const lum = new Float32Array(cols * rows);
      let min = Infinity;
      let max = -Infinity;
      for (let i = 0; i < cols * rows; i++) {
        const r = data[i * 4];
        const g = data[i * 4 + 1];
        const b = data[i * 4 + 2];
        const v = 1 - (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        lum[i] = v;
        if (v < min) min = v;
        if (v > max) max = v;
      }
      const range = max - min || 1;

      const ink = rgbOf("--dark");
      const paper = rgbOf("--bg-raised");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = cols;
      canvas.height = rows;
      const out = ctx.createImageData(cols, rows);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          // stretch to the full range, then push away from mid grey
          const n = (lum[i] - min) / range;
          const v = 0.5 + (n - 0.5) * DITHER_CONTRAST;
          const on = v > (BAYER4[y % 4][x % 4] + 0.5) / 16;
          const [r, g, b] = on ? ink : paper;
          out.data[i * 4] = r;
          out.data[i * 4 + 1] = g;
          out.data[i * 4 + 2] = b;
          out.data[i * 4 + 3] = 255;
        }
      }

      ctx.putImageData(out, 0, 0);
    };

    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src, pixel]);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={alt}
      style={{ imageRendering: "pixelated" }}
      className={cn("block h-full w-full bg-bg-raised", className)}
    />
  );
}
