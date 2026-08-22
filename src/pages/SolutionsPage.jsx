import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import "../styles/solutions.css";

function SolutionsPage({ solutions }) {
  useEffect(() => {
    document.title = "Soluções | Covil";
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
    <div className="solutions-page">
      <Navbar activePage="solucoes" />
      <section className="solutions-title-section reveal-on-scroll">
        <h1>
          Soluções que <strong>ganham vida.</strong>
        </h1>
        <p>
          Produtos digitais criados pela Covil para resolver problemas reais — com clareza, cuidado e código que aguenta o caminho.
        </p>
      </section>
      <main className="solutions-container">
        <section className="solutions-list">
          <div className="solutions-list-header reveal-on-scroll">
            <h2>Nossas soluções</h2>
            <span>{Object.keys(solutions).length.toString().padStart(2, "0")} produtos</span>
          </div>
          <div className="project-grid solutions-grid">
            {Object.entries(solutions).map(([slug, solution]) => (
              <ProjectCard
                key={slug}
                project={{
                  ...solution,
                  href: `/solucoes/${slug}`,
                }}
                className="reveal-on-scroll"
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default SolutionsPage;