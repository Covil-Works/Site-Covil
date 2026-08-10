import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/equipe.css";

const TEAM_MEMBERS = [
  {
    id: "arthur-pimentel",
    name: "Arthur Pimentel",
    initials: "AP",
    role: "Co-fundador & Dev Full-Stack",
    bio: "Especialista em arquitetura de software, desenvolvimento full-stack e engenharia de soluções robustas e escaláveis sob medida.",
    tags: ["React", "Node.js", "Arquitetura", "Mobile"]
  },
  {
    id: "caio-silva",
    name: "Caio Silva",
    initials: "CS",
    role: "Co-fundador & Dev Full-Stack",
    bio: "Focado em sistemas web de alta performance, desenvolvimento de APIs eficientes e infraestrutura focada na necessidade do negócio.",
    tags: ["Systems", "Web", "APIs", "Performance"]
  },
  {
    id: "jose-pereira",
    name: "José Pereira",
    initials: "JP",
    role: "Co-fundador & Dev Full-Stack",
    bio: "Engenheiro de software dedicado à criação de interfaces modernas, experiência do usuário impecável e soluções integradas.",
    tags: ["UI/UX", "Frontend", "React", "Mobile"]
  }
];

function EquipePage() {
  useEffect(() => {
    document.title = "Equipe | Covil";
  }, []);

  useEffect(() => {
    const teamCards = Array.from(document.querySelectorAll(".team-card"));

    if (teamCards.length === 0) {
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

    teamCards.forEach((card) => {
      setCardPointerToCenter(card);
      card.addEventListener("pointerenter", updateCardPointer);
      card.addEventListener("pointermove", updateCardPointer);
    });

    const updateAllCardCenters = () => {
      teamCards.forEach(setCardPointerToCenter);
    };

    window.addEventListener("resize", updateAllCardCenters);

    return () => {
      teamCards.forEach((card) => {
        card.removeEventListener("pointerenter", updateCardPointer);
        card.removeEventListener("pointermove", updateCardPointer);
      });

      window.removeEventListener("resize", updateAllCardCenters);
    };
  }, []);

  return (
    <div className="equipe-page">
      <Navbar activePage="equipe" />

      <section className="equipe-title-section">
        <h1>
          Conheça a <strong>Nossa Equipe</strong>
        </h1>
        <p>
          Os desenvolvedores por trás da Covil: profissionais apaixonados por tecnologia, código limpo e arquiteturas sólidas.
        </p>
      </section>

      <main className="equipe-container">
        <div className="team-grid">
          {TEAM_MEMBERS.map((member) => (
            <article key={member.id} className="team-card">
              <div className="team-avatar" aria-hidden="true">
                {member.initials}
              </div>
              <h2 className="team-name">{member.name}</h2>
              <span className="team-role">{member.role}</span>
              <p className="team-bio">{member.bio}</p>
              <div className="team-tags">
                {member.tags.map((tag) => (
                  <span key={tag} className="team-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default EquipePage;
