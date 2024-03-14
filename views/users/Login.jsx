import React from "react";
import Boilerplate from "../layouts/Boilerplate";

export default function Login() {
  return (
    <Boilerplate>
      <div className="container d-flex justify-content-center align-items-center mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
            <div className="card shadow">
              <img
                src="https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
                alt=""
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">Login</h5>
                <form
                  action="/login"
                  method="POST"
                  className="needs-validation"
                  novalidate
                >
                  <div className="mb-3">
                    <label className="form-label" for="username">
                      Username
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="username"
                      name="username"
                      autofocus
                      required
                      aria-describedby="enterUsername"
                    />
                    <div id="enterUsername" className="invalid-feedback">
                      Please enter a username
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label" for="password">
                      Password
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      id="password"
                      name="password"
                      required
                      aria-describedby="enterPassword"
                    />
                    <div id="enterPassword" className="invalid-feedback">
                      Please enter a password
                    </div>
                  </div>
                  <button className="btn btn-success btn-block">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Boilerplate>
  );
}
