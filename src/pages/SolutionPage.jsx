import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/solutions.css";

function SolutionPage({ solutionSlug, solution, theme = "dark", toggleTheme }) {
  useEffect(() => { document.title = `${solution.name} | Covil`; }, [solution.name]);
  
  const hasExternalUrl = Boolean(solution.externalUrl);
  
  return (
    <div className="solution-page" data-theme={theme}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="solution-detail">
        <div className="solution-detail-inner">
          <a className="solution-back-link" href="/solucoes"><span>←</span> Todas as soluções</a>
          <div className="solution-detail-layout">
            <div className="solution-detail-content">
              <div className="solution-detail-header-wrap">
                {solution.logo && (
                  <img src={solution.logo} alt={`Logo ${solution.name}`} className="solution-header-logo" />
                )}
                <div>
                  <p className="solutions-kicker">{solution.category}</p>
                  <h1>{solution.name}</h1>
                </div>
              </div>
              <p className="solution-detail-description">{solution.description}</p>
              <p className="solution-detail-support">
                {hasExternalUrl ? "Uma experiência feita para deixar a rotina mais leve e as decisões mais claras." : "Estamos preparando cada detalhe para que essa solução chegue do jeito certo."}
              </p>
              {hasExternalUrl ? (
                <a className="solution-primary-link" href={solution.externalUrl} target="_blank" rel="noreferrer">{solution.ctaLabel || "Acessar ↗"}</a>
              ) : (
                <a className="solution-primary-link" href="https://wa.me/5591984085049" target="_blank" rel="noreferrer">Falar com a Covil ↗</a>
              )}
            </div>
            <div className="solution-detail-visual">
              {solution.logo ? (
                <div className="solution-visual-logo-container">
                  <img src={solution.logo} alt={`Logo ${solution.name}`} className="solution-visual-logo" />
                </div>
              ) : (
                <div className="solution-visual-placeholder">
                  <span>{solution.name.slice(0, 2).toUpperCase()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SolutionPage;