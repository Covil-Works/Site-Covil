import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MOBILE_STACK_START = -50;
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
    const serviceCards = Array.from(document.querySelectorAll(".services-grid article, .contact-card, .why-card"));

    if (serviceCards.length === 0) {
      return undefined;
    }

    const setCardPointerToCenter = (card) => {
      card.style.setProperty("--card-pointer-x", `${(card.clientWidth / 2).toFixed(1)}px`);
      card.style.setProperty("--card-pointer-y", `${(card.clientHeight / 2).toFixed(1)}px`);
      card.style.setProperty("--tilt-x", "0");
      card.style.setProperty("--tilt-y", "0");
    };

    const updateCardPointer = (event) => {
      const card = event.currentTarget;
      const bounds = card.getBoundingClientRect();
      const pointerX = event.clientX - bounds.left;
      const pointerY = event.clientY - bounds.top;

      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;

      const tiltX = (((pointerX - centerX) / centerX) * 3.5).toFixed(2);
      const tiltY = (((centerY - pointerY) / centerY) * 3.5).toFixed(2);

      card.style.setProperty("--card-pointer-x", `${pointerX.toFixed(1)}px`);
      card.style.setProperty("--card-pointer-y", `${pointerY.toFixed(1)}px`);
      card.style.setProperty("--tilt-x", tiltX);
      card.style.setProperty("--tilt-y", tiltY);
    };

    const resetCardPointer = (event) => {
      const card = event.currentTarget;
      card.style.setProperty("--tilt-x", "0");
      card.style.setProperty("--tilt-y", "0");
    };

    serviceCards.forEach((card) => {
      setCardPointerToCenter(card);
      card.addEventListener("pointerenter", updateCardPointer);
      card.addEventListener("pointermove", updateCardPointer);
      card.addEventListener("pointerleave", resetCardPointer);
    });

    const updateAllCardCenters = () => {
      serviceCards.forEach(setCardPointerToCenter);
    };

    window.addEventListener("resize", updateAllCardCenters);

    return () => {
      serviceCards.forEach((card) => {
        card.removeEventListener("pointerenter", updateCardPointer);
        card.removeEventListener("pointermove", updateCardPointer);
        card.removeEventListener("pointerleave", resetCardPointer);
      });

      window.removeEventListener("resize", updateAllCardCenters);
    };
  }, []);

  useEffect(() => {
    const revealElements = Array.from(
      document.querySelectorAll(".reveal-on-scroll, .reveal-slide-right, .text-reveal-item")
    );

    if (revealElements.length === 0) return undefined;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotionQuery.matches) {
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
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 760px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (heroTheme !== "dark" || mobileQuery.matches || reducedMotionQuery.matches) {
      return undefined;
    }

    let animationFrameId = null;
    let currentX = 0;
    let currentY = 0;
    let isInitialized = false;

    const updateMotion = () => {
      const fireflyEl = document.querySelector(".traveling-firefly");
      const heroEl = heroRef.current;
      if (!fireflyEl || !heroEl) {
        animationFrameId = window.requestAnimationFrame(updateMotion);
        return;
      }

      const aboutSection = document.getElementById("sobre");
      const aboutLogo = document.querySelector(".about-logo");
      const servicesSection = document.getElementById("projetos");
      const serviceCards = Array.from(document.querySelectorAll(".services-grid article"));
      const whySection = document.querySelector(".why-section");
      const whyCard = document.querySelector(".why-card");
      const contactSection = document.getElementById("contato");
      const liveDot = document.querySelector(".contact-card-live-dot");

      if (!aboutSection || !servicesSection || !contactSection) {
        animationFrameId = window.requestAnimationFrame(updateMotion);
        return;
      }

      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const getDocPos = (el, fallbackXPercent, fallbackY) => {
        if (!el) return { x: viewportWidth * fallbackXPercent, y: fallbackY };
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left + scrollX + rect.width / 2,
          y: rect.top + scrollY + rect.height / 2,
          rect,
        };
      };

      const heroRect = heroEl.getBoundingClientRect();
      const heroDocY = heroRect.top + scrollY;

      // Keypoint 0: Hero Right
      const k0 = {
        x: viewportWidth * 0.91,
        y: heroDocY + heroRect.height * 0.78,
        triggerY: 0,
      };

      // Keypoint 1: Sobre Logo (Left)
      const logoPos = getDocPos(aboutLogo, 0.25, heroDocY + heroRect.height + 200);
      const aboutRect = aboutSection.getBoundingClientRect();
      const k1 = {
        x: logoPos.x,
        y: logoPos.y,
        triggerY: (aboutRect.top + scrollY) - viewportHeight * 0.35,
      };

      // Keypoints 2, 3, 4: Services (Left -> Center -> Right)
      const servicesRect = servicesSection.getBoundingClientRect();
      const servicesDocY = servicesRect.top + scrollY;
      const servicesHeight = servicesRect.height;

      const s1Pos = getDocPos(serviceCards[0], 0.2, servicesDocY + 150);
      const s2Pos = getDocPos(serviceCards[1], 0.5, servicesDocY + 150);
      const s3Pos = getDocPos(serviceCards[2], 0.8, servicesDocY + 150);

      const k2 = {
        x: s1Pos.x,
        y: s1Pos.y,
        triggerY: servicesDocY - viewportHeight * 0.3,
      };
      const k3 = {
        x: s2Pos.x,
        y: s2Pos.y,
        triggerY: servicesDocY + servicesHeight * 0.35 - viewportHeight * 0.3,
      };
      const k4 = {
        x: s3Pos.x,
        y: s3Pos.y,
        triggerY: servicesDocY + servicesHeight * 0.7 - viewportHeight * 0.3,
      };

      // Keypoint 5: Por que a Covil (Right)
      const whyRect = whyCard ? whyCard.getBoundingClientRect() : (whySection ? whySection.getBoundingClientRect() : null);
      const whyDocY = whyRect ? (whyRect.top + scrollY) : servicesDocY + servicesHeight + 300;
      const whyRightX = whyRect ? (whyRect.right + scrollX - 30) : viewportWidth * 0.85;
      const whyMidY = whyRect ? (whyRect.top + scrollY + whyRect.height / 2) : whyDocY + 200;

      const k5 = {
        x: whyRightX,
        y: whyMidY,
        triggerY: whyDocY - viewportHeight * 0.3,
      };

      // Keypoint 6: WhatsApp Live Dot (Left)
      const dotPos = getDocPos(liveDot, 0.2, whyDocY + 600);
      const contactRect = contactSection.getBoundingClientRect();
      const contactDocY = contactRect.top + scrollY;
      const k6 = {
        x: dotPos.x,
        y: dotPos.y,
        triggerY: contactDocY - viewportHeight * 0.45,
      };

      const keypoints = [k0, k1, k2, k3, k4, k5, k6];

      for (let i = 1; i < keypoints.length; i++) {
        if (keypoints[i].triggerY <= keypoints[i - 1].triggerY) {
          keypoints[i].triggerY = keypoints[i - 1].triggerY + 10;
        }
      }

      const scrollRef = scrollY;
      let targetDocX = k0.x;
      let targetDocY = k0.y;

      if (scrollRef <= keypoints[0].triggerY) {
        targetDocX = k0.x;
        targetDocY = k0.y;
      } else if (scrollRef >= keypoints[keypoints.length - 1].triggerY) {
        targetDocX = k6.x;
        targetDocY = k6.y;
      } else {
        for (let i = 0; i < keypoints.length - 1; i++) {
          const pA = keypoints[i];
          const pB = keypoints[i + 1];
          if (scrollRef >= pA.triggerY && scrollRef <= pB.triggerY) {
            const rawT = (scrollRef - pA.triggerY) / (pB.triggerY - pA.triggerY);
            const easeT = rawT * rawT * (3 - 2 * rawT);
            targetDocX = pA.x + (pB.x - pA.x) * easeT;
            targetDocY = pA.y + (pB.y - pA.y) * easeT;
            break;
          }
        }
      }

      const targetVpX = targetDocX - scrollX;
      const targetVpY = targetDocY - scrollY;

      const time = performance.now() * 0.0015;
      const flutterX = Math.sin(time * 2.1) * 3;
      const flutterY = Math.cos(time * 1.7) * 3;

      const finalTargetX = targetVpX + flutterX;
      const finalTargetY = targetVpY + flutterY;

      if (!isInitialized) {
        currentX = finalTargetX;
        currentY = finalTargetY;
        isInitialized = true;
      } else {
        currentX += (finalTargetX - currentX) * 0.08;
        currentY += (finalTargetY - currentY) * 0.08;
      }

      fireflyEl.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

      animationFrameId = window.requestAnimationFrame(updateMotion);
    };

    animationFrameId = window.requestAnimationFrame(updateMotion);

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [heroTheme]);

  return (
    <div className="page" ref={pageRef} data-theme={heroTheme}>
      <span className="traveling-firefly" aria-hidden="true" />
      <Navbar theme={heroTheme} toggleTheme={toggleHeroTheme} />

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

        <div className="content hero__content">
          <div className="hero__layer hero__identity-layer">
            <img className="hero__logo" src={heroTheme === "dark" ? "/img/logo-white.svg" : "/img/logo-black.svg"} alt="Covil Logo" />
          </div>
          <div className="hero__layer hero__text-layer">
            <h1 className="hero__tagline">
              Softwares <strong>robustos</strong>, <strong>escaláveis</strong> e focados na necessidade do <strong>seu negócio</strong>.
            </h1>
          </div>
        </div>
      </header>

      <main className="content" data-theme={heroTheme}>
        <div className="main-content-wrapper">
          <section id="sobre" className="about-section reveal-on-scroll" ref={aboutCardRef}>
            <h2 className="section-title">Sobre</h2>
            <div className="about-inner">
              <img src={heroTheme === "dark" ? "/img/logo-white.svg" : "/img/logo-black.svg"} alt="Logo Covil" className="about-logo reveal-slide-right" />
              <div className="about-text text-reveal-item" style={{ "--reveal-delay": "120ms" }}>
                <p>
                  Uma ideia só tem impacto quando se torna realidade, e para isso, ela precisa de um ambiente focado em construção e excelência técnica. Esse lugar é a Covil. Do Norte do Brasil para o mundo, desenvolvemos softwares sob medida de acordo com as suas necessidades.
                </p>
              </div>
            </div>
          </section>

          <section id="projetos" className="services-section reveal-on-scroll">
            <h2 className="section-title">Nossos Serviços</h2>
            <div className="services-grid">
              
              <article className="service-card reveal-on-scroll" style={{ "--reveal-delay": "0ms" }}>
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

              <article className="service-card reveal-on-scroll" style={{ "--reveal-delay": "120ms" }}>
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

              <article className="service-card reveal-on-scroll" style={{ "--reveal-delay": "240ms" }}>
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

          <section className="why-section reveal-on-scroll">
            <h2 className="section-title">Por que a Covil?</h2>

            <article className="why-card">
              <div className="why-card-left reveal-slide-right" style={{ "--reveal-delay": "100ms" }}>
                <h3>
                  Parceria,
                  <br />
                  Dedicação e
                  <br />
                  Qualidade
                </h3>
              </div>

              <div className="why-card-right">
                <p className="text-reveal-item" style={{ "--reveal-delay": "150ms" }}>
                  A Covil é o refúgio onde nossos desenvolvedores se reúnem para criar
                  código limpo e arquiteturas sólidas.
                </p>
                <p className="text-reveal-item" style={{ "--reveal-delay": "250ms" }}>
                  Nossa equipe é formada por pessoas apaixonadas por tecnologia e
                  resolução de problemas.
                </p>
                <p className="text-reveal-item" style={{ "--reveal-delay": "350ms" }}>
                  Tratamos cada projeto como se fosse nosso, garantindo segurança,
                  escalabilidade e manutenibilidade a longo prazo.
                </p>
              </div>
            </article>
          </section>
        </div>

        <section id="contato" className="contact-section reveal-on-scroll" aria-labelledby="contact-heading">
          <div className="contact-header reveal-on-scroll">
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
              className="contact-card contact-card--cta reveal-on-scroll"
              style={{ "--reveal-delay": "120ms" }}
              aria-label="Chamar a Covil no WhatsApp"
            >
              <span className="contact-card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img">
                  <path d="M12.1 3.1a8.7 8.7 0 0 0-7.5 13.2L3 21l4.9-1.5a8.9 8.9 0 0 0 4.2 1.1h.1a8.8 8.8 0 0 0-.1-17.5Z" />
                  <path d="M9 8.7c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .5.4.2.5.8 1.8.8 1.9.1.2.1.3 0 .5s-.2.3-.4.4-.3.3-.4.4c-.1.1-.2.3 0 .5.2.4 1 1.6 2.4 2.1.3.1.5.1.6 0 .2-.2.5-.6.6-.8.2-.2.3-.2.5-.1.2.1 1.3.6 1.5.7.2.1.4.2.4.3s0 .8-.3 1.2c-.2.4-1 .8-1.3.8-.4.1-.8.2-1.3 0a7 7 0 0 1-2.1-.7 8.1 8.1 0 0 1-2.8-2.5c-.8-1.1-1.2-2.1-1.4-2.8-.2-.7.1-1.1.3-1.4.2-.3.4-.5.6-.7Z" />
                </svg>
              </span>
              <span className="contact-card-content">
                <span className="contact-card-label">
                  WhatsApp
                  <span className="contact-card-live-dot" aria-hidden="true" />
                </span>
                <span className="contact-card-value">(91) 98408-5049</span>
              </span>
              <span className="contact-card-action">Chamar agora</span>
            </a>

            <div className="contact-alt reveal-on-scroll" style={{ "--reveal-delay": "220ms" }} aria-label="Outras redes de contato">
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
