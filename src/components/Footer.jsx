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
          <a href="/#sobre">Sobre</a>
          <a href="/equipe">Equipe</a>
          <a href="/solucoes">Soluções</a>
          <a href="/contato">Contato</a>
        </nav>

        <div className="site-footer-contact">
          <h2>Contato</h2>
          <a href="https://wa.me/5591984085049" target="_blank" rel="noreferrer">
            WhatsApp: (91) 98408-5049
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
            <a
              href="https://github.com/Covil-Works"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub da Covil"
            >
              <svg viewBox="0 0 24 24" role="img">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" fill="currentColor" />
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
