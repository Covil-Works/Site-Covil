import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/solutions.css";
function Mark({ accent }) { return <span className={`solution-mark solution-mark--${accent}`} aria-hidden="true"><i /><i /><i /></span>; }
function SolutionsPage({ solutions }) {
  useEffect(() => { document.title = "Soluções | Covil"; }, []);
  return <div className="solutions-page"><Navbar /><main>
    <section className="solutions-intro"><div className="solutions-intro-glow" aria-hidden="true" /><div className="solutions-intro-content"><a className="solutions-back-link" href="/"><span>←</span> Covil Dev</a><p className="solutions-kicker">O que construímos</p><h1>Soluções que<br /><em>ganham vida.</em></h1><p className="solutions-lead">Produtos digitais criados pela Covil para resolver problemas reais — com clareza, cuidado e código que aguenta o caminho.</p></div><div className="solutions-intro-note">Covil / 2026</div></section>
    <section className="solutions-list"><div className="solutions-list-header"><h2>Nossas soluções</h2><span>{Object.keys(solutions).length.toString().padStart(2, "0")} produtos</span></div><div className="solutions-grid">{Object.entries(solutions).map(([slug, solution], index) => <a className={`solution-card solution-card--${solution.accent}`} href={`/solucoes/${slug}`} key={slug}><div className="solution-card-topline"><span>0{index + 1}</span><span className="solution-status">{solution.status}</span></div><Mark accent={solution.accent} /><div className="solution-card-content"><p>{solution.category}</p><h3>{solution.name}</h3><span>{solution.description}</span></div><b className="solution-card-arrow">↗</b></a>)}</div></section>
  </main><Footer /></div>;
}
export default SolutionsPage;