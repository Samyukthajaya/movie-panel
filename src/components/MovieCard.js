import React from "react";
import { Link } from "react-router-dom";
import { IMG_BASE } from "../api";

export default function MovieCard({ movie }) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "—";
  return (
    <Link to={`/movie/${movie.id}`} className="card">
      <div className="card-poster">
        {movie.poster_path ? (
          <img src={`${IMG_BASE}${movie.poster_path}`} alt={movie.title} loading="lazy" />
        ) : (
          <div className="no-image">No Image</div>
        )}
        <span className="rating-badge">★ {movie.vote_average?.toFixed(1) ?? "N/A"}</span>
      </div>
      <div className="card-body">
        <h3 title={movie.title}>{movie.title}</h3>
        <p>{year}</p>
      </div>
    </Link>
  );
}
