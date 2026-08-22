import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/equipe.css";

const TEAM_MEMBERS = [
  { id: "arthur-pimentel", name: "Arthur Pimentel", initials: "AP", role: "Cofundador e Arquiteto de Software", description: "Atua na arquitetura das soluções e na construção de experiências claras e funcionais, conectando decisões técnicas às necessidades de cada projeto.", photo: "/img/equipe/arthur.png", github: "https://github.com/artuenric", linkedin: "https://www.linkedin.com/in/artuenric" },
  { id: "caio-silva", name: "Caio Silva", initials: "CS", role: "Cofundador e Especialista em Segurança", description: "Contribui para o desenvolvimento de aplicações confiáveis, com atenção especial à segurança, à estabilidade e à qualidade das entregas.", photo: "/img/equipe/caio.jpeg", github: "https://github.com/caiojulio", linkedin: "https://www.linkedin.com/in/caiojs/" },
  { id: "jose-pereira", name: "José Pereira", initials: "JP", role: "Cofundador e Desenvolvedor Back-end", description: "Trabalha principalmente na construção das regras de negócio, integrações e serviços que sustentam as soluções desenvolvidas pela equipe.", photo: "/img/equipe/jose.jpeg", github: "https://github.com/josegab12", linkedin: "https://linkedin.com/in/josé-gabriel-silva-pereira-a55854262" }
];

function shuffleMembers(members) {
  const shuffled = [...members];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

function Contact({ href, children }) {
  if (!href) return null;
  const external = href.startsWith("http");
  return <a className="team-contact" href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} onClick={(event) => event.stopPropagation()}>{children}{external && <span aria-hidden="true"> ↗</span>}</a>;
}

function EquipePage() {
  const [expandedId, setExpandedId] = useState(null);
  const [members] = useState(() => shuffleMembers(TEAM_MEMBERS));
  useEffect(() => { document.title = "Equipe | Covil"; }, []);

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

  const toggleMember = (id) => {
    const update = () => setExpandedId((current) => current === id ? null : id);
    if (document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) document.startViewTransition(update);
    else update();
  };

  return (
    <div className="equipe-page">
      <Navbar activePage="equipe" />
      <section className="equipe-title-section reveal-on-scroll">
        <h1>Conheça a <strong>Nossa Equipe</strong></h1>
        <p>Os desenvolvedores por trás da Covil: profissionais apaixonados por tecnologia, código limpo e arquiteturas sólidas.</p>
      </section>
      <main className="equipe-container">
        <div className="team-grid">
          {members.map((member, index) => {
            const expanded = expandedId === member.id;
            const activate = (event) => {
              if (event.type === "keydown" && event.key !== "Enter" && event.key !== " ") return;
              if (event.type === "keydown") event.preventDefault();
              toggleMember(member.id);
            };
            return (
              <article key={member.id} className={`team-card reveal-on-scroll${expanded ? " is-expanded" : ""}`} style={{ "--reveal-delay": `${index * 120}ms`, viewTransitionName: `member-${member.id}` }} role="button" tabIndex="0" aria-expanded={expanded} aria-controls={`details-${member.id}`} onClick={activate} onKeyDown={activate}>
                {expanded && (
                  <button className="team-close" type="button" aria-label={`Fechar detalhes de ${member.name}`} onClick={(event) => { event.stopPropagation(); toggleMember(member.id); }}>
                    <span aria-hidden="true">×</span>
                  </button>
                )}
                <div className="team-summary">
                  <div className="team-avatar">
                    {member.photo ? <img src={member.photo} alt={`Foto de ${member.name}`} /> : <span aria-label={`Foto de ${member.name} ainda não adicionada`}>{member.initials}</span>}
                  </div>
                  <div className="team-heading"><h2 className="team-name">{member.name}</h2><span className="team-role">{member.role}</span></div>
                  {!expanded && <span className="team-more" aria-hidden="true">Saiba mais</span>}
                </div>
                <div id={`details-${member.id}`} className="team-details" aria-hidden={!expanded}>
                  <div className="team-details-inner">
                    <p className="team-description">{member.description}</p>
                    <div className="team-contacts" aria-label={`Contatos de ${member.name}`}>
                      <Contact href={member.github}>GitHub</Contact>
                      <Contact href={member.linkedin}>LinkedIn</Contact>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>
      <section className="equipe-contact reveal-on-scroll" aria-labelledby="equipe-contact-title">
        <div>
          <h2 id="equipe-contact-title">Tem um projeto em mente?</h2>
          <p>Converse com a nossa equipe e descubra como podemos transformar sua ideia em uma solução digital.</p>
        </div>
        <a
          href="https://wa.me/5591984085049?text=Ol%C3%A1%2C%20equipe%20Covil!%20Quero%20conversar%20sobre%20um%20projeto."
          target="_blank"
          rel="noreferrer"
          aria-label="Conversar com a equipe Covil pelo WhatsApp"
        >
          Chamar no WhatsApp <span aria-hidden="true">↗</span>
        </a>
      </section>
      <Footer />
    </div>
  );
}

export default EquipePage;
