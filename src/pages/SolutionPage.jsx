import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/solutions.css";
function SolutionPage({ solutionSlug, solution }) {
  useEffect(() => { document.title = `${solution.name} | Covil`; }, [solution.name]);
  const available = solutionSlug === "splitup";
  return <div className={`solution-page solution-page--${solution.accent}`}><Navbar /><main className="solution-detail"><div className="solution-detail-inner"><a className="solution-back-link" href="/solucoes"><span>←</span> Todas as soluções</a><div className="solution-detail-layout"><div><p className="solutions-kicker">{solution.category}</p><h1>{solution.name}</h1><p className="solution-detail-description">{solution.description}</p><p className="solution-detail-support">{available ? "Uma experiência feita para deixar a rotina mais leve e as decisões mais claras." : "Estamos preparando cada detalhe para que essa solução chegue do jeito certo."}</p>{available ? <a className="solution-primary-link" href="https://play.google.com/store/apps/details?id=com.covildev.splitup&pcampaignid=web_share" target="_blank" rel="noreferrer">Conhecer no Google Play ↗</a> : <a className="solution-primary-link" href="https://wa.me/5591984085049" target="_blank" rel="noreferrer">Falar com a Covil ↗</a>}</div><div className="solution-detail-art"><div className="solution-art-ring solution-art-ring--outer" /><div className="solution-art-ring solution-art-ring--inner" /><div className="solution-art-core"><span>{solution.name.slice(0, 1)}</span></div><small>{available ? "live / product" : "coming / soon"}</small></div></div></div></main><Footer /></div>;
}
export default SolutionPage;