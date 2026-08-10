import { useEffect, useState } from "react";

function Navbar({ activePage = "" }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen((current) => !current);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`site-header-fixed${isScrolled ? " is-scrolled" : ""}`}>
      <div className="site-header-inner">
        <nav className="navbar">
          <a href="/" className="brand" aria-label="Covil">
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
            <a
              href="/#sobre"
              onClick={closeMobileMenu}
              className={activePage === "sobre" ? "is-active" : ""}
            >
              Sobre nós
            </a>
            <a
              href="/equipe"
              onClick={closeMobileMenu}
              className={activePage === "equipe" ? "is-active" : ""}
            >
              Equipe
            </a>
            <a
              href="/#contato"
              onClick={closeMobileMenu}
              className={activePage === "contato" ? "is-active" : ""}
            >
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
      </div>
    </header>
  );
}

export default Navbar;
