import { cn } from "@/lib/utils";
import { DitherAvatar } from "@/components/ui/DitherAvatar";
import { SplitLines } from "@/components/ui/SplitLines";

interface FounderNoteProps {
  name: string;
  role: string;
  /** One entry per rendered line. */
  message: string[];
  className?: string;
}

/** Avatar + attribution + a short mono note. Recurs in the rail of several sections. */
export function FounderNote({ name, role, message, className }: FounderNoteProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <DitherAvatar size={32} />

      <p className="font-mono text-[13px] text-faint uppercase">
        {name}, {role}
      </p>

      <p className="font-mono text-label leading-[1.45] text-text-primary uppercase">
        <SplitLines lines={message} />
      </p>
    </div>
  );
}
