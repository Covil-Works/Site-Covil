import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MOBILE_STACK_START = 20;
const MOBILE_STACK_GAP = 10;
const DESKTOP_STACK_START = 300;
const DESKTOP_STACK_GAP = 30;
const DESKTOP_STACK_3_TOP = DESKTOP_STACK_START + DESKTOP_STACK_GAP * 2;
const HERO_CONTENT_OFFSET_Y = -100;
const MOBILE_HERO_PHOTO_OFFSET_Y = -90;
const MOBILE_HERO_MENU_OFFSET_Y = -120;
const HERO_CONTENT_FADE = {
  start: 0.55,
  end: 0.8,
};
const STACK_SCROLL_SPEED = {
  desktop: [1, 0.7, 0.4],
  mobile: [0.8, 0.55, 0.3],
};
const DESKTOP_PARALLAX_DISTANCE = 60;

const heroStacks = [
  { light: "/img/stack1-light.svg", dark: "/img/stack1-dark.svg" },
  { light: "/img/stack2-light.svg", dark: "/img/stack2-dark.svg" },
  { light: "/img/stack3-light.svg", dark: "/img/stack3-dark.svg" },
].map((stack, index) => ({
  ...stack,
  desktopTop: DESKTOP_STACK_START + DESKTOP_STACK_GAP * index,
  mobileTop: MOBILE_STACK_START + MOBILE_STACK_GAP * index,
}));

