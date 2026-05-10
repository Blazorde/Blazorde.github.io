"use client";

import { useEffect, useMemo, useState } from "react";
import { fallbackProjects, type PortfolioProject } from "@features/portfolio/projects";

interface ProjectsSectionProps {
  theme: "light" | "dark";
}

type ProjectsApiResponse = {
  projects: PortfolioProject[];
  canReadPrivateRepos: boolean;
};

type FamilyFilter = "all" | PortfolioProject["family"];
type CategoryFilter = "all" | PortfolioProject["category"];

const familyFilters: Array<{ value: FamilyFilter; label: string }> = [
  { value: "all", label: "Tous les projets" },
  { value: "personal", label: "Projets personnels" },
  { value: "school", label: "Projets d'école" },
];

const categoryOrder: PortfolioProject["category"][] = [
  "Web",
  "Back-end",
  "IoT",
  "POO",
  "Cyber",
  "DevOps",
  "Base de données",
  "Autre",
];

const categoryLabels: Record<CategoryFilter, string> = {
  all: "Tous les types",
  Web: "Web",
  "Back-end": "APIs & back-end",
  IoT: "IoT & systèmes",
  POO: "POO",
  Cyber: "Cyber / sécurité",
  DevOps: "DevOps & Linux",
  "Base de données": "Bases de données",
  Autre: "Autres projets",
};

