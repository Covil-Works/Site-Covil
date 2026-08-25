import { useEffect } from "react";
import "../styles/not-found.css";

function NotFoundPage({ theme = "dark" }) {
  useEffect(() => {
    document.title = "404 - Página Não Encontrada | Covil";
  }, []);

  return (
    <main className="not-found-page" data-theme={theme}>
      <section className="not-found-content" aria-labelledby="not-found-title">
        <div className="not-found-hero">
          <h1 id="not-found-title" className="not-found-number">
            404
          </h1>
          <div className="not-found-fireflies" aria-hidden="true">
            <span className="not-found-firefly not-found-firefly--1" />
            <span className="not-found-firefly not-found-firefly--2" />
            <span className="not-found-firefly not-found-firefly--3" />
          </div>
        </div>
        <p className="not-found-message">
          Não há nada para ver por aqui...
        </p>
        <a href="/" className="not-found-button">
          Voltar para home
        </a>
      </section>
    </main>
  );
}

export default NotFoundPage;