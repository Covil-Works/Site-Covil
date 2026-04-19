import { useEffect, useRef, useState } from "react";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const aboutCardRef = useRef(null);
  const whyCardRef = useRef(null);

  useEffect(() => {
    const closeMenuOnDesktop = () => {
      if (window.innerWidth > 720) {
        setIsMobileMenuOpen(false);
      }
    };

    closeMenuOnDesktop();
    window.addEventListener("resize", closeMenuOnDesktop);

    return () => {
      window.removeEventListener("resize", closeMenuOnDesktop);
    };
  }, []);

  useEffect(() => {
    let rafId = null;

    const updateHeroScrollProgress = () => {
      rafId = null;

      if (!pageRef.current || !heroRef.current) {
        return;
      }

      const heroHeight = heroRef.current.offsetHeight;
      const maxScrollableDistance = Math.max(heroHeight * 0.9, 1);
      const scrollProgress = Math.min(window.scrollY / maxScrollableDistance, 1);
      pageRef.current.style.setProperty("--hero-scroll-progress", scrollProgress.toFixed(4));
    };

    const scheduleUpdate = () => {
      if (rafId !== null) {
        return;
      }

      rafId = window.requestAnimationFrame(updateHeroScrollProgress);
    };

    updateHeroScrollProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    const updateAboutCardOverlap = () => {
      if (!pageRef.current || !aboutCardRef.current) {
        return;
      }

      const aboutCardHeight = aboutCardRef.current.offsetHeight;
      const isMobileViewport = window.innerWidth <= 720;
      const overlap = isMobileViewport ? 30 : Math.max(aboutCardHeight / 2, 0);
      pageRef.current.style.setProperty("--about-card-overlap", `${overlap.toFixed(1)}px`);
    };

    updateAboutCardOverlap();

    let resizeObserver = null;

    if (typeof ResizeObserver !== "undefined" && aboutCardRef.current) {
      resizeObserver = new ResizeObserver(updateAboutCardOverlap);
      resizeObserver.observe(aboutCardRef.current);
    }

    window.addEventListener("resize", updateAboutCardOverlap);

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }

      window.removeEventListener("resize", updateAboutCardOverlap);
    };
  }, []);

  useEffect(() => {
    const serviceCards = Array.from(document.querySelectorAll(".services article, .contact-card"));

    if (serviceCards.length === 0) {
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

    serviceCards.forEach((card) => {
      setCardPointerToCenter(card);
      card.addEventListener("pointerenter", updateCardPointer);
      card.addEventListener("pointermove", updateCardPointer);
    });

    const updateAllCardCenters = () => {
      serviceCards.forEach(setCardPointerToCenter);
    };

    window.addEventListener("resize", updateAllCardCenters);

    return () => {
      serviceCards.forEach((card) => {
        card.removeEventListener("pointerenter", updateCardPointer);
        card.removeEventListener("pointermove", updateCardPointer);
      });

      window.removeEventListener("resize", updateAllCardCenters);
    };
  }, []);

  useEffect(() => {
    let rafId = null;

    const updateWhyCardBackground = () => {
      rafId = null;

      if (!whyCardRef.current) {
        return;
      }

      const rect = whyCardRef.current.getBoundingClientRect();
      const viewportHeight = Math.max(window.innerHeight, 1);
      const fadeStart = viewportHeight * 0.75;
      const fadeEnd = viewportHeight * 0.2;
      const rawProgress = (fadeStart - rect.top) / Math.max(fadeStart - fadeEnd, 1);
      const fadeProgress = Math.max(0, Math.min(rawProgress, 1));
      const backgroundOpacity = 0.1 + (fadeProgress * 0.9);

      whyCardRef.current.style.setProperty("--why-card-bg-opacity", backgroundOpacity.toFixed(4));
    };

    const scheduleUpdate = () => {
      if (rafId !== null) {
        return;
      }

      rafId = window.requestAnimationFrame(updateWhyCardBackground);
    };

    updateWhyCardBackground();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen((current) => !current);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="page" ref={pageRef}>
      <header className="hero" ref={heroRef}>
        <div className="hero-media" aria-hidden="true">
          <div className="hero-bg" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <nav className="navbar">
            <a href="#" className="brand" aria-label="Covil">
              <img src="/img/nome-covil.svg" alt="Covil" />
            </a>

            <button
              type="button"
              className="menu-toggle"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="site-menu"
              onClick={handleMenuToggle}
            >
              <span />
              <span />
              <span />
            </button>

            <div id="site-menu" className={`menu${isMobileMenuOpen ? " is-open" : ""}`}>
              <a href="#sobre" onClick={closeMobileMenu}>
                Sobre nós
              </a>
              <a href="#projetos" onClick={closeMobileMenu}>
                Projetos
              </a>
              <a href="#contato" onClick={closeMobileMenu}>
                Contato
              </a>
              <a
                href="https://wa.me/5591986402937"
                target="_blank"
                rel="noreferrer"
                className="cta-button"
                onClick={closeMobileMenu}
              >
                Crie seu projeto
              </a>
            </div>
          </nav>

          <section className="hero-text">
            <h1>
              Softwares <strong>robustos, escaláveis</strong>
              <br />
              e focados na necessidade real
              <br />
              do <strong>seu negócio.</strong>
            </h1>
            <p>Seu projeto no conforto e segurança do nosso covil.</p>
          </section>
        </div>
      </header>

      <main className="content">
        <section id="sobre" className="about-card" ref={aboutCardRef}>
          <div className="about-logo-wrap">
            <img src="/img/logo.svg" alt="Logo Covil" className="about-logo" />
          </div>
          <div className="about-text">
            <h2>Sobre nós</h2>
            <p>
              Uma ideia só tem impacto quando se torna realidade, e para isso, ela precisa de um ambiente focado em construção e excelência técnica. Esse lugar é a Covil. Do Norte do Brasil para o mundo, desenvolvemos softwares sob medida de acordo com as suas necessidades.
            </p>
          </div>
        </section>

        <h2 className="services-heading">Nossos Serviços</h2>

        <section id="projetos" className="services">
          <article>
            <h3 className="service-title">
              <span className="service-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18" />
                  <path d="M12 3a15 15 0 0 1 0 18" />
                  <path d="M12 3a15 15 0 0 0 0 18" />
                </svg>
              </span>
              <span>Sites</span>
            </h3>
            <p>
              Sites institucionais e landing pages para posicionar o seu negócio na
              internet.
            </p>
          </article>

          <article>
            <h3 className="service-title">
              <span className="service-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img">
                  <rect x="7" y="2.5" width="10" height="19" rx="2.2" ry="2.2" />
                  <path d="M10 5h4" />
                  <circle cx="12" cy="18.5" r="0.7" />
                </svg>
              </span>
              <span>Aplicativos Mobile</span>
            </h3>
            <p>Aplicativos para celular personalizados que atendem às suas necessidades específicas.</p>
          </article>

          <article>
            <h3 className="service-title">
              <span className="service-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img">
                  <rect x="3.5" y="4.5" width="17" height="15" rx="2.2" ry="2.2" />
                  <path d="M3.5 8.5h17" />
                  <circle cx="6.3" cy="6.5" r="0.8" />
                  <circle cx="9.1" cy="6.5" r="0.8" />
                  <path d="M9 12.2 7 14.2l2 2" />
                  <path d="M14 12.2 16 14.2l-2 2" />
                </svg>
              </span>
              <span>Sistemas Web</span>
            </h3>
            <p>Sistemas completos acessíveis de qualquer lugar diretamente pelo navegador.</p>
          </article>
        </section>

        <section className="forest-section">
          <div className="forest-overlay" />

          <div className="forest-strip">
            <h2>Por que a Covil?</h2>
          </div>

          <div className="forest-content">
            <article className="why-card" ref={whyCardRef}>
              <div className="why-card-left">
                <h3>
                  Parceria,
                  <br />
                  Dedicação e
                  <br />
                  Qualidade
                </h3>
              </div>

              <div className="why-card-right">
                <p>
                  A Covil é o refúgio onde nossos desenvolvedores se reúnem para criar
                  código limpo e arquiteturas sólidas.
                </p>
                <p>
                  Nossa equipe é formada por pessoas apaixonadas por tecnologia e
                  resolução de problemas.
                </p>
                <p>
                  Tratamos cada projeto como se fosse nosso, garantindo segurança,
                  escalabilidade e manutenibilidade a longo prazo.
                </p>
              </div>
            </article>
          </div>

          <div className="forest-strip" aria-hidden="true" />
        </section>

        <section id="contato" className="contact-section" aria-labelledby="contact-heading">
          <div className="contact-header">
            <h2 id="contact-heading">Vamos tirar seu projeto do papel?</h2>
            <p>Fale com a Covil no WhatsApp e comece agora mesmo a construção do seu software.</p>
          </div>

          <div className="contact-grid">
            <a
              href="https://wa.me/5591986402937"
              target="_blank"
              rel="noreferrer"
              className="contact-card contact-card--cta"
              aria-label="Chamar a Covil no WhatsApp"
            >
              <span className="contact-card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img">
                  <path d="M12.1 3.1a8.7 8.7 0 0 0-7.5 13.2L3 21l4.9-1.5a8.9 8.9 0 0 0 4.2 1.1h.1a8.8 8.8 0 0 0-.1-17.5Z" />
                  <path d="M9 8.7c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .5.4.2.5.8 1.8.8 1.9.1.2.1.3 0 .5s-.2.3-.4.4-.3.3-.4.4c-.1.1-.2.3 0 .5.2.4 1 1.6 2.4 2.1.3.1.5.1.6 0 .2-.2.5-.6.6-.8.2-.2.3-.2.5-.1.2.1 1.3.6 1.5.7.2.1.4.2.4.3s0 .8-.3 1.2c-.2.4-1 .8-1.3.8-.4.1-.8.2-1.3 0a7 7 0 0 1-2.1-.7 8.1 8.1 0 0 1-2.8-2.5c-.8-1.1-1.2-2.1-1.4-2.8-.2-.7.1-1.1.3-1.4.2-.3.4-.5.6-.7Z" />
                </svg>
              </span>
              <span className="contact-card-content">
                <span className="contact-card-label">WhatsApp</span>
                <span className="contact-card-value">(91) 98640-2937</span>
              </span>
              <span className="contact-card-action">Chamar agora</span>
            </a>

            <div className="contact-alt" aria-label="Outras redes de contato">
              <p>ou pelas outras redes sociais</p>
              <div className="contact-alt-icons">
                <a
                  href="https://www.instagram.com/covildev/"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-alt-link"
                  aria-label="Instagram da Covil"
                >
                  <svg viewBox="0 0 24 24" role="img">
                    <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
                    <circle cx="12" cy="12" r="4.2" />
                    <circle cx="17.5" cy="6.6" r="1.1" />
                  </svg>
                </a>

                <a
                  href="https://linkedin.com/company/covildev"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-alt-link"
                  aria-label="LinkedIn da Covil"
                >
                  <svg viewBox="0 0 24 24" role="img">
                    <rect x="3.1" y="3.1" width="17.8" height="17.8" rx="3.3" />
                    <path d="M8 10.2v6.6" />
                    <circle cx="8" cy="7.5" r="1" />
                    <path d="M11.6 16.8v-6.6h3v1c.4-.7 1.3-1.3 2.5-1.3 2 0 2.9 1.2 2.9 3.4v3.5h-3v-3.2c0-1-.3-1.7-1.2-1.7s-1.2.7-1.2 1.8v3.1Z" />
                  </svg>
                </a>

                <a
                  href="mailto:covildev@gmail.com"
                  className="contact-alt-link"
                  aria-label="Email da Covil"
                >
                  <svg viewBox="0 0 24 24" role="img">
                    <rect x="3" y="5.6" width="18" height="12.8" rx="2.1" />
                    <path d="M3.8 7.1 12 13.2l8.2-6.1" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" aria-labelledby="footer-title">
        <div className="site-footer-inner">
          <div className="site-footer-brand">
            <img src="/img/nome-covil.svg" alt="Covil" />
            <p>
              Desenvolvemos softwares robustos, escaláveis e sob medida para transformar
              ideias em soluções digitais.
            </p>
          </div>

          <nav className="site-footer-nav" aria-label="Links rápidos">
            <h2 id="footer-title">Links rápidos</h2>
            <a href="#sobre">Sobre nós</a>
            <a href="#projetos">Serviços</a>
            <a href="#contato">Contato</a>
          </nav>

          <div className="site-footer-contact">
            <h2>Contato</h2>
            <a href="https://wa.me/5591986402937" target="_blank" rel="noreferrer">
              WhatsApp: (91) 98640-2937
            </a>
            <a href="mailto:covildev@gmail.com">covildev@gmail.com</a>
          </div>

          <div className="site-footer-social">
            <h2>Redes sociais</h2>
            <div className="site-footer-social-icons">
              <a
                href="https://www.instagram.com/covildev/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram da Covil"
              >
                <svg viewBox="0 0 24 24" role="img">
                  <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.5" cy="6.6" r="1.1" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/covildev"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn da Covil"
              >
                <svg viewBox="0 0 24 24" role="img">
                  <rect x="3.1" y="3.1" width="17.8" height="17.8" rx="3.3" />
                  <path d="M8 10.2v6.6" />
                  <circle cx="8" cy="7.5" r="1" />
                  <path d="M11.6 16.8v-6.6h3v1c.4-.7 1.3-1.3 2.5-1.3 2 0 2.9 1.2 2.9 3.4v3.5h-3v-3.2c0-1-.3-1.7-1.2-1.7s-1.2.7-1.2 1.8v3.1Z" />
                </svg>
              </a>
              <a href="mailto:covildev@gmail.com" aria-label="Email da Covil">
                <svg viewBox="0 0 24 24" role="img">
                  <rect x="3" y="5.6" width="18" height="12.8" rx="2.1" />
                  <path d="M3.8 7.1 12 13.2l8.2-6.1" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="site-footer-bottom">
          <p>© {new Date().getFullYear()} Covil Dev. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
