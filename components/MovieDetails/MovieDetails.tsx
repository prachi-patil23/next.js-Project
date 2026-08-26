"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch, } from "../../store/reduxStore";
import { fetchMovieById } from "../../store/movieDetails/movieDetailThunk";
import { fetchTheatres } from "../../store/theatre/theatreThunk";
import styles from "./Movie.module.scss";

export default function MovieDetails() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();

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

  /* URL se selected date read kar rahe hain.
    Agar URL me date nahi hai to default date use hogi. */
  const selectedDate = searchParams.get("date") || "2026-08-14";

  /* URL me "show" hai to seat popup open hoga. */
  const selectedShow = searchParams.get("show");

  /* URL se selected seat count read kar rahe hain. Default 2 seats. */
  const selectedSeatCount = Number(searchParams.get("seats")) || 2;

  const movieId = pathname.split("/").pop() || "";

  useEffect(() => {
    if (movieId) { dispatch(fetchMovieById(movieId)); }
    dispatch(fetchTheatres());
  }, [movieId, dispatch]);

  const dates = [ "2026-08-14", "2026-08-15", "2026-08-16", "2026-08-17", 
                 "2026-08-18", "2026-08-19","2026-08-20", ];

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

  /*
    Movie information
  */
  const renderMovieInfo = () => (
    <section className={styles.movieHeader}>
      <img
        src={movie?.poster}
        alt={movie?.title}
        className={styles.poster}
      />

      <div className={styles.movieInfo}>
        <h1>{movie?.title}</h1>

        <p>⭐ {movie?.rating}/10</p>

        <p>{movie?.votes}</p>

        <p>
          {movie?.genres.join(" / ")}
        </p>
      </div>
    </section>
  );

  /*
    Date section
  */
  const renderDates = () => (
    <section className={styles.dateSection}>
      <h2>Select Date</h2>

      <div className={styles.dateList}>
        {dates.map((date) => {
          const formatted = formatDate(date);

          return (
            <button
              type="button"
              key={date}
              className={
                selectedDate === date
                  ? styles.selectedDate
                  : styles.dateButton
              }
              onClick={() =>
                router.push(
                  `${pathname}?date=${date}`
                )
              }
            >
              <span>
                {formatted.day}
              </span>

              <strong>
                {formatted.date}
              </strong>

              <span>
                {formatted.month}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );

  /*
    Theatre section
  */
  const renderTheatres = () => (
    <section className={styles.theatreSection}>
      <h2>Theatres in Ahmedabad</h2>

      {theatreLoading && (
        <p>Loading theatres...</p>
      )}

      {theatreError && (
        <p>{theatreError}</p>
      )}

      {!theatreLoading &&
        theatres.map((theatre) => {
          const selectedTheatreShow =
            theatre.shows.find(
              (show) =>
                show.date === selectedDate
            );

          return (
            <div
              className={styles.theatreCard}
              key={theatre.id}
            >
              <div
                className={styles.theatreInfo}
              >
                <h3>
                  {theatre.name}
                </h3>

                <p>
                  {theatre.location}
                </p>

                <span>
                  {theatre.cancellation}
                </span>
              </div>

              <div
                className={styles.showTimes}
              >
                {selectedTheatreShow?.times.map(
                  (time) => (
                    <button
                      type="button"
                      key={time}
                      className={
                        styles.timeButton
                      }
                      onClick={() =>
                        router.push(
                          `${pathname}?date=${selectedDate}&show=${encodeURIComponent(
                            time
                          )}&seats=2`
                        )
                      }
                    >
                      {time}
                    </button>
                  )
                )}
              </div>
            </div>
          );
        })}
    </section>
  );

  /*
    Seat count popup
  */
  const renderSeatPopup = () => {
    if (!selectedShow) {
      return null;
    }

    return (
      <div className={styles.popupOverlay}>
        <div className={styles.seatPopup}>

          <h2>How many seats?</h2>

          <div className={styles.scooter}>
            🛵
          </div>

          <div className={styles.seatNumbers}>
            {Array.from(
              { length: 10 },
              (_, index) => index + 1
            ).map((number) => (
              <button
                type="button"
                key={number}
                className={
                  selectedSeatCount === number
                    ? styles.selectedSeatCount
                    : styles.seatCountButton
                }
                onClick={() =>
                  router.push(
                    `${pathname}?date=${selectedDate}&show=${encodeURIComponent(
                      selectedShow
                    )}&seats=${number}`
                  )
                }
              >
                {number}
              </button>
            ))}
          </div>

          <div className={styles.ticketTypes}>

            <div>
              <strong>
                RECLINER
              </strong>

              <span>
                ₹530
              </span>

              <small>
                AVAILABLE
              </small>
            </div>

            <div>
              <strong>
                PRIME PLUS
              </strong>

              <span>
                ₹330
              </span>

              <small>
                AVAILABLE
              </small>
            </div>

            <div>
              <strong>
                PRIME
              </strong>

              <span>
                ₹280
              </span>

              <small>
                AVAILABLE
              </small>
            </div>

            <div>
              <strong>
                CLASSIC
              </strong>

              <span>
                ₹260
              </span>

              <small>
                AVAILABLE
              </small>
            </div>

          </div>

          <div className={styles.bestseller}>
            Book the 🟨 Bestseller Seats in
            this cinema at no extra cost!
          </div>

          <button
            type="button"
            className={
              styles.selectSeatsButton
            }
            onClick={() =>
              router.push(pathname)
            }
          >
            Select Seats
          </button>

        </div>
      </div>
    );
  };

  if (movieLoading) {
    return (
      <p className={styles.message}>
        Loading movie...
      </p>
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
      <p className={styles.message}>
        Movie not found
      </p>
    );
  }

  return (
    <main className={styles.moviePage}>

      {renderMovieInfo()}

      {renderDates()}

      {renderTheatres()}

      {renderSeatPopup()}

    </main>
  );
}