export function ProjectsSection({ theme }: ProjectsSectionProps) {
  const [familyFilter, setFamilyFilter] = useState<FamilyFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [projects, setProjects] = useState<PortfolioProject[]>(fallbackProjects);
  const [canReadPrivateRepos, setCanReadPrivateRepos] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      try {
        const response = await fetch("/projects.json");

        if (!response.ok) {
          throw new Error("Unable to load projects");
        }

        const data = (await response.json()) as ProjectsApiResponse;

        if (isMounted) {
          setProjects(data.projects);
          setCanReadPrivateRepos(data.canReadPrivateRepos);
          setHasError(false);
        }
      } catch {
        if (isMounted) {
          setHasError(true);
          setProjects(fallbackProjects);
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

  const categoryFilters = useMemo(() => {
    const scopedProjects =
      familyFilter === "all" ? projects : projects.filter((project) => project.family === familyFilter);
    const categories = categoryOrder.filter((category) =>
      scopedProjects.some((project) => project.category === category),
    );

    return ["all", ...categories] as CategoryFilter[];
  }, [familyFilter, projects]);

  const visibleProjects = projects.filter((project) => {
    const matchesFamily = familyFilter === "all" || project.family === familyFilter;
    const activeCategoryFilter = categoryFilters.includes(categoryFilter) ? categoryFilter : "all";
    const matchesCategory = activeCategoryFilter === "all" || project.category === activeCategoryFilter;

    return matchesFamily && matchesCategory;
  });

  return (
    <div className="relative z-[1] h-full min-h-0 overflow-y-auto overflow-x-hidden px-[50px] pb-14 pt-[42px]">
      <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[1.5px] text-primary/80">
        04 — Projets
      </div>
      <h1 className={`mb-2 text-[56px] font-semibold leading-none tracking-[-2px] ${
        theme === "dark" ? "text-slate-50" : "text-slate-950"
      }`}>
        Ce que j&apos;ai<br />
        <span className="bg-linear-to-r from-primary to-cyan-400 bg-clip-text text-transparent">construit.</span>
      </h1>
      <p className={`mb-7 max-w-[680px] text-sm leading-6 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
        Mes projets sont générés automatiquement depuis GitHub. Les repos privés peuvent afficher une demande d&apos;accès.
      </p>

      <div className={`mb-5 max-w-[760px] rounded-xl border px-4 py-3 text-[12px] leading-5 ${
        theme === "dark"
          ? "border-primary/20 bg-primary/10 text-slate-300"
          : "border-primary/20 bg-white/60 text-slate-600"
      }`}>
        {canReadPrivateRepos
          ? "Connexion GitHub avancée active : les dépôts privés accessibles par tes tokens peuvent apparaître ici."
          : "Mode public actif : ajoute GITHUB_PERSONAL_TOKEN et GITHUB_ORG_TOKEN dans ton .env.local pour afficher les dépôts privés."}
      </div>

      <div className="-mx-1 mb-3 flex max-w-[1080px] gap-2 overflow-x-auto px-1 py-1">
        {familyFilters.map((item) => (
          <button
            key={item.value}
            onClick={() => {
              setFamilyFilter(item.value);
              setCategoryFilter("all");
            }}
            data-active={familyFilter === item.value}
            className={`beeazy-button project-filter-button rounded-full px-4 py-2 text-[12px] ${
              familyFilter === item.value ? "beeazy-button-primary" : "beeazy-button-outline"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="-mx-1 mb-7 flex max-w-[1080px] gap-2 overflow-x-auto px-1 py-1">
        {categoryFilters.map((item) => (
          <button
            key={item}
            onClick={() => setCategoryFilter(item)}
            data-active={categoryFilter === item}
            className={`beeazy-button project-filter-button rounded-full px-3.5 py-2 text-[11px] ${
              categoryFilter === item ? "beeazy-button-primary" : "beeazy-button-outline"
            }`}
          >
            {categoryLabels[item]}
          </button>
        ))}
      </div>

      {hasError && (
        <div className={`mb-5 rounded-xl border px-4 py-3 text-[12px] ${
          theme === "dark" ? "border-red-400/30 bg-red-400/10 text-red-100" : "border-red-300 bg-red-50 text-red-700"
        }`}>
          Impossible de charger GitHub pour le moment.
        </div>
      )}

      <div className="grid max-w-[1080px] grid-cols-1 gap-5 pr-2 md:grid-cols-3">
        {isLoading &&
          Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={`project-skeleton-${idx}`}
              className="project-glass-card h-[285px] animate-pulse rounded-xl p-4"
            >
              <div className="mb-4 h-[120px] rounded-lg bg-primary/10" />
              <div className="mb-3 h-4 w-28 rounded bg-primary/10" />
              <div className="mb-2 h-5 w-40 rounded bg-primary/10" />
              <div className="h-14 rounded bg-primary/10" />
            </div>
          ))}

        {visibleProjects.map((project, idx) => (
          <a
            key={project.name}
            href={project.isPrivate ? project.requestAccessUrl : project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={project.isPrivate ? `Demander l'accès à ${project.name}` : `Ouvrir ${project.name} sur GitHub`}
            className="project-glass-card beeazy-card-lift animate-beeazy-rise group flex h-[285px] flex-col overflow-hidden rounded-xl p-4"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="relative mb-4 h-[120px] overflow-hidden rounded-lg border border-white/40">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className={`absolute inset-0 bg-linear-to-br ${project.accent} mix-blend-multiply opacity-70`} />
              <div className="absolute inset-x-3 top-3 flex items-center justify-between">
                <span className="rounded-full border border-white/40 bg-white/25 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                  {project.category}
                </span>
                <span className={`rounded-full border border-white/40 px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-white backdrop-blur-md ${
                  project.isPrivate ? "bg-amber-400/40" : "bg-white/25"
                }`}>
                  {project.isPrivate ? "Privé" : "Public"}
                </span>
              </div>
            </div>

            <div className="mb-3 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full border px-2 py-1 font-mono text-[9px] ${
                    theme === "dark"
                      ? "border-primary/15 bg-primary/10 text-primary"
                      : "border-primary/20 bg-primary/10 text-primary"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className={`mb-2 text-[18px] font-semibold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-950"}`}>
              {project.name}
            </h3>
            <p className={`mb-4 text-[12px] leading-5 ${theme === "dark" ? "text-slate-300/80" : "text-slate-600"}`}>
              {project.desc}
            </p>
            <div className={`mt-auto inline-flex items-center gap-2 font-mono text-[10px] transition-colors ${
              theme === "dark" ? "text-primary/80 group-hover:text-primary" : "text-primary/80 group-hover:text-primary"
            }`}>
              {project.isPrivate ? "Demander l'accès" : "Voir sur GitHub"}
              <span>↗</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
