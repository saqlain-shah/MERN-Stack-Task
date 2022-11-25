import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../methods/users";

function Register() {
  const history = useNavigate();
  const userData = window.localStorage.getItem("userData");

  const [form, setForm] = useState({
    email: "",
    username: "",
  });
  useEffect(() => {
    if (userData) {
      history("/dashboard");
    }
  }, [history, userData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(form, history).then((resp) =>
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
            <h3>Sign Up</h3>
            <div className="mb-3">
              <label>Username</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="Username"
                name="username"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                required
                className="form-control"
                name="email"
                placeholder="Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <Link className="nav-link" to={"/sign-in"}>
              Already registered?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
