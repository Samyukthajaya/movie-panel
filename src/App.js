import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import MovieListPage from "./pages/MovieListPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import { getPopular, getTopRated, getUpcoming, searchMovies } from "./api";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={<MovieListPage title="Popular Movies" fetcher={getPopular} />}
          />
          <Route
            path="/top-rated"
            element={<MovieListPage title="Top Rated Movies" fetcher={getTopRated} />}
          />
          <Route
            path="/upcoming"
            element={<MovieListPage title="Upcoming Movies" fetcher={getUpcoming} />}
          />
          <Route path="/search/:query" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="*" element={<p className="state-msg">Page not found.</p>} />
        </Routes>
      </main>
    </>
  );
}

// Searched Movie Page: same UI as the Home Page, different data source
function SearchPage() {
  const { query } = useParams();
  return (
    <MovieListPage
      key={query}
      title={`Results for “${query}”`}
      fetcher={(page) => searchMovies(query, page)}
      emptyText={`No movies found for “${query}”.`}
    />
  );
}
