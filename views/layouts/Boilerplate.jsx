import React from "react";
import Navbar from "../partials/navbar";
import Flash from "../partials/Flash";
import Footer from "../partials/Footer";

export default function Boilerplate({ children }) {
  return (
    <>
      <head>
        <meta charset="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Layout template</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="/stylesheets/styles.css" />
        <script
          src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"
          crossOrigin="anonymous"
        ></script>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="/stylesheets/app.css" />
      </head>
      <body class="d-flex flex-column vh-100">
        <Navbar />
        <Flash />
        <main class="container my-4">{children}</main>
        <Footer />
      </body>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bs-custom-file-input/dist/bs-custom-file-input.min.js"
        crossorigin="anonymous"
      ></script>
      <script src="/scripts/validateForms.js"></script>
    </>
  );
}