function HomePage() {
  const [heroTheme, setHeroTheme] = useState("dark");
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const aboutCardRef = useRef(null);
  const whyCardRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const stacks = Array.from(hero.querySelectorAll(".hero__stack"));
    const mainContent = document.querySelector("main.content");
    const mobileQuery = window.matchMedia("(max-width: 760px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = null;

    const updateParallax = () => {
      frameId = null;
      const heroRect = hero.getBoundingClientRect();
      const scrollOffset = reducedMotionQuery.matches
        ? 0
        : Math.min(Math.max(-heroRect.top, 0), heroRect.height);
      const speeds = mobileQuery.matches
        ? STACK_SCROLL_SPEED.mobile
        : STACK_SCROLL_SPEED.desktop;
      const scrollProgress = heroRect.height > 0 ? scrollOffset / heroRect.height : 0;
      const fadeProgress = Math.min(
        Math.max(
          (scrollProgress - HERO_CONTENT_FADE.start) /
            (HERO_CONTENT_FADE.end - HERO_CONTENT_FADE.start),
          0
        ),
        1
      );
      const contentOpacity = 1 - fadeProgress;
      const introScroll = Math.min(scrollOffset, DESKTOP_PARALLAX_DISTANCE);
      const stackOffsets = mobileQuery.matches
        ? speeds.map((speed) => scrollOffset * speed)
        : speeds.map((speed) => introScroll * speed);

      hero.style.setProperty("--hero-scroll-offset", `${scrollOffset}px`);
      hero.style.setProperty("--birds-scroll-offset", `${scrollOffset * 1.8}px`);
      hero.style.setProperty("--fireflies-back-scroll-offset", `${scrollOffset * 1.55}px`);
      hero.style.setProperty("--fireflies-middle-scroll-offset", `${scrollOffset * 1.15}px`);
      hero.style.setProperty("--fireflies-front-scroll-offset", `${scrollOffset * 0.75}px`);
      hero.style.setProperty("--hero-content-opacity", contentOpacity);
      hero.toggleAttribute("data-content-hidden", contentOpacity === 0);

      if (mainContent) {
        mainContent.style.marginTop = `${-stackOffsets[2]}px`;
      }
      stacks.forEach((stack, index) => {
        stack.style.setProperty("--stack-parallax-y", `${-stackOffsets[index]}px`);
      });
    };

    const requestParallaxUpdate = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateParallax);
      }
    };

    updateParallax();
    window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
    window.addEventListener("resize", requestParallaxUpdate);
    mobileQuery.addEventListener("change", requestParallaxUpdate);
    reducedMotionQuery.addEventListener("change", requestParallaxUpdate);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", requestParallaxUpdate);
      window.removeEventListener("resize", requestParallaxUpdate);
      mobileQuery.removeEventListener("change", requestParallaxUpdate);
      reducedMotionQuery.removeEventListener("change", requestParallaxUpdate);
      if (mainContent) {
        mainContent.style.removeProperty("margin-top");
      }
    };
  }, []);

  const toggleHeroTheme = () => {
    setHeroTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

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

  return (
    <div className="page" ref={pageRef} data-theme={heroTheme}>
      <Navbar />

      <header
        ref={heroRef}
        className="hero"
        data-theme={heroTheme}
        style={{
          "--stack-3-top-desktop": `${DESKTOP_STACK_3_TOP}px`,
          "--hero-content-offset-y": `${HERO_CONTENT_OFFSET_Y}px`,
          "--mobile-hero-photo-offset-y": `${MOBILE_HERO_PHOTO_OFFSET_Y}px`,
          "--mobile-hero-menu-offset-y": `${MOBILE_HERO_MENU_OFFSET_Y}px`,
        }}
      >
        <div className="hero__background" aria-hidden="true" />

        <div className="hero__birds" aria-hidden="true">
          <img className="hero__bird hero__bird--1" src="/img/b1.png" alt="" />
          <img className="hero__bird hero__bird--2" src="/img/b2.png" alt="" />
          <img className="hero__bird hero__bird--3" src="/img/b3.png" alt="" />
        </div>

        {heroStacks.map((stack, index) => (
          <div
            className={`hero__stack hero__stack--${index + 1}`}
            key={stack.light}
            style={{
              "--stack-top-desktop": `${stack.desktopTop}px`,
              "--stack-top-mobile": `${stack.mobileTop}px`,
            }}
            aria-hidden="true"
          >
            <img className="hero__stack-image hero__stack-image--light" src={stack.light} alt="" />
            <img className="hero__stack-image hero__stack-image--dark" src={stack.dark} alt="" />
          </div>
        ))}

        <div className="hero__fireflies hero__fireflies--between-back" aria-hidden="true">
          <span className="hero__firefly hero__firefly--1" />
          <span className="hero__firefly hero__firefly--2" />
        </div>
        <div className="hero__fireflies hero__fireflies--between-front" aria-hidden="true">
          <span className="hero__firefly hero__firefly--3" />
        </div>
        <div className="hero__fireflies hero__fireflies--foreground" aria-hidden="true">
          <span className="hero__firefly hero__firefly--4" />
          <span className="hero__firefly hero__firefly--5" />
          <span className="hero__firefly hero__firefly--6" />
        </div>

        <button
          className="theme-toggle"
          type="button"
          onClick={toggleHeroTheme}
          aria-label={`Ativar modo ${heroTheme === "light" ? "escuro" : "claro"}`}
          aria-pressed={heroTheme === "dark"}
        >
          {heroTheme === "light" ? (
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

        <div className="content hero__content">
          <div className="hero__layer hero__identity-layer">
            <img className="hero__logo" src={heroTheme === "dark" ? "/img/logo-white.svg" : "/img/logo-black.svg"} alt="Covil Logo" />
            <h1 className="hero__tagline">
              Softwares <strong>robustos</strong>, <strong>escaláveis</strong> e focados na necessidade do <strong>seu negócio</strong>.
            </h1>
          </div>
        </div>
      </header>

      <main className="content" data-theme={heroTheme}>
        <div className="main-content-wrapper">
          <section id="sobre" className="about-section" ref={aboutCardRef}>
            <h2 className="section-title">Sobre</h2>
            <div className="about-inner">
              <img src={heroTheme === "dark" ? "/img/logo-white.svg" : "/img/logo-black.svg"} alt="Logo Covil" className="about-logo" />
              <div className="about-text">
                <p>
                  Uma ideia só tem impacto quando se torna realidade, e para isso, ela precisa de um ambiente focado em construção e excelência técnica. Esse lugar é a Covil. Do Norte do Brasil para o mundo, desenvolvemos softwares sob medida de acordo com as suas necessidades.
                </p>
              </div>
            </div>
          </section>

          <section id="projetos" className="services-section">
            <h2 className="section-title">Nossos Serviços</h2>
            <div className="services-grid">
              
              <article className="service-card">
                <div className="service-card-icon">
                  <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18" />
                    <path d="M12 3a15 15 0 0 1 0 18" />
                    <path d="M12 3a15 15 0 0 0 0 18" />
                  </svg>
                </div>
                <h3 className="service-card-title">Sites institucionais</h3>
                <div className="service-card-desc">
                  <p>Sites institucionais e landing pages para posicionar o seu negócio na internet com extrema qualidade.</p>
                </div>
                
              </article>

              <article className="service-card">
                <div className="service-card-icon">
                  <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                    <rect x="7" y="2.5" width="10" height="19" rx="2.2" ry="2.2" />
                    <path d="M10 5h4" />
                    <circle cx="12" cy="18.5" r="0.7" />
                  </svg>
                </div>
                <h3 className="service-card-title">Aplicativos Mobile</h3>
                <div className="service-card-desc">
                  <p>Aplicativos para celular nativos ou híbridos, desenhados para atender às suas necessidades específicas.</p>
                </div>
                
              </article>

              <article className="service-card">
                <div className="service-card-icon">
                  <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                    <rect x="3.5" y="4.5" width="17" height="15" rx="2.2" ry="2.2" />
                    <path d="M3.5 8.5h17" />
                    <circle cx="6.3" cy="6.5" r="0.8" />
                    <circle cx="9.1" cy="6.5" r="0.8" />
                    <path d="M9 12.2 7 14.2l2 2" />
                    <path d="M14 12.2 16 14.2l-2 2" />
                  </svg>
                </div>
                <h3 className="service-card-title">Sistemas Web</h3>
                <div className="service-card-desc">
                  <p>Sistemas completos em nuvem e painéis administrativos acessíveis de qualquer navegador moderno.</p>
                </div>
                
              </article>

            </div>
          </section>
        </div>

        <section className="forest-section">
          <div className="forest-overlay" />

          <div className="forest-strip" aria-hidden="true" />

          <div className="forest-content">
            <h2 className="section-title">Por que a Covil?</h2>

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
            <p>
              Fale com a Covil no WhatsApp e comece agora mesmo a construção do seu software.
            </p>
          </div>

          <div className="contact-grid">
            <a
              href="https://wa.me/5591984085049"
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
                <span className="contact-card-value">(91) 98408-5049</span>
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

      <Footer />
    </div>
  );
}

export default HomePage;
