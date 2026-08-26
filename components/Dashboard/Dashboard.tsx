"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchMovies } from "../../store/movie/moviesThunk";
import { RootState, AppDispatch,} from "../../store/reduxStore";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const{ movies, loading, error,}= useSelector(
    (state: RootState) => state.movies);
  
  useEffect(() => {
  const checkToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/");
      return;
    }

    try {
      const response = await fetch("/api", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        localStorage.removeItem("token");
        router.replace("/login");
        return;
      }
    } catch {
      localStorage.removeItem("token");
      router.replace("/");
    }
  };

  checkToken();

  const interval = setInterval(checkToken, 1000);

  return () => clearInterval(interval);
}, [router]);

 useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const renderHeading = () => (
    <div className={styles.heading}>
      <h1>Recommended Movies</h1>

      <button type="button" onClick={() => router.push("/movies")}> See All →</button>
    </div>
  );

  const renderMovies = () =>
    movies.slice(0, 5).map((movie) => (
      <div className={styles.movieCard} key={movie.id}
        onClick={() => router.push(`/movies/${movie.id}`) }>
        <img src={movie.poster} alt={movie.title} className={styles.poster}/>
        <div className={styles.movieInfo}>
          <h2>{movie.title}</h2>

          <p className={styles.rating}> ⭐ {movie.rating}/10 </p>

          <p className={styles.votes}>{movie.votes} </p>

          <p className={styles.genres}> {movie.genres.join(" / ")} </p>
        </div>
      </div>
    ));

 if (loading) {
  return (
    <main className={styles.dashboard}>
      <h1>Recommended Movies</h1>

      <div className={styles.movieList}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            className={styles.skeletonCard}
            key={index}
          >
            <div className={styles.skeletonPoster}></div>

            <div className={styles.skeletonInfo}>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonText}></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
  if (error) {
    return (
      <p className={styles.message}> {error} </p>
    );
  }

  return (
    <main className={styles.dashboard}>
      {renderHeading()}

      <div className={styles.movieList}>
        {renderMovies()}
      </div>
    </main>
  );
}