import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/lab.css";

// Espaço para futuras aulas, artigos, materiais escritos e tutoriais
const LAB_ITEMS = [];

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
          Nosso espaço educacional e laboratório prático. Em breve, reuniremos aqui nossas aulas, materiais escritos, tutoriais e pesquisas sobre tecnologia.
        </p>
      </section>

      <main className="lab-container">
        <section className="lab-section">
          <div className="lab-section-header reveal-on-scroll">
            <h2>Aulas & Materiais</h2>
            <span>Em breve</span>
          </div>

          {LAB_ITEMS.length === 0 ? (
            <div className="lab-placeholder-card reveal-on-scroll">
              <div className="lab-placeholder-badge">
                <span className="contact-card-live-dot" aria-hidden="true" />
                <span>Em preparação</span>
              </div>
              <h3>Laboratório em construção</h3>
              <p>
                Estamos estruturando este ambiente para compartilhar aulas práticas, roteiros de estudo, artigos técnicos e materiais abertos desenvolvidos pela equipe da Covil. Em breve, todo o conteúdo estará disponível por aqui.
              </p>
            </div>
          ) : (
            <div className="lab-grid">
              {LAB_ITEMS.map((item) => (
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

export default LabPage;
