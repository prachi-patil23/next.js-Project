"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchMovies } from "../../store/movie/moviesThunk";
import { RootState, AppDispatch } from "../../store/reduxStore";
import styles from "./dashboard.module.scss";

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const movies = useSelector(
    (state: RootState) => state.movies.movies
  );

  const loading = useSelector(
    (state: RootState) => state.movies.loading
  );

  const error = useSelector(
    (state: RootState) => state.movies.error
  );

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading) {
    return <p className={styles.message}>Loading movies...</p>;
  }

  if (error) {
    return <p className={styles.message}>{error}</p>;
  }

  return (
    <main className={styles.dashboard}>
      <div className={styles.heading}>
        <h1>Recommended Movies</h1>

        <button type="button"onClick={() => router.push("/movies")} >See All →</button>
      </div>

      <div className={styles.movieList}>
        {movies.slice(0, 5).map((movie) => (
          <div className={styles.movieCard} key={movie.id}
             onClick={() => router.push(`/movies/${movie.id}`)}>
            <img
              src={movie.poster}
              alt={movie.title}
              className={styles.poster}
            />

            <div className={styles.movieInfo}>
              <h2>{movie.title}</h2>

              <p className={styles.rating}>
                ⭐ {movie.rating}/10
              </p>

              <p className={styles.votes}>
                {movie.votes}
              </p>

              <p className={styles.genres}>
                {movie.genres.join(" / ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}