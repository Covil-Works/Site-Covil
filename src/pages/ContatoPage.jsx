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
        <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.18-1.238-6.163-3.488-8.413Z" />
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
        <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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
        <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z" />
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
        <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
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
        <path fill="currentColor" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
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
              className={`contato-primary-card contato-primary-card--${primaryChannel.id}`}
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
                className={`contato-card contato-card--${channel.id} reveal-on-scroll`}
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
