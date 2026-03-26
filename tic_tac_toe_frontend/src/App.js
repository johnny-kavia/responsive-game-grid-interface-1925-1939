import React from "react";
import TicTacToe from "./components/TicTacToe";

// PUBLIC_INTERFACE
function App() {
  /** Top-level application shell. */
  return (
    <div className="app">
      <header className="appHeader">
        <div className="brand">
          <div className="brandMark" aria-hidden="true" />
          <div className="brandText">
            <h1 className="title">Tic Tac Toe</h1>
            <p className="subtitle">Two-player • Responsive • Minimal</p>
          </div>
        </div>
      </header>

      <main className="appMain">
        <section className="gameCard" aria-label="Tic Tac Toe game">
          <TicTacToe />
        </section>
      </main>

      <footer className="appFooter">
        <span className="footerText">Light theme UI • Primary #3B82F6</span>
      </footer>
    </div>
  );
}

export default App;
