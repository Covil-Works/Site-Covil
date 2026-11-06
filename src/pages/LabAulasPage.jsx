import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/lab.css";

const AULAS_ITEMS = [];

function LabAulasPage({ theme = "dark", toggleTheme }) {
  useEffect(() => {
    document.title = "Aulas | Lab | Covil";
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

      <header className="lab-header-wrap reveal-on-scroll">
        <a className="lab-back-link" href="/lab">
          <span>←</span> Voltar ao Lab
        </a>
        <h1 className="lab-page-title">Aulas</h1>
      </header>

      <main className="lab-container">
        <section className="lab-section">
          {AULAS_ITEMS.length === 0 ? (
            <div className="lab-placeholder-card reveal-on-scroll">
              <div className="lab-placeholder-badge">
                <span className="contact-card-live-dot" aria-hidden="true" />
                <span>Em preparação</span>
              </div>
              <h3>Conteúdos em estruturação</h3>
              <p>
                Estamos organizando materiais abertos, aulas práticas e tutoriais técnicos sobre desenvolvimento de software. Em breve estarão disponíveis por aqui.
              </p>
            </div>
          ) : (
            <div className="lab-grid">
              {AULAS_ITEMS.map((item) => (
                <article key={item.id} className="lab-item-card reveal-on-scroll">
                  <span className="lab-item-category">{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noreferrer" className="lab-item-link">
                      Acessar material ↗
                    </a>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default LabAulasPage;
