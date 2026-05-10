"use client";

import { useEffect, useMemo, useState } from "react";
import type { PortfolioProject } from "@features/portfolio/projects";

interface StatsSectionProps {
  theme: "light" | "dark";
}

type ProjectsApiResponse = {
  projects: PortfolioProject[];
  canReadPrivateRepos: boolean;
};

const cvSkills = [
  { name: "Web / HTML / CSS / JavaScript", level: 100, category: "Front-end" },
  { name: "Golang", level: 70, category: "Back-end" },
  { name: "React / TypeScript / Node.js / Next.js", level: 40, category: "Full-stack" },
  { name: "Linux / Bash", level: 80, category: "Système" },
  { name: "Java", level: 40, category: "POO" },
  { name: "C#", level: 40, category: "POO" },
  { name: "Rust", level: 50, category: "CLI" },
  { name: "Docker / Réseaux", level: 55, category: "DevOps" },
];

const cardStyles: Record<string, string> = {
  blue: "from-blue-500/15 to-sky-500/10 border-blue-500/25",
  purple: "from-purple-500/15 to-fuchsia-500/10 border-purple-500/25",
  green: "from-emerald-500/15 to-green-500/10 border-emerald-500/25",
  orange: "from-orange-500/15 to-amber-500/10 border-orange-500/25",
};

const highlightedProjectNames = ["Beeasy", "terminal_rust", "Skyjo", "Netflix_Light"];
const highlightedFallbackProjects: PortfolioProject[] = [
  {
    id: "beeasy-fallback",
    name: "Beeasy",
    desc: "Projet YDAYS autour d'une plateforme web moderne.",
    tags: ["React", "TypeScript", "Next.js"],
    family: "school",
    category: "Web",
    githubUrl: "https://github.com/YnovToulouseProjectPerso",
    image: "",
    accent: "",
    isPrivate: true,
    requestAccessUrl: "mailto:jules.demetezizard@ynov.com?subject=Demande%20d%27acc%C3%A8s%20GitHub%20-%20Beeasy",
    updatedAt: null,
  },
];

