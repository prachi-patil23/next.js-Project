"use client";

import { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import styles from "./page.module.scss";

import {
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setAuthMode,
  clearLoginMessage,
} from "../../store/user/userSlice";

import {
  loginUser,
  signupUser,
} from "../../store/user/userThunk";

import {
  RootState,
  AppDispatch,
} from "../../store/reduxStore";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const firstName = useSelector(
    (state: RootState) => state.user.firstName
  );

  const lastName = useSelector(
    (state: RootState) => state.user.lastName
  );

  const email = useSelector(
    (state: RootState) => state.user.email
  );

  const password = useSelector(
    (state: RootState) => state.user.password
  );

  const loginMessage = useSelector(
    (state: RootState) => state.user.loginMessage
  );

  const authMode = useSelector(
    (state: RootState) => state.user.authMode
  );

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!email || !password) {
      return;
    }

    dispatch(clearLoginMessage());

    const result = await dispatch(
      loginUser({
        email,
        password,
      })
    );

    if (loginUser.fulfilled.match(result)) {
      router.push("/dashboard");
    }
  };

  const handleSignup = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password
    ) {
      return;
    }

    dispatch(clearLoginMessage());

    const result = await dispatch(
      signupUser({
        firstName,
        lastName,
        email,
        password,
      })
    );

    if (signupUser.fulfilled.match(result)) {
      router.push("/dashboard");
    }
  };

  const handleCancel = () => {
    dispatch(setFirstName(""));
    dispatch(setLastName(""));
    dispatch(setEmail(""));
    dispatch(setPassword(""));
    dispatch(clearLoginMessage());
    dispatch(setAuthMode("login"));
  };

  const handleRegisterClick = () => {
    dispatch(clearLoginMessage());
    dispatch(setAuthMode("signup"));
  };

  const handleLoginMode = () => {
    dispatch(clearLoginMessage());
    dispatch(setAuthMode("login"));
  };

  return (
    <main className={styles.container}>
      <div className={styles.loginBox}>
        <h1>
          {authMode === "login"
            ? "Login"
            : "Sign Up"}
        </h1>

        <form
          onSubmit={
            authMode === "login"
              ? handleLogin
              : handleSignup
          }
        >
          {authMode === "signup" && (
            <>
              <label htmlFor="firstName">
                First Name:
              </label>

              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(event) =>
                  dispatch(
                    setFirstName(
                      event.target.value
                    )
                  )
                }
                required
              />

              <label htmlFor="lastName">
                Last Name:
              </label>

              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(event) =>
                  dispatch(
                    setLastName(
                      event.target.value
                    )
                  )
                }
                required
              />
            </>
          )}

          <label htmlFor="email">
            Email:
          </label>

          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) =>
              dispatch(
                setEmail(event.target.value)
              )
            }
            required
          />

          <label htmlFor="password">
            Password:
          </label>

          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) =>
              dispatch(
                setPassword(event.target.value)
              )
            }
            required
          />

          {loginMessage && (
            <p className={styles.loginMessage}>
              {loginMessage}
            </p>
          )}

          <div className={styles.buttons}>
            <button
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button type="submit">
              {authMode === "login"
                ? "Login"
                : "Sign Up"}
            </button>
          </div>

          {authMode === "login" ? (
            <p className={styles.registerText}>
              Don't have an account?{" "}

              <button
                type="button"
                className={styles.registerButton}
                onClick={handleRegisterClick}
              >
                Register
              </button>
            </p>
          ) : (
            <p className={styles.registerText}>
              Already have an account?{" "}

              <button
                type="button"
                className={styles.registerButton}
                onClick={handleLoginMode}
              >
                Login
              </button>
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
