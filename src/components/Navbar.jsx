import { useEffect, useState } from "react";

function Navbar({ activePage = "", theme = "dark", toggleTheme }) {
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
              Sobre
            </a>
            <a
              href="/equipe"
              onClick={closeMobileMenu}
              className={activePage === "equipe" ? "is-active" : ""}
            >
              Equipe
            </a>
            <a
              href="/solucoes"
              onClick={closeMobileMenu}
              className={activePage === "solucoes" ? "is-active" : ""}
            >
              Soluções
            </a>
            <a
              href="/contato"
              onClick={closeMobileMenu}
              className={activePage === "contato" ? "is-active" : ""}
            >
              Contato
            </a>
            {toggleTheme && (
              <button
                className="theme-toggle-nav"
                type="button"
                onClick={() => {
                  toggleTheme();
                  closeMobileMenu();
                }}
                aria-label={`Ativar modo ${theme === "light" ? "escuro" : "claro"}`}
                aria-pressed={theme === "dark"}
              >
                {theme === "light" ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.5 14.1A8.5 8.5 0 0 1 9.9 3.5a8.5 8.5 0 1 0 10.6 10.6Z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
