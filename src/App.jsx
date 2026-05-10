import { useState } from "react";
import "./App.css";
import quotes from "./quotes";

const GENRES = [
  { label: "Romantic", tag: "love", gradient: "135deg, #1a0533, #6b21a8, #db2777" },
  { label: "Comedy", tag: "humor", gradient: "135deg, #052e16, #166534, #ca8a04" },
  { label: "Life", tag: "inspirational", gradient: "135deg, #0f0c29, #302b63, #24243e" },
];

function getRandomQuote(tag) {
  const list = quotes[tag];
  return list[Math.floor(Math.random() * list.length)];
}

function App() {
  const [genre, setGenre] = useState(GENRES[2]);
  const [quote, setQuote] = useState(getRandomQuote("inspirational"));
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(true);

  function changeQuote(tag) {
    setVisible(false);
    setTimeout(() => {
      setQuote(getRandomQuote(tag));
      setVisible(true);
      setCopied(false);
    }, 300);
  }

  function handleGenre(g) {
    setGenre(g);
    changeQuote(g.tag);
  }

  function handleCopy() {
    navigator.clipboard.writeText(`"${quote.content}" — ${quote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="container"
      style={{ background: `linear-gradient(${genre.gradient})` }}
    >
      <h1>Daily Quote</h1>
      <p className="subtitle">words that move you</p>

      <div className="genre-buttons">
        {GENRES.map((g) => (
          <button
            key={g.tag}
            className={genre.tag === g.tag ? "active" : ""}
            onClick={() => handleGenre(g)}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className={`quote-card ${visible ? "fade-in" : "fade-out"}`}>
        <div className="quote-mark">"</div>
        <p className="quote-text">{quote.content}</p>
        <p className="quote-author">— <span>{quote.author}</span></p>
        <button
          className={`copy-btn ${copied ? "copied" : ""}`}
          onClick={handleCopy}
        >
          {copied ? "✓ Copied!" : "Copy"}
        </button>
      </div>

      <button className="new-btn" onClick={() => changeQuote(genre.tag)}>
        ✦ New Quote
      </button>
    </div>
  );
}

export default App;