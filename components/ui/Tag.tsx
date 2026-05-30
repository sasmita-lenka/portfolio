import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-hairline bg-surface px-3 py-1 text-xs text-ink/80">
      {children}
    </span>
  );
}
