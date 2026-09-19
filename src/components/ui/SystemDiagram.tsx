import { cn } from "@/lib/utils";

interface SystemDiagramProps {
  className?: string;
}

const TILES = [
  { x: 76, y: 33 }, // above
  { x: 171, y: 128 }, // right
  { x: 76, y: 223 }, // below
];

/** White 36×36 document tile with a small accent glyph. */
function DocTile({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width="36" height="36" fill="var(--bg-raised)" />
      <rect x={x + 10} y={y + 10} width="16" height="5" fill="var(--spine)" />
      <rect x={x + 10} y={y + 18} width="16" height="2" fill="var(--spine)" opacity="0.5" />
      <rect x={x + 10} y={y + 23} width="11" height="2" fill="var(--spine)" opacity="0.5" />
    </g>
  );
}

/**
 * Generated system diagram: a hatched accent square with corner brackets,
 * three document tiles, and dotted connectors. No raster assets.
 */
export function SystemDiagram({ className }: SystemDiagramProps) {
  return (
    <svg
      viewBox="0 0 230 292"
      className={cn("h-auto w-full", className)}
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <pattern
          id="diagram-hatch"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="5" height="10" fill="var(--spine-hatch)" />
        </pattern>
      </defs>

      {/* dotted lines entering from the left */}
      <path
        d="M0 138H30M0 154H30"
        stroke="var(--border-strong)"
        strokeWidth="1"
        strokeDasharray="2 3"
      />

      {/* connectors */}
      <path
        d="M94 69V78M158 146H167M94 210V219"
        stroke="var(--border-strong)"
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      <path d="M94 82L91 77H97L94 82Z" fill="var(--border-strong)" />
      <path d="M171 146L166 143V149L171 146Z" fill="var(--border-strong)" />
      <path d="M94 223L91 218H97L94 223Z" fill="var(--border-strong)" />

      {/* central square */}
      <rect x="30" y="82" width="128" height="128" fill="var(--spine)" />
      <rect x="30" y="82" width="128" height="128" fill="url(#diagram-hatch)" opacity="0.45" />

      {/*
        Corner brackets straddle the square's corners rather than sitting
        fully outside it — white on paper would be invisible, so the visible
        arm has to fall on the accent fill.
      */}
      <path
        d="M38 116V90H72M116 90H150V116M38 176V202H72M116 202H150V176"
        stroke="var(--bg-raised)"
        strokeWidth="2"
      />

      {/* centre glyph */}
      <rect x="75" y="127" width="38" height="38" fill="var(--bg-raised)" />
      <rect x="83" y="135" width="9" height="9" fill="var(--spine)" />
      <rect x="96" y="135" width="9" height="9" fill="var(--spine)" opacity="0.55" />
      <rect x="83" y="148" width="22" height="9" fill="var(--spine)" opacity="0.8" />

      {TILES.map((tile) => (
        <DocTile key={`${tile.x}-${tile.y}`} x={tile.x} y={tile.y} />
      ))}
    </svg>
  );
}
