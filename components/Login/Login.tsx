"use client";

import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import styles from "./Login.module.scss";
import {setFirstName,setLastName,setEmail,setPassword,setAuthMode,clearLoginMessage,} from "../../store/user/userSlice";
import {loginUser, signupUser,} from "../../store/user/userThunk";
import { RootState, AppDispatch,} from "../../store/reduxStore";
import { inputFields, InputFieldName,} from "./LoginInputField";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => { 
    const checkToken = async() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try{
      const response = await fetch("/api",{
        method: "GET",
        headers: { Authorization: `Bearer ${token}`,},
      });
      if(response.ok){
        router.replace("/dashboard");
      }else{
        localStorage.removeItem("token");
      }
    }catch{
      localStorage.removeItem("token");
    }
  };
   checkToken();
  }, [router]);

  const { firstName, lastName, email, password, loginMessage, authMode,} = useSelector(
    (state: RootState) => state.user
  );
  const fieldValues: Record<InputFieldName, string> = {
    firstName,
    lastName,
    email,
    password,
  };

  const fieldActions = {
    firstName: setFirstName,
    lastName: setLastName,
    email: setEmail,
    password: setPassword,
  };

  const handleLogin = async ( event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      return;
    }
    dispatch(clearLoginMessage());
    const result = await dispatch(
      loginUser({ email, password,})
    );
    if (loginUser.fulfilled.match(result)) {
      router.replace("/dashboard");
    }
  };

  const handleSignup = async ( event: FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    if ( !firstName || !lastName || !email || !password ) {
      return;
    }
    dispatch(clearLoginMessage());
    const result = await dispatch(
      signupUser({ firstName, lastName, email, password,
      })
    );
    if (signupUser.fulfilled.match(result)) {
      router.replace("/dashboard");
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

  const renderFormFields = () => {
    return (
      <>
        {inputFields
          .filter((field) => !field.signupOnly || authMode === "signup"
          )
          .map((field) => (
            <div className={styles.formField} key={field.name} >
              <label htmlFor={field.name}> {field.label}</label>

              <input type={field.type} id={field.name} value={fieldValues[field.name]}
                onChange={(event) =>
                  dispatch( fieldActions[field.name](event.target.value))
                }
                required
              />
            </div>
          ))}
        {loginMessage && (
          <p className={styles.loginMessage}> {loginMessage}   </p>
        )}
      </>
    );
  };

  const renderButtons = () => (
    <div className={styles.buttons}>
      <button type="button" onClick={handleCancel}> Cancel </button>

      <button type="submit"> {authMode === "login" ? "Login" : "Sign Up"} </button>
    </div>
  );

  const renderAuthSwitch = () => {
    if (authMode === "login") {
      return (
        <p className={styles.registerText}> Don't have an account?{" "}
          <button type="button" className={styles.registerButton} onClick={handleRegisterClick}>
            Register
          </button>
        </p>
      );
    }

    return (
      <p className={styles.registerText}> Already have an account?{" "}
        <button type="button" className={styles.registerButton} onClick={handleLoginMode}>
          Login
        </button>
      </p>
    );
  };

  const renderLoginForm = () => (
    <form
      onSubmit={authMode === "login" ? handleLogin : handleSignup}
    >
      {renderFormFields()}
      {renderButtons()}
      {renderAuthSwitch()}
    </form>
  );

  return (
    <main className={styles.container}>
      <div className={styles.loginBox}>
        <h1>
          {authMode === "login" ? "Login" : "Sign Up"}
        </h1>
        {renderLoginForm()}
      </div>
    </main>
  );
}