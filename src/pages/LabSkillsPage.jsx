import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/lab.css";

const OUR_SKILLS = [
  {
    id: "memorycard",
    name: "MemoryCard",
    description: "Gerencia tarefas e preserva o contexto operacional localmente para coding agents e desenvolvedores.",
    command: "npx degit covil-works/memorycard/skills/memorycard skills/memorycard",
    url: "https://github.com/covil-works/memorycard",
  },
];

const RECOMMENDED_SKILLS = [
  {
    id: "grill-me",
    name: "grill-me",
    description: "Entrevista técnica interativa para estressar ideias e alinhar decisões antes de iniciar o código.",
    command: "npx skills add mattpocock/skills",
    url: "https://github.com/mattpocock/skills",
  },
  {
    id: "humanizer",
    name: "Humanizer",
    description: "Reescreve textos gerados por inteligência artificial para remover padrões artificiais e soar natural.",
    command: "npx skills add blader/humanizer",
    url: "https://github.com/blader/humanizer",
  },
  {
    id: "impeccable",
    name: "Impeccable",
    description: "Diretrizes e comandos práticos para orientar agentes e evitar designs genéricos de interface.",
    command: "npx skills add pbakaus/impeccable",
    url: "https://github.com/pbakaus/impeccable",
  },
];

function LabSkillsPage({ theme = "dark", toggleTheme }) {
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    document.title = "Skills | Lab | Covil";
  }, []);

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll(".reveal-on-scroll"));
    if (revealElements.length === 0) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealElements.forEach((el) => el.classList.add("is-revealed"));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleCopy = (id, command) => {
    navigator.clipboard.writeText(command);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const renderSkillCard = (skill) => (
    <article key={skill.id} className="lab-skill-card reveal-on-scroll">
      <div className="lab-skill-header">
        <h4 className="lab-skill-name">{skill.name}</h4>
        <a
          href={skill.url}
          target="_blank"
          rel="noreferrer"
          className="lab-skill-link"
          aria-label={`Abrir repositório de ${skill.name} no GitHub`}
        >
          <span>GitHub</span>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </div>
      <p className="lab-skill-description">{skill.description}</p>
      <div className="lab-skill-command-box">
        <code className="lab-skill-command">{skill.command}</code>
        <button
          type="button"
          className={`lab-skill-copy-btn ${copiedId === skill.id ? "is-copied" : ""}`}
          onClick={() => handleCopy(skill.id, skill.command)}
          aria-label={copiedId === skill.id ? "Comando copiado" : `Copiar comando de ${skill.name}`}
        >
          {copiedId === skill.id ? (
            <>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Copiado</span>
            </>
          ) : (
            <>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>
    </article>
  );

  return (
    <div className="lab-page" data-theme={theme}>
      <Navbar activePage="lab" theme={theme} toggleTheme={toggleTheme} />

      <header className="lab-header-wrap reveal-on-scroll">
        <a className="lab-back-link" href="/lab">
          <span>←</span> Voltar ao Lab
        </a>
        <h1 className="lab-page-title">Skills</h1>
      </header>

      <main className="lab-container">
        <section className="lab-section">
          <div className="lab-subsection">
            <h3 className="lab-subsection-title reveal-on-scroll">Nossa skill</h3>
            <div className="lab-skills-grid lab-skills-grid-featured">
              {OUR_SKILLS.map(renderSkillCard)}
            </div>
          </div>

          <div className="lab-subsection">
            <h3 className="lab-subsection-title reveal-on-scroll">Recomendações</h3>
            <div className="lab-skills-grid">
              {RECOMMENDED_SKILLS.map(renderSkillCard)}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default LabSkillsPage;
