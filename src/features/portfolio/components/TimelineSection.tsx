interface TimelineSectionProps {
  theme: 'light' | 'dark';
}

export function TimelineSection({ theme }: TimelineSectionProps) {
  const events = [
    {
      year: '2026-2027',
      title: 'Recherche Stage',
      description: 'Actuellement en recherche active de stage ou alternance pour 2027',
      type: 'current',
      icon: '🎯'
    },
    {
      year: '2025-2026',
      title: 'Projet Beeasy - YDAYS',
      description: 'Projet entreprise interfiliale inter niveau · React, TypeScript, Node.js, Next.js, Rust, Docker, Tailwind CSS, gestion de projet agile, travail en équipe',
      type: 'experience',
      icon: '💼'
    },
    {
      year: '2025',
      title: 'Compétition CTF',
      description: 'Participation au CTF de l\'école - Top 10',
      type: 'achievement',
      icon: '🏆'
    },
    {
      year: '2025-2026',
      title: 'B1 Info & Cybersécurité',
      description: 'Formation en développement web et sécurité informatique',
      type: 'education',
      icon: '🎓'
    },
    {
      year: '2025',
      title: 'Bac S.I.N. Mention Bien',
      description: 'Baccalauréat STI2D spécialité Systèmes d\'Information et Numérique',
      type: 'Diploma',
      icon: '💻'
    }
  ];

  return (
    <div className="relative z-[1] h-full overflow-auto px-[clamp(1.5rem,5vw,3.25rem)] pb-10 pt-[clamp(1.5rem,4vw,2.625rem)]">
      {/* Background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-linear-to-b from-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="font-mono text-[10px] tracking-[1.5px] uppercase mb-1.5" style={{ color: '#94a3b8' }}>
        05 — Timeline
      </div>
      <h1 className={`text-[52px] font-light tracking-[-2px] leading-[1.05] mb-7 ${
        theme === 'dark' ? 'text-[#f8fafc]' : 'text-[#0f172a]'
      }`}>
        Mon<br />
        <strong className="font-semibold">parcours.</strong>
      </h1>

      <div className="max-w-[850px] relative">
        {/* Vertical line */}
        <div className={`absolute left-[30px] top-0 bottom-0 w-[2px] ${
          theme === 'dark' ? 'bg-[#334155]' : 'bg-[#e2e8f0]'
        }`} />

        {events.map((event, idx) => (
          <div
            key={idx}
            className="relative pl-[70px] pb-12 animate-slideUp"
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            {/* Icon */}
            <div className={`absolute left-0 w-[60px] h-[60px] rounded-full flex items-center justify-center text-2xl border-4 ${
              event.type === 'current'
                ? theme === 'dark'
                  ? 'bg-[#60a5fa] border-[#0f172a]'
                  : 'bg-[#3b82f6] border-white'
                : theme === 'dark'
                  ? 'bg-[#334155] border-[#0f172a]'
                  : 'bg-white border-white'
            }`}>
              {event.icon}
            </div>

            {/* Content */}
            <div className={`p-5 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
              theme === 'dark'
                ? 'bg-[#1e293b] border-[#334155] hover:border-[#60a5fa] hover:shadow-[0_8px_24px_rgba(77,159,255,0.15)]'
                : 'bg-[#f8fafc] border-[#e2e8f0] hover:border-[#3b82f6] hover:shadow-[0_8px_24px_rgba(0,102,255,0.15)]'
            }`}>
              <div className={`font-mono text-[10px] mb-2 ${
                event.type === 'current'
                  ? theme === 'dark' ? 'text-[#60a5fa]' : 'text-[#3b82f6]'
                  : theme === 'dark' ? 'text-[#64748b]' : 'text-[#64748b]'
              }`}>
                {event.year}
              </div>
              <h3 className={`text-[15px] font-medium mb-2 ${
                theme === 'dark' ? 'text-[#f8fafc]' : 'text-[#0f172a]'
              }`}>
                {event.title}
              </h3>
              <p className={`text-[12px] ${
                theme === 'dark' ? 'text-[#cbd5e1]' : 'text-[#6b6b6b]'
              }`}>
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
