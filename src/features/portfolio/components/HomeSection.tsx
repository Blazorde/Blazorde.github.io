import { TerminalHome } from "./TerminalHome";

interface HomeSectionProps {
  theme: "light" | "dark";
  onCommand?: (cmd: string) => void;
}

export function HomeSection({ theme, onCommand }: HomeSectionProps) {
  return (
    <div className="relative z-[1] flex h-full flex-col items-center justify-center overflow-hidden px-[clamp(1.5rem,5vw,3.25rem)] pb-10 pt-[clamp(1.5rem,5vw,3.25rem)]">

      <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-[13px] font-semibold tracking-tight text-primary shadow-sm backdrop-blur-xl">
        <div className="h-2 w-2 rounded-full bg-primary animate-beeazy-pulse" />
        Disponible · Stage & Alternance 2025
      </div>

      <h1 className={`mb-4 text-center text-[clamp(3.2rem,8vw,5.6rem)] font-semibold leading-[0.96] tracking-[-0.045em] ${
        theme === "dark" ? "text-slate-50" : "text-slate-950"
      }`}>
        Bonjour,<br />
        je suis <span className="bg-linear-to-r from-primary to-cyan-400 bg-clip-text text-transparent">Jules.</span>
      </h1>

      <p className={`mb-8 text-center text-[15px] font-medium tracking-wide ${
        theme === "dark" ? "text-slate-400" : "text-slate-600"
      }`}>
        Étudiant B1 · Info & Cybersécurité · Ynov
      </p>

      <TerminalHome theme={theme} onCommand={onCommand} />
    </div>
  );
}
