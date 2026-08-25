import React, { useEffect } from "react";
import "../styles/links.css";

function LinksPage({ theme = "dark" }) {
  useEffect(() => {
    document.title = "Links | Covil";
  }, []);

  const socialLinks = [
    {
      title: "WhatsApp",
      url: "https://wa.me/5591984085049",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img">
          <path d="M12.1 3.1a8.7 8.7 0 0 0-7.5 13.2L3 21l4.9-1.5a8.9 8.9 0 0 0 4.2 1.1h.1a8.8 8.8 0 0 0-.1-17.5Z" />
          <path d="M9 8.7c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .5.4.2.5.8 1.8.8 1.9.1.2.1.3 0 .5s-.2.3-.4.4-.3.3-.4.4c-.1.1-.2.3 0 .5.2.4 1 1.6 2.4 2.1.3.1.5.1.6 0 .2-.2.5-.6.6-.8.2-.2.3-.2.5-.1.2.1 1.3.6 1.5.7.2.1.4.2.4.3s0 .8-.3 1.2c-.2.4-1 .8-1.3.8-.4.1-.8.2-1.3 0a7 7 0 0 1-2.1-.7 8.1 8.1 0 0 1-2.8-2.5c-.8-1.1-1.2-2.1-1.4-2.8-.2-.7.1-1.1.3-1.4.2-.3.4-.5.6-.7Z" />
        </svg>
      )
    },
    {
      title: "Instagram",
      url: "https://www.instagram.com/covildev/",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img">
          <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.5" cy="6.6" r="1.1" />
        </svg>
      )
    },
    {
      title: "LinkedIn",
      url: "https://linkedin.com/company/covildev",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img">
          <rect x="3.1" y="3.1" width="17.8" height="17.8" rx="3.3" />
          <path d="M8 10.2v6.6" />
          <circle cx="8" cy="7.5" r="1" />
          <path d="M11.6 16.8v-6.6h3v1c.4-.7 1.3-1.3 2.5-1.3 2 0 2.9 1.2 2.9 3.4v3.5h-3v-3.2c0-1-.3-1.7-1.2-1.7s-1.2.7-1.2 1.8v3.1Z" />
        </svg>
      )
    },
    {
      title: "E-mail",
      url: "mailto:covildev@gmail.com",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img">
          <rect x="3" y="5.6" width="18" height="12.8" rx="2.1" />
          <path d="M3.8 7.1 12 13.2l8.2-6.1" />
        </svg>
      )
    }
  ];

  const mainLinks = [
    {
      title: "Site Oficial",
      url: "/",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </svg>
      )
    },
    {
      title: "SplitUp",
      url: "https://play.google.com/store/apps/details?id=com.covildev.splitup&pcampaignid=web_share",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
          <line x1="12" y1="18" x2="12.01" y2="18"/>
        </svg>
      )
    },
    {
      title: "MyWL",
      url: "https://mywl.covildev.com",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      )
    }
  ];

  return (
    <div className="links-page" data-theme={theme}>
      <div className="links-fireflies" aria-hidden="true">
        <span className="links-firefly links-firefly--north" />
        <span className="links-firefly links-firefly--middle" />
        <span className="links-firefly links-firefly--south" />
      </div>

      <main className="links-container">
        <header className="links-header">
          <div className="links-logo-wrap">
            <img src="/img/logo.svg" alt="Covil Dev Logo" className="links-logo" />
          </div>
          <img src="/img/nome-covil.svg" alt="Covil" className="links-title-image" />
          <p className="links-bio">
            Refúgio criativo. Desenvolvemos softwares sob medida.
          </p>
          <div className="links-social-row">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="links-social-icon"
                title={link.title}
                target="_blank"
                rel="noreferrer"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </header>

        <nav className="links-nav">
          {mainLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="links-card"
              target={link.url.startsWith("/") ? "_self" : "_blank"}
              rel="noreferrer"
            >
              <span className="links-card-icon">{link.icon}</span>
              <span className="links-card-title">{link.title}</span>
              <span className="links-card-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </a>
          ))}
        </nav>
      </main>
    </div>
  );
}

export default LinksPage;
