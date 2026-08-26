"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchMovies } from "../../store/movie/moviesThunk";
import { RootState, AppDispatch } from "../../store/reduxStore";
import styles from "../Dashboard/Dashboard.module.scss";

export default function Movies() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  const currentPage = Number(searchParams.get("page")) || 1;
  // 1 page = 1 movie
  const moviesPerPage = 1;
  const startIndex = (currentPage - 1) * moviesPerPage;
  const currentMovies = movies.slice(
    startIndex,
    startIndex + moviesPerPage
  );
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    router.push(`/movies?page=${page}`);
  };

  const handlePrevious = () => {
    if (currentPage > 1) { handlePageChange(currentPage - 1);}
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };
  if (loading) {
    return (
      <main className={styles.dashboard}>
        <h1>All Movies</h1>

        <div className={styles.movieList}>
          <div className={styles.movieCard}>
            <div className={styles.skeletonPoster}></div>

            <div className={styles.movieInfo}>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonText}></div>
            </div>
          </div>
        </div>
      </main>
    );
  }
  if (error) {
    return <p className={styles.message}>{error}</p>;
  }

  return (
    <main className={styles.dashboard}>
      <h1>All Movies</h1>

      <div className={styles.movieList}>
        {currentMovies.map((movie) => (
          <div className={styles.movieCard} key={movie.id}
            onClick={() => router.push(`/movies/${movie.id}`)}
          >
            <img src={movie.poster} alt={movie.title} className={styles.poster} />
            <div className={styles.movieInfo}>
              <h2>{movie.title}</h2>

              <p className={styles.rating}> ⭐ {movie.rating}/10 </p>

              <p className={styles.votes}>{movie.votes}</p>

              <p className={styles.genres}> {movie.genres.join(" / ")} </p>
            </div>
          </div>
        ))}
      </div>

     <div className={styles.pagination}>
  {/* Previous */}
  <button
    type="button"
    onClick={handlePrevious}
    disabled={currentPage === 1}
    className={styles.arrowButton}
  >
    &lt;
  </button>

  {/* First Page */}
  <button
    type="button"
    className={currentPage === 1 ? styles.activePage : ""}
    onClick={() => handlePageChange(1)}
  >
    1
  </button>

  {/* Middle Pages */}
  {currentPage > 2 && (
    <button
      type="button"
      onClick={() => handlePageChange(currentPage - 1)}
    >
      {currentPage - 1}
    </button>
  )}

  {currentPage !== 1 && currentPage !== totalPages && (
    <button
      type="button"
      className={styles.activePage}
      onClick={() => handlePageChange(currentPage)}
    >
      {currentPage}
    </button>
  )}

  {currentPage < totalPages - 1 && (
    <button
      type="button"
      onClick={() => handlePageChange(currentPage + 1)}
    >
      {currentPage + 1}
    </button>
  )}

  {/* Dots */}
  {currentPage < totalPages - 2 && (
    <span className={styles.dots}>...</span>
  )}

  {/* Last Page */}
  {totalPages > 1 && (
    <button
      type="button"
      className={currentPage === totalPages ? styles.activePage : ""}
      onClick={() => handlePageChange(totalPages)}
    >
      {totalPages}
    </button>
  )}

  {/* Next */}
  <button
    type="button"
    onClick={handleNext}
    disabled={currentPage === totalPages}
    className={styles.arrowButton}
  >
    &gt;
  </button>
</div>
    </main>
  );
}