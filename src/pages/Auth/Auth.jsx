
import classes from "./Signup.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../utility/Firebase";
import { useState, useContext } from "react";
import { HashLoader } from "react-spinners";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../utility/ActionType";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signin: false, signup: false });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log(navStateData);

  console.log(user);

  const authHandler = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log(e.target.name);

    if (e.target.name === "Signin") {
      setLoading((prevLoading) => ({ ...prevLoading, signin: true }));
      // Signin process
      signInWithEmailAndPassword(auth, email, password)
        .then((authUser) => {
          setError(""); // Clear any errors
          dispatch({
            type: Type.SET_USER,
            user: authUser.user, // Dispatch the authenticated user to the context
          });
          setLoading((prevLoading) => ({ ...prevLoading, signin: false }));
          navigate(navStateData?.state.redirect || "/");
        })
        .catch((error) => {
          setError(error.message); // Display error if sign-in fails
          setLoading((prevLoading) => ({ ...prevLoading, signin: false }));
        });
    } else {
      // Signup process
      setLoading((prevLoading) => ({ ...prevLoading, signup: true }));
      createUserWithEmailAndPassword(auth, email, password)
        .then((authUser) => {
          setError(""); // Clear any errors
          dispatch({
            type: Type.SET_USER,
            user: authUser.user, // Dispatch the authenticated user to the context
          });
          setLoading((prevLoading) => ({ ...prevLoading, signup: false }));
          navigate(navStateData?.state.redirect || "/");
        })
        .catch((error) => {
          setError(error.message); // Display error if sign-up fails
          setLoading((prevLoading) => ({ ...prevLoading, signup: false }));
        });
    }
  };

  return (
    <section className={classes.login}>
      {/* Logo */}
      <Link to="/">
        <img
          src="https://download.logo.wine/logo/Amazon_(company)/Amazon_(company)-Logo.wine.png"
          alt="Amazon Logo"
        />
      </Link>

      {/* Form */}
      <div className={classes.login_containe }>
        <h1>Sign in</h1>
        {navStateData?.state?.message && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.message}
          </small>
        )}

        {/* Form for Sign In or Sign Up */}
        <form onSubmit={authHandler}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className={classes.error}>{error}</p>}

          {/* Sign In Button */}
          <button
            type="submit"
            onClick={authHandler}
            name="Signin"
            className={classes.login_signinBtn}
          >
            {loading.signin ? <HashLoader color="#fff" size={20} /> : "Sign In"}
          </button>
        </form>

        <p>
          By signing in, you agree to the AMAZON CLONE conditions of use & sale.
          Please see our privacy notice, our cookies notice, and our
          interest-based ads notice.
        </p>

        {/* Create Account Button */}
        <button
          type="submit"
          onClick={authHandler}
          name="Signup"
          className={classes.login_reg_Btn}
        >
          {loading.signup ? (
            <HashLoader color="#fff" size={20} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <small
            style={{
              paddingTop: "15px",
              color: "red",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {error}
          </small>
        )}
      </div>
    </section>
  );
}

export default Auth;
