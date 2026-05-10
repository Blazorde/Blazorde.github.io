"use client";

import Image from "next/image";
import { useState } from "react";
import type { ColorTheme, DarkMode } from "../theme";

interface IconRailProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  color: ColorTheme;
  mode: DarkMode;
  theme: 'light' | 'dark';
  onColorChange: (color: ColorTheme) => void;
  onModeChange: (mode: DarkMode) => void;
}

type IconProps = {
  className?: string;
};

const iconPaths: Record<string, string[]> = {
  home: [
    'M3 10.5 12 3l9 7.5',
    'M5 9.5V21h5v-6h4v6h5V9.5',
  ],
  user: [
    'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
    'M4 21a8 8 0 0 1 16 0',
  ],
  file: [
    'M6 2h8l4 4v16H6Z',
    'M14 2v5h5',
    'M9 13h6',
    'M9 17h6',
  ],
  layers: [
    'M12 3 3 8l9 5 9-5-9-5Z',
    'M3 13l9 5 9-5',
    'M3 18l9 5 9-5',
  ],
  clock: [
    'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z',
    'M12 6v6l4 2',
  ],
  chart: [
    'M4 20h16',
    'M7 17V9',
    'M12 17V5',
    'M17 17v-6',
  ],
  palette: [
    'M12 22a10 10 0 1 1 8.5-4.8c-.7 1.2-2.1 1.3-3.1.4-.9-.8-2.3-.2-2.3 1 0 1.9-1.4 3.4-3.1 3.4Z',
    'M7.5 10.5h.01',
    'M10.5 7.5h.01',
    'M14.5 7.5h.01',
    'M17 11h.01',
  ],
  sun: [
    'M12 4V2',
    'M12 22v-2',
    'm4.93 4.93-1.41-1.41',
    'm20.48 20.48-1.41-1.41',
    'M4 12H2',
    'M22 12h-2',
    'm4.93 19.07-1.41 1.41',
    'm20.48 3.52-1.41 1.41',
    'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  ],
  moon: [
    'M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 7 7 0 1 0 20.5 14.5Z',
  ],
  monitor: [
    'M4 5h16v10H4Z',
    'M8 21h8',
    'M12 15v6',
  ],
};

function RailIcon({ name, className }: IconProps & { name: keyof typeof iconPaths }) {
  return (
    <svg
      className={className}
      fill="none"
      height="16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="16"
      aria-hidden="true"
    >
      {iconPaths[name].map((path) => (
        <path d={path} key={path} />
      ))}
    </svg>
  );
}

const colorOptions: Array<{ value: ColorTheme; label: string; swatch: string }> = [
  { value: 'default', label: 'Défaut', swatch: '#3b82f6' },
  { value: 'blue', label: 'Bleu', swatch: '#3b82f6' },
  { value: 'green', label: 'Vert', swatch: '#10b981' },
  { value: 'purple', label: 'Violet', swatch: '#a855f7' },
  { value: 'orange', label: 'Orange', swatch: '#f97316' },
  { value: 'red', label: 'Rouge', swatch: '#ef4444' },
];

const modeOptions: Array<{ value: DarkMode; label: string; icon: 'sun' | 'moon' | 'monitor' }> = [
  { value: 'light', label: 'Clair', icon: 'sun' },
  { value: 'dark', label: 'Sombre', icon: 'moon' },
  { value: 'system', label: 'Système', icon: 'monitor' },
];

export function IconRail({ activeSection, onSectionChange, color, mode, theme, onColorChange, onModeChange }: IconRailProps) {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const sections = [
    { id: 'home', icon: 'home', label: 'Accueil' },
    { id: 'about', icon: 'user', label: 'À propos' },
    { id: 'cv', icon: 'file', label: 'CV' },
    { id: 'projects', icon: 'layers', label: 'Projets' },
    { id: 'timeline', icon: 'clock', label: 'Timeline' },
    { id: 'stats', icon: 'chart', label: 'Stats' }
  ] as const;

  return (
    <div className={`beeazy-glass z-[2] m-3 mr-0 h-[calc(100vh-24px)] w-[68px] shrink-0 flex flex-col items-center rounded-xl py-5 transition-all duration-300 ${
      theme === 'dark'
        ? 'bg-slate-950/65 border-slate-700/60'
        : 'bg-white/65 border-white/70'
    }`}>
      <div className="mb-8 text-sm font-semibold tracking-tight">
        <span className="text-foreground">t</span>
        <span className="text-primary">.</span>
      </div>

      <div className="flex flex-col gap-1 mb-2">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              data-active={isActive}
              className="rail-action-button relative group"
              title={section.label}
            >
              <RailIcon name={section.icon} className="h-5 w-5 transition-colors duration-200" />
              {isActive && (
                <div className="rail-active-dot" />
              )}
            </button>
          );
        })}
      </div>

      <div className="my-2 h-px w-[18px] bg-border" />

      <a
        className="rail-action-button mb-1"
        href="https://github.com/Blazorde"
        rel="noopener noreferrer"
        target="_blank"
        title="GitHub"
      >
        <Image src="/social/github.svg" alt="GitHub" width={22} height={22} className="h-[22px] w-[22px]" />
      </a>
      <a
        className="rail-action-button"
        href="https://linkedin.com/in/jules-demetz/"
        rel="noopener noreferrer"
        target="_blank"
        title="LinkedIn"
      >
        <Image src="/social/linkedin.svg" alt="LinkedIn" width={22} height={22} className="h-[22px] w-[22px]" />
      </a>

     <div className="relative mt-auto flex flex-col items-center gap-2">
        <button
          onClick={() => setIsThemeMenuOpen((isOpen) => !isOpen)}
          aria-expanded={isThemeMenuOpen}
          aria-label="Ouvrir le menu de personnalisation"
          className="theme-trigger group relative flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card/70 text-primary shadow-[0_12px_28px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-accent/70"
          title="Personnalisation"
        >
          <RailIcon name="palette" className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
          <span
            className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-card shadow-sm"
            style={{ backgroundColor: colorOptions.find((option) => option.value === color)?.swatch ?? "#3b82f6" }}
          />
        </button>

        {isThemeMenuOpen && (
          <div className="beeazy-theme-popover absolute bottom-0 left-[58px] w-[238px] rounded-xl p-3">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <div className="text-[13px] font-semibold text-foreground">Personnalisation</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">Couleur et affichage</div>
              </div>
              <button
                onClick={() => setIsThemeMenuOpen(false)}
                className="beeazy-button beeazy-button-ghost h-7 min-h-7 w-7 rounded-lg p-0 text-[15px]"
                aria-label="Fermer le menu"
                title="Fermer"
              >
                x
              </button>
            </div>

            <div className="mb-3 grid grid-cols-3 gap-2">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onColorChange(option.value);
                    setIsThemeMenuOpen(false);
                  }}
                  data-active={color === option.value}
                  className="theme-color-option"
                  title={option.label}
                  aria-label={`Choisir ${option.label}`}
                >
                  <span className="beeazy-swatch h-5 w-5" style={{ backgroundColor: option.swatch }} />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>

            <div className="h-px w-full bg-border" />

            <div className="mt-3 grid grid-cols-3 gap-2">
              {modeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onModeChange(option.value);
                    setIsThemeMenuOpen(false);
                  }}
                  data-active={mode === option.value}
                  className="theme-mode-option"
                  title={option.label}
                  aria-label={`Mode ${option.label}`}
                >
                  <RailIcon name={option.icon} />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="font-mono text-[9px] tracking-wider text-muted-foreground">
          FR
        </div>
      </div>
    </div>
  );
}
