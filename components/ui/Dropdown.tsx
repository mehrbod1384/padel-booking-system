"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
}

interface ItemProps {
  icon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
  danger?: boolean;
}

export default function Dropdown({ trigger, children }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen(!open)}>{trigger}</div>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg shadow-lg py-1 z-40">
          {children}
        </div>
      )}
    </div>
  );
}

function Item({ icon, children, onClick, danger }: ItemProps) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer flex items-center gap-2 w-full px-3 py-2 text-sm 
      ${danger ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-950" : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-900"}
    `}
    >
      {icon}
      {children}
    </button>
  );
}

Dropdown.item = Item;
