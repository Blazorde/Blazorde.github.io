"use client";

import { useState } from 'react';

interface CVSectionProps {
  theme: 'light' | 'dark';
}

export function CVSection({ theme }: CVSectionProps) {
  const [tab, setTab] = useState('Stage');
  const tabs = [
    { label: 'Stage', disabled: false },
    { label: 'Alternance', disabled: true },
    { label: 'Freelance', disabled: true },
  ];

  const skills = [
    { name: 'Web / Html / Css / JavaScript', level: 100 },
    { name: 'Golang', level: 70 },
    { name: 'React / TypeScript / Node.js / Next.js', level: 40 },
    { name: 'Linux / Bash', level: 80 },
    { name: 'Java', level: 40 },
    { name: 'C#', level: 40 },
    { name: 'Rust', level: 50 },
    { name: 'Docker / Réseaux', level: 55 }
  ];

  return (
    <div className="relative z-[1] h-full overflow-auto px-[clamp(1.5rem,5vw,3.25rem)] pb-10 pt-[clamp(1.5rem,4vw,2.625rem)]">
      {/* Background gradient */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-linear-to-tl from-green-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="font-mono text-[10px] tracking-[1.5px] uppercase mb-1.5" style={{ color: '#94a3b8' }}>
        03 — CV & Profil
      </div>
      <h1 className={`text-[52px] font-light tracking-[-2px] leading-[1.05] mb-5 ${
        theme === 'dark' ? 'text-[#f8fafc]' : 'text-[#0f172a]'
      }`}>
        Mon<br />
        <strong className="font-semibold">parcours.</strong>
      </h1>

      <div className="flex gap-1.5 mb-7">
        {tabs.map((t) => (
          <button
            key={t.label}
            onClick={() => {
              if (!t.disabled) {
                setTab(t.label);
              }
            }}
            aria-disabled={t.disabled}
            title={t.disabled ? 'Pas encore disponible' : t.label}
            className={`beeazy-button rounded-full px-[18px] py-1.5 text-[11px] ${
              t.disabled
                ? 'disabled-tab-button beeazy-button-outline'
                : tab === t.label
                  ? 'beeazy-button-primary'
                  : 'beeazy-button-outline'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-8 max-w-[900px]">
        {/* Colonne gauche */}
        <div>
          <div className={`font-mono text-[9px] tracking-[1.5px] uppercase mb-3.5 pb-2 border-b ${
            theme === 'dark' ? 'text-[#94a3b8] border-[#334155]' : 'text-[#94a3b8] border-[#e2e8f0]'
          }`}>
            Formation
          </div>
          <div className="mb-4">
            <div className={`text-[13px] font-medium mb-0.5 ${theme === 'dark' ? 'text-[#f8fafc]' : 'text-[#0f172a]'}`}>
              B1 Info & Cybersécurité
            </div>
            <div className={`text-[10px] font-mono mb-1 ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
              Votre École · <b className={theme === 'dark' ? 'text-[#60a5fa]' : 'text-[#3b82f6]'}>2024 → 2025</b>
            </div>
            <div className={`text-[11px] leading-[1.65] ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
              Réseaux, dev web, sécurité offensive & défensive, projet agile
            </div>
          </div>

          <div className={`font-mono text-[9px] tracking-[1.5px] uppercase mb-3.5 pb-2 border-b mt-5 ${
            theme === 'dark' ? 'text-[#94a3b8] border-[#334155]' : 'text-[#94a3b8] border-[#e2e8f0]'
          }`}>
            Expériences
          </div>
          <div className="mb-4">
            <div className={`text-[13px] font-medium mb-0.5 ${theme === 'dark' ? 'text-[#f8fafc]' : 'text-[#0f172a]'}`}>
              Projet Beeasy - YDAYS
            </div>
            <div className={`text-[10px] font-mono mb-1 ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
              Projet entreprise interfiliale inter niveau · <b className={theme === 'dark' ? 'text-[#60a5fa]' : 'text-[#3b82f6]'}>2025 → 2026</b>
            </div>
            <div className={`text-[11px] leading-[1.65] ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
              React, TypeScript, Node.js, Next.js, Rust, Docker, Tailwind CSS, gestion de projet agile, travail en équipe
            </div>
          </div>

          <div className="mb-4">
            <div className={`text-[13px] font-medium mb-0.5 ${theme === 'dark' ? 'text-[#f8fafc]' : 'text-[#0f172a]'}`}>
              CTF — Équipe compétition
            </div>
            <div className={`text-[10px] font-mono mb-1 ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
              Projet interne · <b className={theme === 'dark' ? 'text-[#60a5fa]' : 'text-[#3b82f6]'}>2025</b>
            </div>
            <div className={`text-[11px] leading-[1.65] ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
              Web, Forensics, Cryptographie — classement 4ème sur 20 équipes
            </div>
          </div>

          <div className="mb-4">
            <div className={`text-[13px] font-medium mb-0.5 ${theme === 'dark' ? 'text-[#f8fafc]' : 'text-[#0f172a]'}`}>
              Baccalaureat SIN - Mention Bien
            </div>
            <div className={`text-[10px] font-mono mb-1 ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
              STI2D · <b className={theme === 'dark' ? 'text-[#60a5fa]' : 'text-[#3b82f6]'}>2024 → 2025</b>
            </div>
            <div className={`text-[11px] leading-[1.65] ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
              Mathématiques, Physique, Chimie, Informatique, Sciences de l&apos;Ingénieur, sport, projet techno
            </div>
          </div>
        </div>

        {/* Colonne droite */}
        <div>
          <div className={`font-mono text-[9px] tracking-[1.5px] uppercase mb-3.5 pb-2 border-b ${
            theme === 'dark' ? 'text-[#94a3b8] border-[#334155]' : 'text-[#94a3b8] border-[#e2e8f0]'
          }`}>
            Compétences
          </div>
          {skills.map((skill, idx) => (
            <div key={skill.name} className="mb-3 animate-slideUp" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className={`flex justify-between text-[10px] font-mono mb-1.5 ${
                theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'
              }`}>
                <span>{skill.name}</span>
                <span className={theme === 'dark' ? 'text-[#60a5fa] font-medium' : 'text-[#3b82f6] font-medium'}>
                  {skill.level}%
                </span>
              </div>
              <div className={`h-0.5 rounded-sm overflow-hidden ${theme === 'dark' ? 'bg-[#334155]' : 'bg-[#e2e8f0]'}`}>
                <div
                  className={`h-0.5 rounded-sm transition-all duration-1000 ease-out ${theme === 'dark' ? 'bg-[#60a5fa]' : 'bg-[#3b82f6]'}`}
                  style={{
                    width: `${skill.level}%`,
                    transitionDelay: `${idx * 100 + 300}ms`
                  }}
                />
              </div>
            </div>
          ))}

          <a
            href="/files/cv-stage.pdf"
            download="cv-stage-jules-demetz.pdf"
            className="beeazy-button beeazy-button-primary mt-6 px-[22px] py-2.5 text-[11px] tracking-tight"
          >
            ↓ &nbsp;Télécharger le CV
          </a>
        </div>
      </div>
    </div>
  );
}
