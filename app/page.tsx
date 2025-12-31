"use client";
import { useState } from "react";

type Movie = {
  title: string;
  description: string;
};

export default function Home() {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 MERGE TITLE + DESCRIPTION INTO ONE MOVIE
  const normalizeMovies = (lines: string[]) => {
  const result: { title: string; description: string }[] = [];

  const isJunkLine = (line: string) => {
    const l = line.toLowerCase();
    return (
      l.startsWith("here are") ||
      l.startsWith("sure") ||
      l.startsWith("would you like") ||
      l.includes("let me know") ||
      l.endsWith("?")
    );
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]?.trim();
    if (!line || isJunkLine(line)) continue;

    // ✅ Detect movie title (has year)
    if (/\(\d{4}\)/.test(line)) {
      const title = line
        .replace(/^\d+\.\s*/, "")
        .replace(/\*\*/g, "")
        .trim();

      let description = "";

      // check next line for description
      const next = lines[i + 1]?.trim();
      if (next && !isJunkLine(next) && !/\(\d{4}\)/.test(next)) {
        description = next
          .replace(/^[-–—]\s*/, "")
          .replace(/\*\*/g, "")
          .trim();
        i++; // skip description line
      }

      result.push({ title, description });
    }
  }

  return result;
};

  const getMovies = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: input }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      const cleaned = normalizeMovies(data.recommended_movies || []);
      setMovies(cleaned);
    } catch {
      setError("Server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <div className="card">
        <h1 className="title">🎬 Movie Recommendation AI</h1>
        <p className="subtitle">
          Discover movies tailored to your taste using AI
        </p>

        {/* INPUT SECTION */}
        {movies.length === 0 && (
          <>
            <textarea
              className="input"
              placeholder="e.g. horror movies with suspense"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button className="btn" onClick={getMovies} disabled={loading}>
              {loading ? "Finding movies..." : "Get Recommendations"}
            </button>

          {loading && (
  <div className="heart-loader-wrapper">
    <div className="heart-loader">
      <span className="heart">❤</span>

      <div className="progress">
        <div className="progress-fill"></div>
      </div>
    </div>

    <p className="loader-text">Finding movies you’ll love...</p>
  </div>
)}


            {error && <p className="error">{error}</p>}
          </>
        )}

        {/* 🎯 MOVIE CARDS */}
        {movies.length > 0 && (
          <>
            <h3 className="section-title">🎬 Recommended Movies</h3>

            <div className="pin-layout">
              {movies.map((movie, index) => (
                <div
                  className={`pin-note color-${index % 6}`}
                  key={index}
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <span className="pin-head"></span>

                  <div className="pin-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <h4 className="movie-title">{movie.title}</h4>
                  {movie.description && (
                    <p className="movie-desc">{movie.description}</p>
                  )}
                </div>
              ))}
            </div>

            <button
              className="search-again-btn"
              onClick={() => {
                setMovies([]);
                setInput("");
                setError("");
              }}
            >
              🔄 Search Again
            </button>
          </>
        )}
      </div>
    </main>
  );
}
