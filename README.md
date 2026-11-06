# Movie Panel (React + TMDB)

Pages: Popular (home), Top Rated, Upcoming, Movie Detail (with cast), Search results (same UI as home), plus a global search in the navbar and pagination on all list pages.

## Setup
1. Get a free API key at https://www.themoviedb.org/settings/api
2. Put it in `.env`: `REACT_APP_TMDB_API_KEY=your_key`
   (On CodeSandbox: Project settings → Environment variables, or edit `.env`.)
3. `npm install && npm start`

## Structure
- `src/api.js` – all TMDB calls
- `src/pages/MovieListPage.js` – one reusable page for Popular / Top Rated / Upcoming / Search
- `src/pages/MovieDetailPage.js` – movie details + cast
- `src/components/` – Navbar, MovieCard, MovieGrid, Pagination, CastList, Loader
