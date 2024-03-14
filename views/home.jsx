import React from "react";

export default function Home({ currentUser }) {
  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta httpeEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Home Page</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="/stylesheets/home.css" />
      </head>
      <body className="d-flex text-center text-white bg-dark">
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <header className="mb-auto">
            <div>
              <h3 className="float-md-left mb-0">YelpCamp</h3>
              <nav className="nav nav-masthead justify-content-center float-md-right">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
                <a className="nav-link" href="/campgrounds">
                  Campgrounds
                </a>
                {!currentUser ? (
                  <>
                    <a className="nav-link" href="/login">
                      Login
                    </a>
                    <a className="nav-link" href="/register">
                      Register
                    </a>
                  </>
                ) : (
                  <a className="nav-link" href="/logout">
                    Logout
                  </a>
                )}
              </nav>
            </div>
          </header>
          <main className="px-3">
            <h1>YelpCamp</h1>
            <p className="lead">
              {" "}
              Welcome to YelpCamp! <br /> Jump right in and explore our many
              campgrounds. <br />
              Feel free to share some of your own and comment on others!
            </p>
            <a
              href="/campgrounds"
              className="btn btn-lg btn-secondary font-weight-bold border-white bg-white"
            >
              View Campgrounds
            </a>
          </main>
          <footer className="mt-auto text-white-50">
            <p>&copy; 2023 </p>
          </footer>
        </div>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
          crossorigin="anonymous"
        ></script>
        <script src="https://cdn.jsdelivr.net/npm/bs-custom-file-input/dist/bs-custom-file-input.min.js"></script>
        <script src="/scripts/validateForms.js"></script>
      </body>
    </>
  );
}
