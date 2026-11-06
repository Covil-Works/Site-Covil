import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/lab.css";

function LabPage({ theme = "dark", toggleTheme }) {
  useEffect(() => {
    document.title = "Lab | Covil";
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

  return (
    <div className="lab-page" data-theme={theme}>
      <Navbar activePage="lab" theme={theme} toggleTheme={toggleTheme} />

      <section className="lab-title-section reveal-on-scroll">
        <h1>
          Covil <strong>Lab</strong>
        </h1>
        <p>
          Laboratório de desenvolvimento, ferramentas e conteúdos práticos da Covil.
        </p>
      </section>

      <main className="lab-container">
        <div className="lab-hub-grid">
          <a href="/lab/skills" className="lab-hub-card reveal-on-scroll">
            <div>
              <span className="lab-hub-card-kicker">Coding Agents</span>
              <h2>Skills</h2>
              <p>
                Skills prontas para agentes de IA: ferramenta da Covil de contexto e tarefas, além de recomendações abertas.
              </p>
            </div>
            <span className="lab-hub-card-cta">
              Acessar skills <span>→</span>
            </span>
          </a>

          <a href="/lab/aulas" className="lab-hub-card reveal-on-scroll">
            <div>
              <span className="lab-hub-card-kicker">Conteúdos Práticos</span>
              <h2>Aulas</h2>
              <p>
                Materiais técnicos, roteiros e tutoriais de engenharia de software desenvolvidos pela equipe.
              </p>
            </div>
            <span className="lab-hub-card-cta">
              Acessar aulas <span>→</span>
            </span>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default LabPage;
