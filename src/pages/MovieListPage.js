import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

// Reusable for Popular, Top Rated, Upcoming and Search pages.
export default function MovieListPage({ title, fetcher, emptyText = "No movies found." }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, parseInt(searchParams.get("page"), 10) || 1);

  const [data, setData] = useState({ results: [], total_pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    fetcher(page)
      .then((res) => !cancelled && setData(res))
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => {
      cancelled = true;
    };
  
  }, [page, title]);

  const goTo = (p) => setSearchParams({ page: p });

  return (
    <section>
      <h1 className="page-title">{title}</h1>
      {loading && <Loader />}
      {error && <p className="state-msg error">{error}</p>}
      {!loading && !error && data.results.length === 0 && (
        <p className="state-msg">{emptyText}</p>
      )}
      {!loading && !error && data.results.length > 0 && (
        <>
          <MovieGrid movies={data.results} />
          <Pagination page={page} totalPages={data.total_pages} onChange={goTo} />
        </>
      )}
    </section>
  );
}
