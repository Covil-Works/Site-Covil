import { useEffect, useRef, useState } from "react";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const aboutCardRef = useRef(null);

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
    const serviceCards = Array.from(document.querySelectorAll(".services article"));

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
              <a href="#projetos" className="cta-button" onClick={closeMobileMenu}>
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
            <article className="why-card">
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
        </section>
      </main>
    </div>
  );
}

export default App;
