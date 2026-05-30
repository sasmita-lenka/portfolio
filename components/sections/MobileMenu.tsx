"use client";

import { useState } from "react";

type NavLink = { href: string; label: string };

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Menu"
        onClick={() => setOpen((v) => !v)}
        className="cursor-pointer rounded-full border border-hairline px-3 py-1.5 text-sm font-medium"
      >
        Menu
      </button>
      {open && (
        <ul
          id="mobile-menu"
          className="absolute left-0 right-0 top-full mt-2 flex flex-col gap-1 border-y border-hairline bg-paper px-6 py-4"
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block cursor-pointer py-2 text-base text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
