"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";

export type ColorTheme = "default" | "blue" | "green" | "purple" | "orange" | "red";
export type DarkMode = "light" | "dark" | "system";

type ThemeContextValue = {
  color: ColorTheme;
  mode: DarkMode;
  isDarkMode: boolean;
  setColor: (color: ColorTheme) => void;
  setMode: (mode: DarkMode) => void;
};

const colorThemes: ColorTheme[] = ["default", "blue", "green", "purple", "orange", "red"];
const modes: DarkMode[] = ["light", "dark", "system"];
const ThemeContext = createContext<ThemeContextValue | null>(null);
const defaultSnapshot = "blue|light|0";
const themeChangeEvent = "portfolio-theme-change";

function readStoredThemeSnapshot() {
  if (typeof window === "undefined") {
    return defaultSnapshot;
  }

  const storedColor = window.localStorage.getItem("portfolio-color") as ColorTheme | null;
  const storedMode = window.localStorage.getItem("portfolio-mode") as DarkMode | null;
  const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const color = storedColor && colorThemes.includes(storedColor) ? storedColor : "blue";
  const mode = storedMode && modes.includes(storedMode) ? storedMode : "light";

  return `${color}|${mode}|${systemDarkMode ? "1" : "0"}`;
}

function subscribeToThemeChanges(onChange: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  window.addEventListener("storage", onChange);
  window.addEventListener(themeChangeEvent, onChange);
  mediaQuery.addEventListener("change", onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(themeChangeEvent, onChange);
    mediaQuery.removeEventListener("change", onChange);
  };
}

function parseThemeSnapshot(snapshot: string) {
  const [rawColor, rawMode, rawSystemDarkMode] = snapshot.split("|");
  const color = colorThemes.includes(rawColor as ColorTheme) ? (rawColor as ColorTheme) : "blue";
  const mode = modes.includes(rawMode as DarkMode) ? (rawMode as DarkMode) : "light";

  return {
    color,
    mode,
    systemDarkMode: rawSystemDarkMode === "1",
  };
}

function writeThemePreference(key: "portfolio-color" | "portfolio-mode", value: string) {
  window.localStorage.setItem(key, value);
  window.dispatchEvent(new Event(themeChangeEvent));
}

export function PortfolioThemeProvider({ children }: { children: React.ReactNode }) {
  const snapshot = useSyncExternalStore(subscribeToThemeChanges, readStoredThemeSnapshot, () => defaultSnapshot);
  const { color, mode, systemDarkMode } = parseThemeSnapshot(snapshot);
  const isDarkMode = mode === "dark" || (mode === "system" && systemDarkMode);

  useEffect(() => {
    document.documentElement.classList.remove(
      "default",
      "blue",
      "green",
      "purple",
      "orange",
      "red",
      "light",
      "dark",
    );
    document.documentElement.classList.add(color, isDarkMode ? "dark" : "light");
  }, [color, mode, isDarkMode]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      color,
      mode,
      isDarkMode,
      setColor: (nextColor) => writeThemePreference("portfolio-color", nextColor),
      setMode: (nextMode) => writeThemePreference("portfolio-mode", nextMode),
    }),
    [color, mode, isDarkMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function usePortfolioTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("usePortfolioTheme must be used within PortfolioThemeProvider");
  }

  return context;
}
