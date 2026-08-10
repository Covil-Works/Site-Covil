function Footer() {
  return (
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
          <a href="/#sobre">Sobre nós</a>
          <a href="/equipe">Equipe</a>
          <a href="/#projetos">Serviços</a>
          <a href="/#contato">Contato</a>
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
  );
}

export default Footer;
