import Image from 'next/image';

interface AboutMeSectionProps {
  theme: 'light' | 'dark';
}

export function AboutMeSection({ theme }: AboutMeSectionProps) {
  const socials = [
    { image: '/social/github.svg', name: 'GitHub', url: 'github.com/Blazorde' },
    { image: '/social/linkedin.svg', name: 'LinkedIn', url: 'linkedin.com/in/jules-demetz/' },
  ];

  const interests = [
    { icon: '/interests/cybersecurity.svg', title: 'Cybersécurité', desc: 'GRC, Pentesting, CTF, Reverse Engineering' },
    { icon: '/interests/development.svg', title: 'Développement', desc: 'Full Stack, Web Apps, APIs, IOT' },
    { icon: '/interests/linux.svg', title: 'Linux & Open Source', desc: 'Zsh, Git, Kali linux, Bash, Serveur, Docker' },
    { icon: '/interests/learning.svg', title: 'Apprentissage', desc: 'Réseaux, Gestion de projets, Nouvelles Technologies' }
  ];

  return (
    <div className="relative z-[1] h-full overflow-auto px-[clamp(1.5rem,5vw,3.25rem)] pb-10 pt-[clamp(1.5rem,4vw,2.625rem)]">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-linear-to-br from-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-linear-to-tl from-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="font-mono text-[10px] tracking-[1.5px] uppercase mb-1.5" style={{ color: '#94a3b8' }}>
        02 — À propos
      </div>
      <h1 className={`text-[52px] font-light tracking-[-2px] leading-[1.05] mb-7 ${
        theme === 'dark' ? 'text-[#f8fafc]' : 'text-[#0f172a]'
      }`}>
        Qui<br />
        <strong className="font-semibold">suis-je ?</strong>
      </h1>

      {/* Social Links - Compact */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {socials.map((social, idx) => (
          <a
            key={social.name}
            href={`https://${social.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="beeazy-button beeazy-button-outline animate-slideUp rounded-lg px-4 py-2"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className={`w-6 h-6 rounded-md flex items-center justify-center overflow-hidden border ${
              theme === 'dark' ? 'bg-[#334155] border-[#2a2a2a]' : 'bg-white border-[#e2e8f0]'
            }`}>
              <Image
                src={social.image}
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px]"
              />
            </div>
            <span className="text-[12px] font-medium">{social.name}</span>
            <span className="text-[10px] opacity-50">↗</span>
          </a>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-[1fr_340px] gap-6 max-w-[1100px]">
        {/* Left Column - Bio */}
        <div className="space-y-5">
          {/* Introduction */}
          <div className={`p-6 rounded-xl border animate-slideUp ${
            theme === 'dark'
              ? 'bg-[#1e293b] border-[#334155]'
              : 'bg-[#f8fafc] border-[#e2e8f0]'
          }`} style={{ animationDelay: '100ms' }}>
            <h3 className={`text-[18px] font-medium mb-3 ${
              theme === 'dark' ? 'text-[#f8fafc]' : 'text-[#0f172a]'
            }`}>
              👋 Bonjour !
            </h3>
            <p className={`text-[14px] leading-relaxed mb-3 ${
              theme === 'dark' ? 'text-[#cbd5e1]' : 'text-[#6b6b6b]'
            }`}>
              Je suis un étudiant en <strong className={theme === 'dark' ? 'text-[#60a5fa]' : 'text-[#3b82f6]'}>informatique et cybersécurité</strong>,
              aimant le développement web et la sécurité offensive. J&apos;aime créer des applications élégantes
              tout en comprenant comment les protéger.
            </p>
            <p className={`text-[14px] leading-relaxed ${
              theme === 'dark' ? 'text-[#cbd5e1]' : 'text-[#6b6b6b]'
            }`}>
              Actuellement en <strong className={theme === 'dark' ? 'text-[#60a5fa]' : 'text-[#3b82f6]'}>recherche active </strong> d&apos;un
              stage ou d&apos;une alternance (2026/2027) pour mettre en pratique mes compétences et continuer à apprendre dans un environnement professionnel.
            </p>
          </div>

          {/* Interests Grid */}
          <div className="grid grid-cols-2 gap-3">
            {interests.map((interest, idx) => (
              <div
                key={interest.title}
                className={`p-4 rounded-lg border transition-all duration-300 hover:scale-105 animate-slideUp ${
                  theme === 'dark'
                    ? 'bg-[#1e293b] border-[#334155] hover:border-[#60a5fa]'
                    : 'bg-[#f8fafc] border-[#e2e8f0] hover:border-[#3b82f6]'
                }`}
                style={{ animationDelay: `${(idx + 2) * 100}ms` }}
              >
                <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg border ${
                  theme === 'dark' ? 'bg-[#0f172a]/70 border-[#334155]' : 'bg-white border-[#e2e8f0]'
                }`}>
                  <Image
                    src={interest.icon}
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px]"
                  />
                </div>
                <h4 className={`text-[13px] font-medium mb-1 ${
                  theme === 'dark' ? 'text-[#f8fafc]' : 'text-[#0f172a]'
                }`}>
                  {interest.title}
                </h4>
                <p className="text-[11px] text-[#64748b]">
                  {interest.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Philosophy */}
          <div className={`p-5 rounded-xl border-l-4 animate-slideUp ${
            theme === 'dark'
              ? 'bg-[#1e293b] border-[#60a5fa] border-r border-t border-b border-r-[#334155] border-t-[#334155] border-b-[#334155]'
              : 'bg-[#f8fafc] border-[#3b82f6] border-r border-t border-b border-r-[#e2e8f0] border-t-[#e2e8f0] border-b-[#e2e8f0]'
          }`} style={{ animationDelay: '600ms' }}>
            <p className={`text-[12px] italic leading-relaxed ${
              theme === 'dark' ? 'text-[#cbd5e1]' : 'text-[#6b6b6b]'
            }`}>
              &ldquo;La meilleure façon de prédire l&apos;avenir est de le créer. Et la meilleure façon de le sécuriser
              est de comprendre comment il peut être compromis.&rdquo;
            </p>
          </div>
        </div>

        {/* Right Column - Quick Info */}
        <div className="space-y-4">
          {/* Status Card */}
          <div className={`p-5 rounded-xl border animate-slideUp ${
            theme === 'dark'
              ? 'bg-linear-to-br from-[#60a5fa]/10 to-[#60a5fa]/5 border-[#60a5fa]/30'
              : 'bg-linear-to-br from-[#3b82f6]/10 to-[#3b82f6]/5 border-[#3b82f6]/30'
          }`} style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                theme === 'dark' ? 'bg-[#60a5fa]' : 'bg-[#3b82f6]'
              }`} />
              <span className={`text-[11px] font-medium ${
                theme === 'dark' ? 'text-[#60a5fa]' : 'text-[#3b82f6]'
              }`}>
                DISPONIBLE
              </span>
            </div>
            <p className={`text-[12px] ${
              theme === 'dark' ? 'text-[#cbd5e1]' : 'text-[#6b6b6b]'
            }`}>
              En recherche de stage dès maintenant ou alternance pour 2026/2027
            </p>
          </div>

          {/* Info Cards */}
          <div className={`p-4 rounded-lg border animate-slideUp ${
            theme === 'dark' ? 'bg-[#1e293b] border-[#334155]' : 'bg-[#f8fafc] border-[#e2e8f0]'
          }`} style={{ animationDelay: '300ms' }}>
            <div className="font-mono text-[9px] tracking-wider uppercase mb-2 text-[#64748b]">
              Localisation
            </div>
            <div className={`text-[13px] font-medium ${
              theme === 'dark' ? 'text-[#f8fafc]' : 'text-[#0f172a]'
            }`}>
              📍 Toulouse
            </div>
          </div>

          <div className={`p-4 rounded-lg border animate-slideUp ${
            theme === 'dark' ? 'bg-[#1e293b] border-[#334155]' : 'bg-[#f8fafc] border-[#e2e8f0]'
          }`} style={{ animationDelay: '400ms' }}>
            <div className="font-mono text-[9px] tracking-wider uppercase mb-2 text-[#64748b]">
              Formation
            </div>
            <div className={`text-[13px] font-medium ${
              theme === 'dark' ? 'text-[#f8fafc]' : 'text-[#0f172a]'
            }`}>
              🎓 B1 Info & Cyber
            </div>
            <div className="text-[11px] text-[#64748b]">
              Ynov Toulouse Campus
            </div>
          </div>

          <div className={`p-4 rounded-lg border animate-slideUp ${
            theme === 'dark' ? 'bg-[#1e293b] border-[#334155]' : 'bg-[#f8fafc] border-[#e2e8f0]'
          }`} style={{ animationDelay: '500ms' }}>
            <div className="font-mono text-[9px] tracking-wider uppercase mb-2 text-[#64748b]">
              Langues
            </div>
            <div className="space-y-1">
              <div className={`text-[12px] ${
                theme === 'dark' ? 'text-[#f8fafc]' : 'text-[#0f172a]'
              }`}>
                🇫🇷 Français <span className="text-[#64748b]">— Natif</span>
              </div>
              <div className={`text-[12px] ${
                theme === 'dark' ? 'text-[#f8fafc]' : 'text-[#0f172a]'
              }`}>
                🇬🇧 Anglais <span className="text-[#64748b]">— Intermédiaire</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <a
            href="mailto:jules.demetezizard@ynov.com"
            className="beeazy-button beeazy-button-primary animate-slideUp w-full p-4 text-center text-[13px]"
            style={{ animationDelay: '700ms' }}
          >
            📧 Me contacter
          </a>
        </div>
      </div>
    </div>
  );
}
