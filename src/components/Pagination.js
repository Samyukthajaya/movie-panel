import React from "react";

// TMDB only serves the first 500 pages
const MAX_PAGES = 500;

function pageWindow(page, total) {
  const pages = new Set([1, total, page - 1, page, page + 1]);
  const list = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out = [];
  list.forEach((p, i) => {
    if (i > 0 && p - list[i - 1] > 1) out.push("…" + p);
    out.push(p);
  });
  return out;
}

export default function Pagination({ page, totalPages, onChange }) {
  const total = Math.min(totalPages || 1, MAX_PAGES);
  if (total <= 1) return null;

  return (
    <nav className="pagination" aria-label="Pagination">
      <button disabled={page <= 1} onClick={() => onChange(page - 1)}>
        ‹ Prev
      </button>
      {pageWindow(page, total).map((p) =>
        typeof p === "string" ? (
          <span key={p} className="dots">
            …
          </span>
        ) : (
          <button
            key={p}
            className={p === page ? "active" : ""}
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </button>
        )
      )}
      <button disabled={page >= total} onClick={() => onChange(page + 1)}>
        Next ›
      </button>
    </nav>
  );
}
