"use client";

import { Moon, Sun } from "lucide-react";

import { useI18n } from "@/components/i18n/i18n-provider";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { mounted, theme, toggleTheme } = useTheme();
  const { dictionary } = useI18n();
  const isDark = mounted && theme === "dark";
  const label = isDark ? dictionary.theme.activateLight : dictionary.theme.activateDark;

  return (
    <button
      type="button"
      className="grid size-11 cursor-pointer place-items-center rounded-full text-[var(--on-surface-variant)] transition-colors hover:bg-[var(--surface-container-high)] hover:text-[var(--on-surface)]"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      {isDark ? <Sun aria-hidden="true" size={20} /> : <Moon aria-hidden="true" size={20} />}
    </button>
  );
}