export function StatsSection({ theme }: StatsSectionProps) {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [canReadPrivateRepos, setCanReadPrivateRepos] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      try {
        const response = await fetch("/api/projects");
        const data = (await response.json()) as ProjectsApiResponse;

        if (isMounted) {
          setProjects(data.projects);
          setCanReadPrivateRepos(data.canReadPrivateRepos);
        }
      } catch {
        if (isMounted) {
          setProjects([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const githubStats = useMemo(() => {
    const privateProjects = projects.filter((project) => project.isPrivate).length;
    const schoolProjects = projects.filter((project) => project.family === "school").length;
    const personalProjects = projects.filter((project) => project.family === "personal").length;
    const categories = new Set(projects.map((project) => project.category));
    const languages = new Set(projects.flatMap((project) => project.tags).filter((tag) => tag !== "Privé" && tag !== "Public"));

    return {
      privateProjects,
      schoolProjects,
      personalProjects,
      categories: categories.size,
      languages: languages.size,
    };
  }, [projects]);

  const stats = [
    { label: "Repos GitHub affichés", value: isLoading ? "..." : String(projects.length), color: "blue" },
    { label: "Projets d'école", value: isLoading ? "..." : String(githubStats.schoolProjects), color: "purple" },
    { label: "Projets personnels", value: isLoading ? "..." : String(githubStats.personalProjects), color: "green" },
    { label: "Repos privés connectés", value: isLoading ? "..." : String(githubStats.privateProjects), color: "orange" },
  ];

  const highlightedProjects = highlightedProjectNames
    .map((projectName) => {
      const apiProject = projects.find((project) => project.name.toLowerCase() === projectName.toLowerCase());
      const fallbackProject = highlightedFallbackProjects.find(
        (project) => project.name.toLowerCase() === projectName.toLowerCase(),
      );

      return apiProject ?? fallbackProject;
    })
    .filter(Boolean) as PortfolioProject[];

  return (
    <div className="relative z-[1] h-full overflow-auto px-[clamp(1.5rem,5vw,3.25rem)] pb-16 pt-[clamp(1.5rem,4vw,2.625rem)]">
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-linear-to-tr from-emerald-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[1.5px] text-[#94a3b8]">
        06 — Statistiques
      </div>
      <h1 className={`mb-3 text-[52px] font-light leading-[1.05] tracking-[-2px] ${
        theme === "dark" ? "text-[#f8fafc]" : "text-[#0f172a]"
      }`}>
        En<br />
        <strong className="font-semibold">chiffres.</strong>
      </h1>
      <p className={`mb-7 max-w-[720px] text-sm leading-6 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
        Données synchronisées avec GitHub, mes projets visibles et les compétences de mon CV.
      </p>

      <div className="mb-8 grid max-w-[1000px] grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <div
            key={stat.label}
            className={`animate-slideUp rounded-xl border bg-linear-to-br p-5 transition-all duration-300 hover:scale-[1.02] ${cardStyles[stat.color]}`}
            style={{ animationDelay: `${idx * 90}ms` }}
          >
            <div className={`mb-1 text-3xl font-semibold ${theme === "dark" ? "text-[#f8fafc]" : "text-[#0f172a]"}`}>
              {stat.value}
            </div>
            <div className={`text-[11px] leading-4 ${theme === "dark" ? "text-[#cbd5e1]" : "text-[#64748b]"}`}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8 grid max-w-[1000px] grid-cols-1 gap-5 lg:grid-cols-[1fr_0.85fr]">
        <div className={`rounded-xl border p-5 ${
          theme === "dark" ? "border-[#334155] bg-[#1e293b]/80" : "border-[#e2e8f0] bg-[#f8fafc]/80"
        }`}>
          <div className="mb-4 font-mono text-[9px] uppercase tracking-[1.5px] text-[#64748b]">
            Stack CV
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {cvSkills.map((skill, idx) => (
              <div key={skill.name} className="animate-slideUp" style={{ animationDelay: `${(idx + 4) * 70}ms` }}>
                <div className="mb-1.5 flex items-center justify-between gap-3 text-[11px]">
                  <span className={theme === "dark" ? "text-[#f8fafc]" : "text-[#0f172a]"}>{skill.name}</span>
                  <span className="font-mono text-primary">{skill.level}%</span>
                </div>
                <div className={`h-1.5 overflow-hidden rounded-full ${theme === "dark" ? "bg-[#334155]" : "bg-[#e2e8f0]"}`}>
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-1000"
                    style={{ width: `${skill.level}%`, transitionDelay: `${idx * 80 + 250}ms` }}
                  />
                </div>
                <div className="mt-1 font-mono text-[9px] text-[#64748b]">{skill.category}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-xl border p-5 ${
          theme === "dark" ? "border-[#334155] bg-[#1e293b]/80" : "border-[#e2e8f0] bg-[#f8fafc]/80"
        }`}>
          <div className="mb-4 font-mono text-[9px] uppercase tracking-[1.5px] text-[#64748b]">
            GitHub
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[12px]">
              <span className={theme === "dark" ? "text-[#cbd5e1]" : "text-[#64748b]"}>Catégories projet</span>
              <span className="font-mono text-primary">{githubStats.categories}</span>
            </div>
            <div className="flex items-center justify-between text-[12px]">
              <span className={theme === "dark" ? "text-[#cbd5e1]" : "text-[#64748b]"}>Technos détectées</span>
              <span className="font-mono text-primary">{githubStats.languages}</span>
            </div>
            <div className="flex items-center justify-between text-[12px]">
              <span className={theme === "dark" ? "text-[#cbd5e1]" : "text-[#64748b]"}>Accès repos privés</span>
              <span className="font-mono text-primary">{canReadPrivateRepos ? "Actif" : "Public"}</span>
            </div>
          </div>

          <div className="my-4 h-px bg-border" />

          <div className="space-y-2">
            {highlightedProjects.map((project) => (
              <a
                key={project.id}
                href={project.isPrivate ? project.requestAccessUrl : project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`block rounded-lg border px-3 py-2 text-[11px] transition-colors ${
                  theme === "dark"
                    ? "border-[#334155] bg-[#0f172a]/40 text-[#cbd5e1] hover:border-primary/50"
                    : "border-[#e2e8f0] bg-white/60 text-[#64748b] hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate">{project.name}</span>
                  <span className="shrink-0 font-mono text-primary">{project.category}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
