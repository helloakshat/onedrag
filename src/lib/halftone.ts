/** 4×4 ordered-dither threshold matrix. */
const BAYER4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

/** Darkness field: 0 = white, 1 = black. */
export type Field = (nx: number, ny: number) => number;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

function ellipse(nx: number, ny: number, cx: number, cy: number, rx: number, ry: number) {
  const dx = (nx - cx) / rx;
  const dy = (ny - cy) / ry;
  return dx * dx + dy * dy;
}

function seedOf(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 9973;
  return h;
}

/**
 * Head-and-shoulders portrait. Tones are built as *darkness* so the lit
 * side of the face stays open and the hair mass reads solid once dithered.
 */
export function portraitField(seed: string): Field {
  const h = seedOf(seed);
  const tilt = ((h % 17) / 17 - 0.5) * 0.06;
  const headY = 0.38 + ((h >> 3) % 7) / 7 * 0.03;

  return (nx, ny) => {
    const x = nx + tilt * (ny - 0.5);

    // backdrop: light at top-left, falling away to the corners
    let v = 0.2 + ny * 0.22 + Math.abs(x - 0.45) * 0.18;

    // shoulders / torso mass rising from the bottom
    if (ellipse(x, ny, 0.5, 1.06, 0.46, 0.4) < 1) v = 0.62 - (1 - ny) * 0.12;

    // neck
    if (ellipse(x, ny, 0.5, headY + 0.3, 0.085, 0.13) < 1) v = 0.5;

    // head — lit from upper left
    if (ellipse(x, ny, 0.5, headY, 0.2, 0.26) < 1) {
      const light = (x - 0.34) * 0.6 + (ny - headY + 0.24) * 0.5;
      v = 0.16 + clamp01(light) * 0.42;

      // eye sockets and brow give the face something to read as features
      if (ellipse(x, ny, 0.43, headY - 0.05, 0.035, 0.022) < 1) v += 0.34;
      if (ellipse(x, ny, 0.57, headY - 0.05, 0.035, 0.022) < 1) v += 0.34;
      // mouth shadow
      if (ellipse(x, ny, 0.5, headY + 0.13, 0.05, 0.018) < 1) v += 0.2;
    }

    // hair cap over the top of the skull
    if (ellipse(x, ny, 0.5, headY - 0.06, 0.215, 0.235) < 1 && ny < headY + 0.02) {
      const edge = ellipse(x, ny, 0.5, headY + 0.02, 0.17, 0.2);
      if (edge > 0.9) v = 0.88;
    }

    return clamp01(v);
  };
}

/** Abstract landscape used for case-study covers. */
export function sceneField(seed: string): Field {
  const h = seedOf(seed);
  const a = (h % 11) / 11;
  const b = ((h >> 4) % 13) / 13;

  return (nx, ny) => {
    const horizon = 0.58 + Math.sin(nx * 3 + a * 6) * 0.03;

    if (ny < horizon) {
      // sky, brightest near a low sun
      const sun = Math.hypot((nx - (0.28 + a * 0.4)) * 1.5, ny - horizon * 0.55);
      return clamp01(0.42 - (1 - ny / horizon) * 0.18 + sun * 0.5 - 0.25);
    }

    // terrain: layered ridges getting darker toward the foreground
    const depth = (ny - horizon) / (1 - horizon);
    const ridge = Math.sin(nx * 7 + b * 6) * 0.05 + Math.sin(nx * 3.3 + a * 4) * 0.07;
    return clamp01(0.45 + depth * 0.45 + ridge);
  };
}

/**
 * Renders a field as a 1-bit halftone path.
 *
 * Values are normalised to the field's actual range and pushed through a
 * contrast curve first, otherwise midtones collapse and the subject turns
 * into noise. Horizontal runs are merged into single rects so the path
 * stays small enough to ship inline.
 */
export function halftonePath(cols: number, rows: number, field: Field, contrast = 1.35) {
  const values = new Float32Array(cols * rows);
  let min = Infinity;
  let max = -Infinity;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const v = field((x + 0.5) / cols, (y + 0.5) / rows);
      values[y * cols + x] = v;
      if (v < min) min = v;
      if (v > max) max = v;
    }
  }

  const range = max - min || 1;
  let d = "";

  for (let y = 0; y < rows; y++) {
    let runStart = -1;

    for (let x = 0; x <= cols; x++) {
      let on = false;

      if (x < cols) {
        const normalised = (values[y * cols + x] - min) / range;
        // S-curve around the midpoint so midtones keep their structure
        const adjusted = clamp01((normalised - 0.5) * contrast + 0.5);
        on = adjusted > (BAYER4[y % 4][x % 4] + 0.5) / 16;
      }

      if (on && runStart === -1) runStart = x;
      if (!on && runStart !== -1) {
        d += `M${runStart} ${y}h${x - runStart}v1h${runStart - x}z`;
        runStart = -1;
      }
    }
  }

  return d;
}
