"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch,} from "../../store/reduxStore";
import { fetchMovieById } from "../../store/movieDetails/movieDetailThunk";
import { fetchTheatres } from "../../store/theatre/theatreThunk";
import styles from "./movie.module.scss";

export default function MovieDetails() {
  const pathname = usePathname();

  const dispatch = useDispatch<AppDispatch>();

  const [selectedDate, setSelectedDate] = useState("2026-08-14");

  const movie = useSelector(
    (state: RootState) => state.movieDetails.movie
  );

  const movieLoading = useSelector(
    (state: RootState) => state.movieDetails.loading
  );

  const movieError = useSelector(
    (state: RootState) => state.movieDetails.error
  );

  const theatres = useSelector(
    (state: RootState) => state.theatres.theatres
  );

  const theatreLoading = useSelector(
    (state: RootState) => state.theatres.loading
  );

  const theatreError = useSelector(
    (state: RootState) => state.theatres.error
  );

  const movieId = pathname.split("/").pop() || "";

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieById(movieId));
    }

    dispatch(fetchTheatres());
  }, [movieId, dispatch]);

  if (movieLoading) {
    return (
      <p className={styles.message}> Loading movie... </p>
    );
  }

  if (movieError) {
    return (
      <p className={styles.message}>
        {movieError}
      </p>
    );
  }

  if (!movie) {
    return (
      <p className={styles.message}> Movie not found </p>
    );
  }

  const dates = ["2026-08-14","2026-08-15","2026-08-16","2026-08-17","2026-08-18", "2026-08-19","2026-08-20",];

  const formatDate = (date: string) => {
    const currentDate = new Date(date);

    return {
      day: currentDate.toLocaleDateString(
        "en-US",
        {
          weekday: "short",
        }
      ),
      date: currentDate.toLocaleDateString(
        "en-US",
        {
          day: "2-digit",
        }
      ),
      month: currentDate.toLocaleDateString(
        "en-US",
        {
          month: "short",
        }
      ),
    };
  };

  return (
    <main className={styles.moviePage}>
      {/* Movie information */}
      <section className={styles.movieHeader}>
        <img src={movie.poster} alt={movie.title} className={styles.poster}/>

        <div className={styles.movieInfo}>
          <h1>{movie.title}</h1>
          <p>⭐ {movie.rating}/10</p>
          <p>{movie.votes}</p>
          <p>{movie.genres.join(" / ")}</p>
        </div>
      </section>
      {/* Dates */}
      <section className={styles.dateSection}>
        <h2>Select Date</h2>

        <div className={styles.dateList}>
          {dates.map((date) => {
            const formatted = formatDate(date);

          return (
            <button type="button" key={date} className={
                  selectedDate === date ? styles.selectedDate : styles.dateButton
                }
                onClick={() => setSelectedDate(date)}>
                <span> {formatted.day} </span>
                <strong> {formatted.date}</strong>
                <span> {formatted.month} </span>
              </button>
            );
          })}
        </div>
      </section>
      {/* Theatres */}
      <section className={styles.theatreSection}>
        <h2> Theatres in Ahmedabad</h2>
        {theatreLoading && ( <p>Loading theatres...</p>)}
        {theatreError && (<p>{theatreError}</p>)}

        {!theatreLoading &&
          theatres.map((theatre) => {
            const selectedShow =
              theatre.shows.find((show) => show.date === selectedDate);

            return (
              <div className={styles.theatreCard} key={theatre.id}>
                <div className={ styles.theatreInfo}>
                  <h3> {theatre.name}</h3>
                  <p>{theatre.location}</p>

                  <span>{theatre.cancellation}</span>
                </div>
                <div className={ styles.showTimes}>
                  {selectedShow?.times.map((time) => (
                      <button type="button" key={time} className={styles.timeButton}>
                        {time}
                      </button>
                    )
                  )}
                </div>
              </div>
            );
          })}
      </section>
    </main>
  );
}