import type { ReactNode } from "react";

export function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-end gap-3 border-b border-border pb-3">
      <h2 className="skew-title text-xl leading-none md:text-2xl">{title}</h2>
      {subtitle && (
        <span className="pb-0.5 text-[10px] text-muted-foreground md:text-xs">
          {subtitle}
        </span>
      )}
    </div>
  );
}

export function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full space-y-4 p-4 md:p-5 pb-10">{children}</div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-secondary/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground md:px-2.5 md:py-1 md:text-[11px]">
      {children}
    </span>
  );
}
