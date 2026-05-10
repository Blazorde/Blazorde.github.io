export type PortfolioProject = {
  id: string;
  name: string;
  desc: string;
  tags: string[];
  family: "personal" | "school";
  category: "Web" | "Back-end" | "Cyber" | "DevOps" | "IoT" | "POO" | "Base de données" | "Autre";
  githubUrl: string;
  image: string;
  accent: string;
  isPrivate: boolean;
  requestAccessUrl: string;
  updatedAt: string | null;
};

export const githubProjectOwners = ["Blazorde", "YnovToulouseProjectPerso"] as const;

export const projectOverrides: Record<
  string,
  Partial<Pick<PortfolioProject, "family" | "category" | "name" | "desc" | "tags" | "image" | "accent">>
> = {
  Netflix_Light: {
    family: "school",
    category: "Web",
    tags: ["JavaScript", "API", "Web", "École"],
    desc: "Projet web inspiré de Netflix pour pratiquer JavaScript et les appels API GET/POST.",
  },
  terminal_rust: {
    family: "personal",
    category: "Back-end",
    tags: ["Rust", "CLI", "Shell", "Back-end"],
    desc: "Mini terminal en Rust inspiré d'un shell Bash, pensé comme un outil de ligne de commande.",
  },
  "Power-4": {
    family: "school",
    category: "Web",
    tags: ["Go", "Web", "Jeu", "École"],
    desc: "Puissance 4 en version web, réalisé dans le cadre d'un projet d'école.",
  },
  POLARIS: {
    family: "school",
    category: "POO",
    tags: ["Jeu", "CLI", "École", "Algorithmie"],
    desc: "Jeu en ligne de commande réalisé dans le cadre d'un projet d'école.",
  },
};

export const fallbackProjects: PortfolioProject[] = [
  {
    id: "blazorde-profile",
    name: "Profil GitHub",
    desc: "Dépôt de profil GitHub utilisé pour centraliser ma présentation développeur.",
    tags: ["GitHub", "README", "Profil"],
    family: "personal",
    category: "Autre",
    githubUrl: "https://github.com/Blazorde/Blazorde",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
    accent: "from-blue-400/80 to-sky-500/80",
    isPrivate: false,
    requestAccessUrl: "mailto:jules.demetezizard@ynov.com?subject=Demande%20d%27acc%C3%A8s%20GitHub%20-%20Profil%20GitHub",
    updatedAt: null,
  },
  {
    id: "ynov-private-projects",
    name: "Projets privés Ynov Toulouse",
    desc: "Projets académiques privés de mon organisation Ynov. Demandez un accès pour consulter les dépôts concernés.",
    tags: ["École", "Privé", "GitHub"],
    family: "school",
    category: "Autre",
    githubUrl: "https://github.com/YnovToulouseProjectPerso",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    accent: "from-indigo-400/80 to-blue-500/80",
    isPrivate: true,
    requestAccessUrl: "mailto:jules.demetezizard@ynov.com?subject=Demande%20d%27acc%C3%A8s%20GitHub%20-%20Projets%20Ynov%20Toulouse",
    updatedAt: null,
  },
];

export function getProjectRequestAccessUrl(projectName: string) {
  const subject = encodeURIComponent(`Demande d'accès GitHub - ${projectName}`);
  const body = encodeURIComponent(
    `Bonjour Jules,\n\nJe souhaite demander l'accès au projet privé "${projectName}".\n\nMerci.`,
  );

  return `mailto:jules.demetezizard@ynov.com?subject=${subject}&body=${body}`;
}

export function getProjectImage(language: string | null, topics: string[], index = 0) {
  const label = `${language ?? ""} ${topics.join(" ")}`.toLowerCase();
  const pick = (images: string[]) => images[index % images.length];

  if (label.includes("cyber") || label.includes("security") || label.includes("ctf")) {
    return pick([
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80",
      "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=600&q=80",
    ]);
  }

  if (label.includes("python") || label.includes("api") || label.includes("backend")) {
    return pick([
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&q=80",
    ]);
  }

  if (label.includes("typescript") || label.includes("react") || label.includes("next") || label.includes("web")) {
    return pick([
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
    ]);
  }

  if (label.includes("iot") || label.includes("arduino") || label.includes("raspberry")) {
    return pick([
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600&q=80",
    ]);
  }

  if (label.includes("docker") || label.includes("linux")) {
    return pick([
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&q=80",
      "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=600&q=80",
    ]);
  }

  return pick([
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  ]);
}

export function getProjectAccent(index: number) {
  const accents = [
    "from-emerald-400/80 to-blue-500/80",
    "from-blue-400/80 to-sky-500/80",
    "from-indigo-400/80 to-blue-500/80",
    "from-cyan-400/80 to-violet-500/80",
    "from-amber-400/80 to-orange-500/80",
    "from-fuchsia-400/80 to-blue-500/80",
  ];

  return accents[index % accents.length];
}

export function getProjectCategoryFromRepo(input: {
  language: string | null;
  topics: string[];
  name: string;
  owner: string;
  isPrivate: boolean;
}): PortfolioProject["category"] {
  const label = `${input.name} ${input.language ?? ""} ${input.topics.join(" ")}`.toLowerCase();

  if (label.includes("cyber") || label.includes("security") || label.includes("ctf") || label.includes("kali")) {
    return "Cyber";
  }

  if (label.includes("api") || label.includes("backend") || label.includes("server") || label.includes("python")) {
    return "Back-end";
  }

  if (
    label.includes("poo") ||
    label.includes("oop") ||
    label.includes("java") ||
    label.includes("c#") ||
    label.includes("csharp") ||
    label.includes("php")
  ) {
    return "POO";
  }

  if (label.includes("sql") || label.includes("database") || label.includes("bdd") || label.includes("postgres")) {
    return "Base de données";
  }

  if (label.includes("docker") || label.includes("linux") || label.includes("devops")) {
    return "DevOps";
  }

  if (label.includes("iot") || label.includes("arduino") || label.includes("raspberry")) {
    return "IoT";
  }

  if (
    label.includes("web") ||
    label.includes("react") ||
    label.includes("next") ||
    label.includes("typescript") ||
    label.includes("javascript") ||
    label.includes("html") ||
    label.includes("css")
  ) {
    return "Web";
  }

  return "Autre";
}

export function getProjectFamilyFromRepo(owner: string): PortfolioProject["family"] {
  return owner === "YnovToulouseProjectPerso" ? "school" : "personal";
}
