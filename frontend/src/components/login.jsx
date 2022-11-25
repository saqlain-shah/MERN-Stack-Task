import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../methods/users";

function Login() {
  const history = useNavigate();

  const userData = window.localStorage.getItem("userData");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userData) {
      history("/dashboard");
    }
  }, [history, userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form, history).then((resp) =>
      alert(resp.response.data.message)
    );
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>
            Ropstam
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Sign In</h3>
            <div className="mb-3">
              <label>Email address</label>
              <input
                required
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />{" "}
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                required
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="passsword"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />{" "}
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <Link className="nav-link" to={"/sign-up"}>
              Don't have an account?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
