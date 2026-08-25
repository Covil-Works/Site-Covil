import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/contato.css";

const CONTACT_CHANNELS = [
  {
    id: "whatsapp",
    title: "WhatsApp",
    handle: "(91) 98408-5049",
    url: "https://wa.me/5591984085049?text=Ol%C3%A1%2C%20equipe%20Covil!%20Quero%20conversar%20sobre%20um%20projeto.",
    action: "Chamar no WhatsApp",
    isPrimary: true,
    icon: (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    title: "Instagram",
    handle: "@covildev",
    url: "https://www.instagram.com/covildev/",
    action: "Seguir @covildev",
    isPrimary: false,
    icon: (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    handle: "Covil Dev",
    url: "https://linkedin.com/company/covildev",
    action: "Conectar no LinkedIn",
    isPrimary: false,
    icon: (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: "email",
    title: "E-mail",
    handle: "covildev@gmail.com",
    url: "mailto:covildev@gmail.com",
    action: "Enviar E-mail",
    isPrimary: false,
    icon: (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
  {
    id: "github",
    title: "GitHub",
    handle: "Covil-Works",
    url: "https://github.com/Covil-Works",
    action: "Ver no GitHub",
    isPrimary: false,
    icon: (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
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
          Fale diretamente com a equipe da Covil Dev pelos nossos canais oficiais.
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
              <div className="contato-primary-main">
                <div className="contato-primary-icon-wrap">
                  {primaryChannel.icon}
                </div>
                <div className="contato-primary-info">
                  <h2 className="contato-primary-title">{primaryChannel.title}</h2>
                  <p className="contato-primary-handle">{primaryChannel.handle}</p>
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
                </div>

                <div className="contato-card-body">
                  <h3 className="contato-card-title">{channel.title}</h3>
                  <span className="contato-card-handle">{channel.handle}</span>
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
