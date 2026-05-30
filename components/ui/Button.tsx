import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  download?: boolean;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const base =
  "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium cursor-pointer " +
  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

const variants = {
  solid: "bg-accent text-paper border border-accent hover:opacity-90",
  ghost: "bg-transparent text-ink border border-hairline hover:border-ink",
};

export function Button({ href, children, variant = "solid", download, ...rest }: ButtonProps) {
  return (
    <a
      href={href}
      download={download}
      className={`${base} ${variants[variant]}`}
      {...rest}
    >
      {children}
    </a>
  );
}
