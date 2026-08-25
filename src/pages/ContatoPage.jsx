import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/contato.css";

const CONTACT_CHANNELS = [
  {
    id: "whatsapp",
    title: "WhatsApp",
    handle: "(91) 98408-5049",
    category: "Atendimento Rápido",
    description: "Canal principal para orçamentos, reuniões e alinhamento de novos projetos.",
    url: "https://wa.me/5591984085049?text=Ol%C3%A1%2C%20equipe%20Covil!%20Quero%20conversar%20sobre%20um%20projeto.",
    action: "Chamar no WhatsApp",
    badge: "Disponível",
    isPrimary: true,
    icon: (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
        <path d="M12.1 3.1a8.7 8.7 0 0 0-7.5 13.2L3 21l4.9-1.5a8.9 8.9 0 0 0 4.2 1.1h.1a8.8 8.8 0 0 0-.1-17.5Z" />
        <path d="M9 8.7c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .5.4.2.5.8 1.8.8 1.9.1.2.1.3 0 .5s-.2.3-.4.4-.3.3-.4.4c-.1.1-.2.3 0 .5.2.4 1 1.6 2.4 2.1.3.1.5.1.6 0 .2-.2.5-.6.6-.8.2-.2.3-.2.5-.1.2.1 1.3.6 1.5.7.2.1.4.2.4.3s0 .8-.3 1.2c-.2.4-1 .8-1.3.8-.4.1-.8.2-1.3 0a7 7 0 0 1-2.1-.7 8.1 8.1 0 0 1-2.8-2.5c-.8-1.1-1.2-2.1-1.4-2.8-.2-.7.1-1.1.3-1.4.2-.3.4-.5.6-.7Z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    title: "Instagram",
    handle: "@covildev",
    category: "Rede Social",
    description: "Acompanhe nossos bastidores, projetos recentes e publicações sobre tecnologia.",
    url: "https://www.instagram.com/covildev/",
    action: "Seguir @covildev",
    isPrimary: false,
    icon: (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
        <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.5" cy="6.6" r="1.1" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    handle: "Covil Dev",
    category: "Perfil Institucional",
    description: "Conexões profissionais, artigos técnicos e novidades sobre a empresa.",
    url: "https://linkedin.com/company/covildev",
    action: "Conectar no LinkedIn",
    isPrimary: false,
    icon: (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
        <rect x="3.1" y="3.1" width="17.8" height="17.8" rx="3.3" />
        <path d="M8 10.2v6.6" />
        <circle cx="8" cy="7.5" r="1" />
        <path d="M11.6 16.8v-6.6h3v1c.4-.7 1.3-1.3 2.5-1.3 2 0 2.9 1.2 2.9 3.4v3.5h-3v-3.2c0-1-.3-1.7-1.2-1.7s-1.2.7-1.2 1.8v3.1Z" />
      </svg>
    ),
  },
  {
    id: "email",
    title: "E-mail",
    handle: "covildev@gmail.com",
    category: "Contato Formal",
    description: "Para envio de briefing, propostas formais e parcerias institucionais.",
    url: "mailto:covildev@gmail.com",
    action: "Enviar E-mail",
    isPrimary: false,
    icon: (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
        <rect x="3" y="5.6" width="18" height="12.8" rx="2.1" />
        <path d="M3.8 7.1 12 13.2l8.2-6.1" />
      </svg>
    ),
  },
  {
    id: "github",
    title: "GitHub",
    handle: "Covil-Works",
    category: "Repositório & Open Source",
    description: "Confira nossos repositórios, projetos de código aberto e soluções da comunidade.",
    url: "https://github.com/Covil-Works",
    action: "Ver no GitHub",
    isPrimary: false,
    icon: (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
      </svg>
    ),
  },
];

function ContatoPage({ theme = "dark", toggleTheme }) {
  useEffect(() => {
    document.title = "Contato | Covil";
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

  const primaryChannel = CONTACT_CHANNELS.find((item) => item.isPrimary);
  const secondaryChannels = CONTACT_CHANNELS.filter((item) => !item.isPrimary);

  return (
    <div className="contato-page" data-theme={theme}>
      <Navbar activePage="contato" theme={theme} toggleTheme={toggleTheme} />

      <section className="contato-hero reveal-on-scroll">
        <h1>
          Vamos tirar seu <strong>projeto do papel?</strong>
        </h1>
        <p>
          Fale diretamente com a equipe da Covil Dev pelos nossos canais oficiais. Escolha a forma de contato de sua preferência e vamos construir juntos.
        </p>
      </section>

      <main className="contato-container">
        {primaryChannel && (
          <section className="contato-primary-section reveal-on-scroll" style={{ "--reveal-delay": "60ms" }}>
            <a
              href={primaryChannel.url}
              target="_blank"
              rel="noreferrer"
              className="contato-primary-card"
              aria-label={`Falar no ${primaryChannel.title}`}
            >
              <div className="contato-primary-badge">
                <span className="contato-live-dot" aria-hidden="true" />
                {primaryChannel.badge}
              </div>

              <div className="contato-primary-main">
                <div className="contato-primary-icon-wrap">
                  {primaryChannel.icon}
                </div>
                <div className="contato-primary-info">
                  <span className="contato-channel-category">{primaryChannel.category}</span>
                  <h2 className="contato-primary-title">{primaryChannel.title}</h2>
                  <p className="contato-primary-handle">{primaryChannel.handle}</p>
                  <p className="contato-primary-desc">{primaryChannel.description}</p>
                </div>
              </div>

              <div className="contato-primary-action">
                <span>{primaryChannel.action}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </section>
        )}

        <section className="contato-grid-section">
          <div className="contato-section-header reveal-on-scroll" style={{ "--reveal-delay": "100ms" }}>
            <h2>Nossos canais e redes sociais</h2>
            <p>Conecte-se com a Covil Dev em nossas plataformas oficiais.</p>
          </div>

          <div className="contato-grid">
            {secondaryChannels.map((channel, index) => (
              <a
                key={channel.id}
                href={channel.url}
                target="_blank"
                rel="noreferrer"
                className="contato-card reveal-on-scroll"
                style={{ "--reveal-delay": `${(index + 1) * 80}ms` }}
                aria-label={`${channel.title} - ${channel.handle}`}
              >
                <div className="contato-card-header">
                  <div className="contato-card-icon">{channel.icon}</div>
                  <span className="contato-channel-category">{channel.category}</span>
                </div>

                <div className="contato-card-body">
                  <h3 className="contato-card-title">{channel.title}</h3>
                  <span className="contato-card-handle">{channel.handle}</span>
                  <p className="contato-card-desc">{channel.description}</p>
                </div>

                <div className="contato-card-footer">
                  <span className="contato-card-action">{channel.action}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ContatoPage;
