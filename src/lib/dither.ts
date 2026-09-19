/** Ordered-dither threshold matrix — gives the 1-bit halftone its structure. */
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

/**
 * Builds one SVG path covering every "on" cell of a dithered field.
 *
 * A single <path> rather than thousands of <rect> nodes — the halftones
 * would otherwise blow past a sane DOM node count and cost us the
 * Lighthouse performance gate.
 */
export function ditherPath(
  cols: number,
  rows: number,
  intensity: (nx: number, ny: number) => number,
): string {
  let d = "";

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const value = intensity((x + 0.5) / cols, (y + 0.5) / rows);
      const threshold = (BAYER[y % 4][x % 4] + 0.5) / 16;
      if (value > threshold) d += `M${x} ${y}h1v1h-1z`;
    }
  }

  return d;
}

/**
 * Deterministic tonal field from a seed string — a vignette plus layered
 * waves, which reads as a high-contrast photo once dithered.
 */
export function seededField(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 997;

  const a = (h % 13) / 13;
  const b = ((h >> 2) % 7) / 7;
  const c = ((h >> 4) % 11) / 11;

  return (nx: number, ny: number) => {
    const vignette = 1 - Math.hypot(nx - 0.5, ny - 0.45) * 1.55;
    const waves =
      Math.sin(nx * 6 + a * 6) * 0.18 +
      Math.sin(ny * 5 + b * 6) * 0.16 +
      Math.sin(nx * 11 + ny * 7 + c * 6) * 0.12;

    return vignette * 0.92 + waves + 0.2;
  };
}
