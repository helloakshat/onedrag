import { cn } from "@/lib/utils";

interface TopoTextureProps {
  className?: string;
  /** Dot spacing multiplier — higher is denser. */
  density?: number;
}

const WIDTH = 1920;
const HEIGHT = 260;
const STEP = 8;

interface Ridge {
  base: number;
  amp: number;
  freq: number;
  phase: number;
}

/**
 * Frequencies are non-harmonic and phases solved so each ridge's dominant
 * crest owns its own zone of the 1920 band (x ≈ 304 / 496 / 1264 / 1696)
 * instead of bunching at one end.
 */
const RIDGES: Ridge[] = [
  { base: 150, amp: 52, freq: 0.0072, phase: 5.36 },
  { base: 182, amp: 42, freq: 0.00877, phase: 2.82 },
  { base: 210, amp: 32, freq: 0.0131, phase: 4.01 },
  { base: 234, amp: 24, freq: 0.01572, phase: 5.79 },
];

/** Layered sines stand in for a ridge line — deterministic, no randomness. */
function ridgeAt(x: number, r: Ridge) {
  return (
    r.base -
    (Math.sin(x * r.freq + r.phase) * r.amp +
      Math.sin(x * r.freq * 2.3 + r.phase * 1.7) * r.amp * 0.4 +
      Math.sin(x * r.freq * 0.47 + r.phase * 0.3) * r.amp * 0.3)
  );
}

function buildRidge(r: Ridge) {
  const points: string[] = [];
  let minY = HEIGHT;

  for (let x = 0; x <= WIDTH; x += STEP) {
    const y = ridgeAt(x, r);
    if (y < minY) minY = y;
    points.push(`${x},${y.toFixed(1)}`);
  }

  return {
    path: `M0,${HEIGHT} L${points.join(" L")} L${WIDTH},${HEIGHT} Z`,
    minY,
  };
}

/**
 * Dot-matrix mountain range: overlapping ridge silhouettes filled with a dot
 * halftone and masked by a vertical fade, so dots read dense along each
 * crest and thin out toward the base. Generated SVG, no raster images.
 *
 * Desktop only. preserveAspectRatio="none" is what keeps the ridges spanning
 * the full width, but it scales x and y independently — below md the band is
 * far wider than it is tall, which stretches the halftone circles into
 * obvious ellipses. Cheaper to drop the decor than to fake round dots.
 */
export function TopoTexture({ className, density = 1 }: TopoTextureProps) {
  const spacing = 7 / density;
  const ridges = RIDGES.map(buildRidge);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      className={cn("pointer-events-none hidden h-full w-full md:block", className)}
      aria-hidden="true"
    >
      <defs>
        <pattern id="topo-dots" width={spacing} height={spacing} patternUnits="userSpaceOnUse">
          <circle cx={spacing / 2} cy={spacing / 2} r={1.7} fill="var(--topo)" />
        </pattern>

        {ridges.map((ridge, i) => (
          // fade runs from each crest all the way to the base of the band —
          // stopping short of it left most of the wash invisible
          <linearGradient
            key={`grad-${i}`}
            id={`topo-fade-${i}`}
            x1="0"
            y1={ridge.minY}
            x2="0"
            y2={HEIGHT}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        ))}

        {ridges.map((_, i) => (
          <mask key={`mask-${i}`} id={`topo-mask-${i}`}>
            <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill={`url(#topo-fade-${i})`} />
          </mask>
        ))}
      </defs>

      {ridges.map((ridge, i) => (
        <g key={`ridge-${i}`} mask={`url(#topo-mask-${i})`}>
          <path d={ridge.path} fill="url(#topo-dots)" />
        </g>
      ))}
    </svg>
  );
}
