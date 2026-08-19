import type { ReactNode } from "react";

export function ToolBtn({
  children,
  label,
  onClick,
  active,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`rounded-full p-2 transition ${
        active
          ? "bg-lime/20 text-lime"
          : "text-foreground/70 hover:bg-secondary hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
