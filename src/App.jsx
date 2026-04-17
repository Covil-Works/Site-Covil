import { useEffect, useState } from "react";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleMenuToggle = () => {
    setIsMobileMenuOpen((current) => !current);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-overlay" />
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
              <a href="#contato" className="cta-button" onClick={closeMobileMenu}>
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
        <section id="sobre" className="about-card">
          <div className="about-logo-wrap">
            <img src="/img/logo.svg" alt="Logo Covil" className="about-logo" />
          </div>
          <div className="about-text">
            <h2>Sobre nós</h2>
            <p>
              A Covil transforma ideias em produtos digitais sob medida, com foco em
              resultado real, performance e experiência para o seu negócio.
            </p>
          </div>
        </section>

        <section id="projetos" className="services">
          <article>
            <h3>Sites e Landing Pages</h3>
            <p>
              Sites institucionais e landing pages para posicionar o seu negócio na
              internet.
            </p>
          </article>

          <article>
            <h3>Aplicativos Mobile</h3>
            <p>Aplicativos para celular que atendem às suas necessidades específicas.</p>
          </article>

          <article>
            <h3>Sistemas Web</h3>
            <p>Sistemas para o seu negócio acessíveis diretamente do navegador.</p>
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

            <h2 id="contato" className="contact-title">
              Contato
            </h2>

            <article className="contact-card">
              <div className="contact-side-glow" />
              <div className="contact-main">
                <p>
                  Quer desenvolver um projeto novo que atenda a todas as suas
                  necessidades com uma equipe dedicada e qualificada? Estamos prontos
                  para te atender.
                </p>
                <a href="#contato" className="cta-button contact-button">
                  Fale com um Especialista
                </a>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
