import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovie, getCredits, IMG_BASE } from "../api";
import CastList from "../components/CastList";
import Loader from "../components/Loader";

const money = (n) => (n ? `$${n.toLocaleString()}` : "—");

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    Promise.all([getMovie(id), getCredits(id)])
      .then(([m, c]) => {
        if (cancelled) return;
        setMovie(m);
        setCast((c.cast || []).slice(0, 20));
      })
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    window.scrollTo({ top: 0 });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p className="state-msg error">{error}</p>;
  if (!movie) return null;

  const hours = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "—";

  return (
    <article className="detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail-hero">
        <div className="detail-poster">
          {movie.poster_path ? (
            <img src={`${IMG_BASE}${movie.poster_path}`} alt={movie.title} />
          ) : (
            <div className="no-image">No Image</div>
          )}
        </div>

        <div className="detail-info">
          <h1>
            {movie.title}
            {movie.release_date && <span> ({movie.release_date.slice(0, 4)})</span>}
          </h1>
          {movie.tagline && <p className="tagline">“{movie.tagline}”</p>}

          <div className="chips">
            {movie.genres?.map((g) => (
              <span className="chip" key={g.id}>
                {g.name}
              </span>
            ))}
          </div>

          <h3>Overview</h3>
          <p className="overview">{movie.overview || "No overview available."}</p>

          <dl className="facts">
            <div>
              <dt>Rating</dt>
              <dd>
                ★ {movie.vote_average?.toFixed(1)} ({movie.vote_count?.toLocaleString()} votes)
              </dd>
            </div>
            <div>
              <dt>Release</dt>
              <dd>{movie.release_date || "—"}</dd>
            </div>
            <div>
              <dt>Runtime</dt>
              <dd>{hours}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{movie.status}</dd>
            </div>
            <div>
              <dt>Language</dt>
              <dd>{movie.original_language?.toUpperCase()}</dd>
            </div>
            <div>
              <dt>Budget</dt>
              <dd>{money(movie.budget)}</dd>
            </div>
            <div>
              <dt>Revenue</dt>
              <dd>{money(movie.revenue)}</dd>
            </div>
          </dl>
        </div>
      </div>

      <CastList cast={cast} />
    </article>
  );
}
