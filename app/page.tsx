"use client";

import { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import { setEmail, setPassword,} from "./store/userSlice";
import { RootState, AppDispatch } from "./store/reduxStore";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const email = useSelector((state: RootState) => state.user.email);
  const password = useSelector((state: RootState) => state.user.password);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   
    if(!email || !password){
      return;
    }
    router.push("/dashboard");
  };
    const handleCancel = () => {
    dispatch(setEmail(""));
    dispatch(setPassword(""));
  };
  return (
    <main className={styles.container}>
      <div className={styles.loginBox}>
        <h1>Login</h1>

        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email:</label>

          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) =>
              dispatch(setEmail(event.target.value))
            }
            required
          />

          <label htmlFor="password">Password:</label>

          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) =>
              dispatch(setPassword(event.target.value))
            }
            required
          />

          <div className={styles.buttons}>
            <button
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button type="submit">
              Login
            </button>
          </div>

          <p className={styles.registerText}>
            Don't have an account?{" "}
            <button
              type="button"
              className={styles.registerButton}
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </main>
  );
}