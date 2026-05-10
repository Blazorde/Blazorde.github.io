"use client";

import { useState } from "react";
import { PortfolioThemeProvider, usePortfolioTheme } from "./theme";
import { IconRail } from "./components/IconRail";
import { StatusBar } from "./components/StatusBar";
import { HomeSection } from "./components/HomeSection";
import { AboutMeSection } from "./components/AboutMeSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { CVSection } from "./components/CVSection";
import { TimelineSection } from "./components/TimelineSection";
import { StatsSection } from "./components/StatsSection";

export function PortfolioApp() {
  return (
    <PortfolioThemeProvider>
      <PortfolioSurface />
    </PortfolioThemeProvider>
  );
}

function PortfolioSurface() {
  const [activeSection, setActiveSection] = useState("home");
  const { color, mode, isDarkMode, setColor, setMode } = usePortfolioTheme();
  const theme = isDarkMode ? "dark" : "light";

  const handleCommand = (cmd: string) => {
    const sectionMap: Record<string, string> = {
      projects: "projects",
      about: "about",
      contact: "about",
      skills: "cv",
      cv: "cv",
      timeline: "timeline",
      stats: "stats",
    };

    if (sectionMap[cmd]) {
      setActiveSection(sectionMap[cmd]);
    }
  };

  return (
    <div className={`portfolio-shell ${color} ${isDarkMode ? "dark dark-shell" : "light"} relative flex h-screen w-full overflow-hidden`}>
      <IconRail
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        color={color}
        mode={mode}
        theme={theme}
        onColorChange={setColor}
        onModeChange={setMode}
      />

      <div className="relative z-[1] flex min-w-0 flex-1 flex-col">
        <main className="relative min-h-0 flex-1 overflow-hidden">
          {activeSection === "home" && <HomeSection theme={theme} onCommand={handleCommand} />}
          {activeSection === "about" && <AboutMeSection theme={theme} />}
          {activeSection === "cv" && <CVSection theme={theme} />}
          {activeSection === "projects" && <ProjectsSection theme={theme} />}
          {activeSection === "timeline" && <TimelineSection theme={theme} />}
          {activeSection === "stats" && <StatsSection theme={theme} />}
        </main>

        <StatusBar color={color} mode={mode} theme={theme} />
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink { animation: blink 1.2s step-end infinite; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp { animation: slideUp 0.5s ease-out forwards; opacity: 0; }

        ::-webkit-scrollbar { width: 7px; height: 7px; }
        ::-webkit-scrollbar-track { background: ${theme === "dark" ? "#0f172a" : "#eaf1fb"}; }
        ::-webkit-scrollbar-thumb {
          background: ${theme === "dark" ? "#334155" : "#b7c7df"};
          border-radius: 999px;
        }
        ::-webkit-scrollbar-thumb:hover { background: ${theme === "dark" ? "#60a5fa" : "#3b82f6"}; }
      `}</style>
    </div>
  );
}
