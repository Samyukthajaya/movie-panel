import React from "react";
import { IMG_BASE } from "../api";

export default function CastList({ cast }) {
  if (!cast.length) return null;
  return (
    <section className="cast">
      <h2>Cast</h2>
      <div className="cast-row">
        {cast.map((c) => (
          <div className="cast-card" key={c.cast_id ?? c.credit_id}>
            {c.profile_path ? (
              <img src={`${IMG_BASE}${c.profile_path}`} alt={c.name} loading="lazy" />
            ) : (
              <div className="no-image">No Image</div>
            )}
            <strong>{c.name}</strong>
            <span>{c.character}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
