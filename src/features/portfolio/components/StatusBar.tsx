import type { ColorTheme, DarkMode } from "../theme";

interface StatusBarProps {
  color: ColorTheme;
  mode: DarkMode;
  theme: 'light' | 'dark';
}

export function StatusBar({ color, mode, theme }: StatusBarProps) {
  return (
    <div className="absolute bottom-3 left-3 z-[3] flex max-w-[calc(100%-24px)] items-center gap-3 rounded-2xl border border-border/70 bg-card/70 px-3.5 py-2 text-[11px] font-semibold text-muted-foreground shadow-[0_14px_38px_rgba(15,23,42,0.18)] backdrop-blur-xl">
      <div className="flex items-center gap-2 text-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_color-mix(in_srgb,var(--primary)_70%,transparent)]" />
        <span>En ligne</span>
      </div>
      <div className="hidden h-4 w-px bg-border sm:block" />
      <div className="hidden whitespace-nowrap sm:block">React · TypeScript · Tailwind</div>
      <div className="h-4 w-px bg-border" />
      <div className="whitespace-nowrap">FR · {color} · {mode === "system" ? `system/${theme}` : mode}</div>
    </div>
  );
}
