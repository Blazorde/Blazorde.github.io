"use client";

import { useState, useRef, useEffect } from 'react';

interface TerminalHomeProps {
  theme: 'light' | 'dark';
  onCommand?: (cmd: string) => void;
}

interface FileSystemNode {
  type: 'dir' | 'file';
  content?: string;
  children?: FileSystem;
}

interface FileSystem {
  [key: string]: FileSystemNode;
}

const availableCommands = ['help', 'whoami', 'ls', 'cd', 'cat', 'pwd', 'clear', 'tree', 'open', 'stats', 'projects'];
const allowedCommands = new Set(availableCommands);
const maxInputLength = 80;

function sanitizeTerminalInput(value: string) {
  return value
    .replace(/[<>`$;&|\\]/g, '')
    .replace(/\s+/g, ' ')
    .slice(0, maxInputLength);
}

function isAllowedPathSegment(value: string) {
  return /^[a-zA-Z0-9._~/-]+$/.test(value);
}

export function TerminalHome({ theme, onCommand }: TerminalHomeProps) {
  const [currentPath, setCurrentPath] = useState('~');
  const [history, setHistory] = useState<Array<{ prompt: string; output: string; timestamp?: string; path?: string }>>([
    { prompt: 'whoami', output: 'Jules Demetz — Étudiant B1 Info & Cybersécurité, Ynov Toulouse', timestamp: '12:34:56', path: '~' },
    { prompt: 'cat projects/README.md', output: 'Beeasy · terminal_rust · Skyjo · Netflix_Light · Groupie-Tracker', timestamp: '12:35:01', path: '~' },
    { prompt: 'cat status.txt', output: 'Disponible pour un stage dès maintenant · Alternance 2026/2027', timestamp: '12:35:08', path: '~' }
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const fileSystem: FileSystem = {
    '~': {
      type: 'dir',
      children: {
        'projects': {
          type: 'dir',
          children: {
            'README.md': {
              type: 'file',
              content: '📦 Projets principaux\n\n- Beeasy: projet YDAYS en React/TypeScript/Next.js\n- terminal_rust: mini shell en ligne de commande\n- Skyjo: jeu web en TypeScript\n- Netflix_Light: clone Netflix pour pratiquer JS et API\n- Groupie-Tracker: projet web consommant une API'
            },
            'beeasy': {
              type: 'dir',
              children: {
                'README.md': { type: 'file', content: '🐝 Beeasy\n\nProjet YDAYS autour d\'une plateforme web moderne.\n\nTechnologies:\n- React\n- TypeScript\n- Next.js\n- Tailwind CSS\n- Node.js\n\nType: Projet d\'école / Web' }
              }
            },
            'terminal_rust': {
              type: 'dir',
              children: {
                'README.md': { type: 'file', content: '⌨️ terminal_rust\n\nMini terminal en Rust inspiré d\'un shell Bash.\n\nTechnologies:\n- Rust\n- CLI\n- Shell\n\nType: Projet personnel / Back-end & outillage' }
              }
            },
            'skyjo': {
              type: 'dir',
              children: {
                'README.md': { type: 'file', content: '🎴 Skyjo\n\nJeu web en TypeScript.\n\nTechnologies:\n- TypeScript\n- Web\n- Game logic\n\nType: Projet personnel / Web' }
              }
            },
            'netflix_light': {
              type: 'dir',
              children: {
                'README.md': { type: 'file', content: '🎬 Netflix_Light\n\nProjet web inspiré de Netflix pour pratiquer JavaScript et les appels API GET/POST.\n\nTechnologies:\n- JavaScript\n- API\n- Web\n\nType: Projet d\'école / Web' }
              }
            },
            'groupie_tracker': {
              type: 'dir',
              children: {
                'README.md': { type: 'file', content: '🎧 Groupie-Tracker\n\nProjet web consommant une API musicale.\n\nTechnologies:\n- HTML\n- API\n- Web\n\nType: Projet d\'école / Web' }
              }
            }
          }
        },
        'skills.txt': { type: 'file', content: '📦 Web: HTML, CSS, JavaScript, React, TypeScript, Next.js\n🔧 Back-end: Go, Node.js, Rust, APIs\n🖥️ Système: Linux, Bash, Zsh\n🐳 DevOps: Docker, Git, réseaux\n🔐 Cyber: bases sécurité, CTF, veille' },
        'status.txt': { type: 'file', content: '✅ Disponible pour un stage dès maintenant\n🔜 Alternance 2026/2027\n📍 Toulouse\n🎓 B1 Info & Cybersécurité — Ynov Toulouse' },
        'cv.pdf': { type: 'file', content: '📄 CV stage — Jules Demetz\n\nCommande utile:\n  open cv\n\nLien fichier:\n  /files/cv-stage.pdf' },
        'contact.txt': { type: 'file', content: '📧 Email: jules.demetezizard@ynov.com\n💼 LinkedIn: linkedin.com/in/jules-demetz/\n🐙 GitHub: github.com/Blazorde' }
      }
    }
  };

  const suggestions = input
    ? availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase().split(' ')[0]))
    : [];

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const normalizePath = (path: string) => {
    if (!isAllowedPathSegment(path)) {
      return '~';
    }

    if (!path || path === '/' || path === '~') {
      return '~';
    }

    const normalized = path
      .replace(/\/+/g, '/')
      .replace(/^~\/?/, '')
      .replace(/^\/+/, '')
      .replace(/\/+$/, '');

    return normalized ? `~/${normalized}` : '~';
  };

  const resolvePath = (path: string) => {
    if (path.startsWith('~') || path.startsWith('/')) {
      return normalizePath(path);
    }

    return normalizePath(`${currentPath}/${path}`);
  };

  const getNodeAtPath = (path: string): FileSystemNode | null => {
    const normalizedPath = normalizePath(path);
    const parts = normalizedPath === '~' ? [] : normalizedPath.replace('~/', '').split('/').filter(Boolean);
    let current = fileSystem['~'];

    for (const part of parts) {
      if (current.children && current.children[part]) {
        current = current.children[part];
      } else {
        return null;
      }
    }
    return current;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Tab autocompletion
    if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        const parts = input.split(' ');
        const lastPart = parts[parts.length - 1];
        const match = suggestions[0];

        // Autocomplétion des commandes
        if (parts.length === 1) {
          setInput(match + ' ');
        } else {
          // Autocomplétion des chemins
          const currentNode = getNodeAtPath(currentPath);
          if (currentNode?.children) {
            const matches = Object.keys(currentNode.children).filter(name =>
              name.toLowerCase().startsWith(lastPart.toLowerCase())
            );
            if (matches.length > 0) {
              parts[parts.length - 1] = matches[0];
              setInput(parts.join(' ') + (getNodeAtPath(resolvePath(matches[0]))?.type === 'dir' ? '/' : ''));
            }
          }
        }
      }
    }

    // Navigation dans l'historique avec flèches
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedInput = sanitizeTerminalInput(input).trim();

    if (sanitizedInput) {
      // Ajouter à l'historique
      setCommandHistory([...commandHistory, sanitizedInput]);
      setHistoryIndex(-1);

      const parts = sanitizedInput.split(' ');
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      const now = new Date();
      const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

      let output = '';
      let newPath = currentPath;

      if (!allowedCommands.has(cmd)) {
        output = `Commande refusée: ${cmd}\nTapez 'help' pour voir les commandes autorisées.`;
      } else {
        switch (cmd) {
        case 'help':
          output = `Commandes disponibles:
  ls [dir]        - Lister les fichiers et dossiers
  cd <dir>        - Changer de répertoire
  cat <file>      - Afficher le contenu d'un fichier
  pwd             - Afficher le chemin actuel
  tree            - Afficher l'arborescence
  whoami          - Informations sur moi
  projects        - Ouvrir la page projets
  stats           - Ouvrir la page statistiques
  open cv         - Télécharger le CV
  clear           - Effacer le terminal

Navigation:
  cd projects/    - Aller dans le dossier projets
  cd ..           - Revenir au dossier parent
  cd ~            - Retour à l'accueil`;
          break;

        case 'whoami':
          output = 'Jules Demetz — Étudiant B1 Info & Cybersécurité\nLocalisation: Toulouse\nRecherche: stage dès maintenant · alternance 2026/2027\nGitHub: github.com/Blazorde';
          break;

        case 'projects':
          onCommand?.('projects');
          output = 'Ouverture de la section Projets...';
          break;

        case 'stats':
          onCommand?.('stats');
          output = 'Ouverture de la section Statistiques...';
          break;

        case 'open':
          if (args[0] === 'cv' || args[0] === 'cv.pdf') {
            window.open('/files/cv-stage.pdf', '_blank', 'noopener,noreferrer');
            output = 'Ouverture du CV: /files/cv-stage.pdf';
          } else if (args[0] === 'github') {
            window.open('https://github.com/Blazorde', '_blank', 'noopener,noreferrer');
            output = 'Ouverture de GitHub: github.com/Blazorde';
          } else {
            output = 'open: cible inconnue. Essayez: open cv ou open github';
          }
          break;

        case 'pwd':
          output = currentPath;
          break;

        case 'ls':
          const lsPath = args[0] ? resolvePath(args[0]) : currentPath;
          const lsNode = getNodeAtPath(lsPath);
          if (lsNode && lsNode.children) {
            const items = Object.entries(lsNode.children).map(([name, node]) => {
              return node.type === 'dir' ? `📁 ${name}/` : `📄 ${name}`;
            });
            output = items.join('\n');
          } else {
            output = `ls: cannot access '${args[0] || currentPath}': No such file or directory`;
          }
          break;

        case 'cd':
          if (!args[0]) {
            newPath = '~';
            output = '';
          } else if (args[0] === '..') {
            const parts = currentPath.split('/').filter(p => p && p !== '~');
            if (parts.length > 0) {
              newPath = '~/' + parts.slice(0, -1).join('/');
              if (newPath === '~/') newPath = '~';
              output = '';
            } else if (currentPath !== '~') {
              newPath = '~';
              output = '';
            } else {
              output = 'cd: already at root';
            }
          } else if (args[0] === '~' || args[0] === '/') {
            newPath = '~';
            output = '';
          } else {
            const targetPath = resolvePath(args[0]);
            const node = getNodeAtPath(targetPath);
            if (node && node.type === 'dir') {
              newPath = normalizePath(targetPath);
              output = '';
            } else if (node && node.type === 'file') {
              output = `cd: not a directory: ${args[0]}`;
            } else {
              output = `cd: no such file or directory: ${args[0]}`;
            }
          }
          break;

        case 'cat':
          if (!args[0]) {
            output = 'cat: missing file operand';
          } else {
            const catPath = resolvePath(args[0]);
            const catNode = getNodeAtPath(catPath);
            if (catNode && catNode.type === 'file' && catNode.content) {
              output = catNode.content;
            } else if (catNode && catNode.type === 'dir') {
              output = `cat: ${args[0]}: Is a directory`;
            } else {
              output = `cat: ${args[0]}: No such file or directory`;
            }
          }
          break;

        case 'tree':
          output = `~
├── 📁 projects/
│   ├── 📄 README.md
│   ├── 📁 beeasy/
│   │   └── 📄 README.md
│   ├── 📁 terminal_rust/
│   │   └── 📄 README.md
│   ├── 📁 skyjo/
│   │   └── 📄 README.md
│   ├── 📁 netflix_light/
│   │   └── 📄 README.md
│   └── 📁 groupie_tracker/
│       └── 📄 README.md
├── 📄 skills.txt
├── 📄 status.txt
├── 📄 cv.pdf
└── 📄 contact.txt`;
          break;

        case 'clear':
          setHistory([]);
          setInput('');
          return;

        default:
          output = `zsh: command not found: ${cmd}\nTapez 'help' pour voir les commandes disponibles`;
        }
      }

      setHistory([...history, { prompt: sanitizedInput, output, timestamp, path: currentPath }]);

      if (cmd === 'cd' && !output) {
        setCurrentPath(newPath);
      }

      setInput('');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`beeazy-glass w-[760px] overflow-hidden rounded-xl ${
        theme === 'dark'
          ? 'bg-slate-950/75 border-slate-700/70 shadow-[0_32px_90px_rgba(0,0,0,0.38)]'
          : 'bg-white/70 border-white/70 shadow-[0_28px_80px_rgba(22,43,79,0.16)]'
      }`}>
        {/* Terminal Bar */}
        <div className={`flex items-center gap-[7px] px-[14px] py-3 border-b ${
          theme === 'dark'
            ? 'bg-[#1e293b] border-[#334155]'
            : 'bg-[#f8fafc] border-[#e2e8f0]'
        }`}>
          <div className="w-[11px] h-[11px] rounded-full bg-[#ff5f57]" />
          <div className="w-[11px] h-[11px] rounded-full bg-[#febc2e]" />
          <div className="w-[11px] h-[11px] rounded-full bg-[#28c840]" />
          <div className={`flex-1 text-center text-[11px] font-mono ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#94a3b8]'}`}>
            zsh — portfolio — 80×24
          </div>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalRef}
          className={`px-[26px] py-[22px] font-mono text-[13px] leading-[1.55] min-h-[220px] max-h-[320px] overflow-y-auto ${
            theme === 'dark' ? 'bg-slate-950/55' : 'bg-white/55'
          }`}
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, idx) => (
            <div key={idx} className="animate-fadeIn mb-1">
              <div className="flex items-center gap-2">
                <span className={theme === 'dark' ? 'text-[#60a5fa] font-medium' : 'text-[#3b82f6] font-medium'}>
                  {item.path || '~'}
                </span>
                <span className={theme === 'dark' ? 'text-[#f8fafc]' : 'text-[#0f172a]'}>{item.prompt}</span>
                {item.timestamp && (
                  <span className={`text-[9px] ml-auto ${theme === 'dark' ? 'text-[#64748b]' : 'text-[#cbd5e1]'}`}>
                    {item.timestamp}
                  </span>
                )}
              </div>
              {item.output && (
                <div className={`whitespace-pre-line ${theme === 'dark' ? 'text-[#cbd5e1]' : 'text-[#64748b]'}`}>{item.output}</div>
              )}
            </div>
          ))}
          <form onSubmit={handleSubmit} className="mt-0.5">
            <div className="flex items-center">
              <span className={theme === 'dark' ? 'text-[#60a5fa] font-medium' : 'text-[#3b82f6] font-medium'}>
                {currentPath}
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(sanitizeTerminalInput(e.target.value))}
                onKeyDown={handleKeyDown}
                maxLength={maxInputLength}
                className={`flex-1 bg-transparent outline-none ml-1 ${theme === 'dark' ? 'text-[#f8fafc]' : 'text-[#0f172a]'}`}
                autoFocus
                autoComplete="off"
              />
              <span className={`inline-block w-[7px] h-[14px] ${theme === 'dark' ? 'bg-[#60a5fa]' : 'bg-[#3b82f6]'} animate-blink`} />
            </div>
            {suggestions.length > 0 && input && (
              <div className={`mt-1 text-[10px] flex items-center gap-2 ${theme === 'dark' ? 'text-[#64748b]' : 'text-[#94a3b8]'}`}>
                <span>→ {suggestions.join(', ')}</span>
                <span className={`text-[9px] ${theme === 'dark' ? 'text-[#64748b]' : 'text-[#cbd5e1]'}`}>(Tab pour compléter)</span>
              </div>
            )}
          </form>
        </div>

        {/* Terminal Footer */}
        <div className={`flex items-center gap-2.5 px-[22px] py-2.5 border-t ${
          theme === 'dark'
            ? 'bg-[#020617] border-[#334155]'
            : 'bg-[#f8fafc] border-[#e2e8f0]'
        }`}>
          <span className={`font-mono text-xs font-medium whitespace-nowrap ${theme === 'dark' ? 'text-[#60a5fa]' : 'text-[#3b82f6]'}`}>
            ~
          </span>
          <div className={`flex-1 h-[1px] ${theme === 'dark' ? 'bg-[#334155]' : 'bg-[#e2e8f0]'}`} />
          <div className={`w-[5px] h-[5px] rounded-full opacity-40 ${theme === 'dark' ? 'bg-[#60a5fa]' : 'bg-[#3b82f6]'}`} />
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        {["help", "ls", "cd projects/", "tree"].map((chip, idx) => (
          <button
            key={chip}
            onClick={() => {
              setInput(chip);
              inputRef.current?.focus();
            }}
            className="beeazy-button beeazy-button-outline animate-beeazy-rise rounded-full px-4 py-2 font-mono text-[12px]"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
