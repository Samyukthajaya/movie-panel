const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE = "https://api.themoviedb.org/3";

export const IMG_BASE = "https://image.tmdb.org/t/p/w500";

async function request(path, params = {}) {
  const query = new URLSearchParams({
    api_key: API_KEY,
    language: "en-US",
    ...params,
  });
  const res = await fetch(`${BASE}${path}?${query}`);
  if (!res.ok) {
    throw new Error(
      res.status === 401
        ? "Invalid TMDB API key. Add yours to the .env file."
        : `Request failed (${res.status})`
    );
  }
  return res.json();
}

export const getPopular = (page = 1) => request("/movie/popular", { page });
export const getTopRated = (page = 1) => request("/movie/top_rated", { page });
export const getUpcoming = (page = 1) => request("/movie/upcoming", { page });
export const searchMovies = (query, page = 1) =>
  request("/search/movie", { query, page });
export const getMovie = (id) => request(`/movie/${id}`);
export const getCredits = (id) => request(`/movie/${id}/credits`);
