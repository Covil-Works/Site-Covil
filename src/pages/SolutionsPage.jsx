import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/solutions.css";

function SolutionsPage({ solutions }) {
  useEffect(() => { document.title = "Soluções | Covil"; }, []);

  useEffect(() => {
    const solutionCards = Array.from(document.querySelectorAll(".solution-card"));

    if (solutionCards.length === 0) {
      return undefined;
    }

    const setCardPointerToCenter = (card) => {
      card.style.setProperty("--card-pointer-x", `${(card.clientWidth / 2).toFixed(1)}px`);
      card.style.setProperty("--card-pointer-y", `${(card.clientHeight / 2).toFixed(1)}px`);
    };

    const updateCardPointer = (event) => {
      const card = event.currentTarget;
      const bounds = card.getBoundingClientRect();
      const pointerX = event.clientX - bounds.left;
      const pointerY = event.clientY - bounds.top;

      card.style.setProperty("--card-pointer-x", `${pointerX.toFixed(1)}px`);
      card.style.setProperty("--card-pointer-y", `${pointerY.toFixed(1)}px`);
    };

    solutionCards.forEach((card) => {
      setCardPointerToCenter(card);
      card.addEventListener("pointerenter", updateCardPointer);
      card.addEventListener("pointermove", updateCardPointer);
    });

    const updateAllCardCenters = () => {
      solutionCards.forEach(setCardPointerToCenter);
    };

    window.addEventListener("resize", updateAllCardCenters);

    return () => {
      solutionCards.forEach((card) => {
        card.removeEventListener("pointerenter", updateCardPointer);
        card.removeEventListener("pointermove", updateCardPointer);
      });
      window.removeEventListener("resize", updateAllCardCenters);
    };
  }, []);

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll(".reveal-on-scroll"));
    if (revealElements.length === 0) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealElements.forEach((el) => el.classList.add("is-revealed"));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="solutions-page">
      <Navbar />
      <section className="solutions-title-section reveal-on-scroll">
        <h1>Soluções que <strong>ganham vida.</strong></h1>
        <p>Produtos digitais criados pela Covil para resolver problemas reais — com clareza, cuidado e código que aguenta o caminho.</p>
      </section>
      <main className="solutions-container">
        <section className="solutions-list">
          <div className="solutions-list-header reveal-on-scroll">
            <h2>Nossas soluções</h2>
            <span>{Object.keys(solutions).length.toString().padStart(2, "0")} produtos</span>
          </div>
          <div className="solutions-grid">
            {Object.entries(solutions).map(([slug, solution], index) => (
              <a className="solution-card reveal-on-scroll" style={{ "--reveal-delay": `${index * 120}ms` }} href={`/solucoes/${slug}`} key={slug}>
                <div className="solution-card-topline">
                  <span>0{index + 1}</span>
                  <span className="solution-status">{solution.status}</span>
                </div>
                <div className="solution-card-content">
                  <p>{solution.category}</p>
                  <h3>{solution.name}</h3>
                  <span>{solution.description}</span>
                </div>
                <b className="solution-card-arrow">↗</b>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
export default SolutionsPage;