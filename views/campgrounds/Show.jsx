import React from "react";
import Boilerplate from "../layouts/Boilerplate";

export default function Show({ campground }) {
  console.log(campground);
  return (
    <Boilerplate>
      <link rel="stylesheet" href="/stylesheets/stars.css" />
      <div className="row campgroundDisplay">
        <div id="campgroundCarousel" className="carousel slide w-50">
          <div className="carousel-inner">
            {campground.images.length &&
              campground.images.map((img, i) => {
                <div className={`carousel-item ${i === 0 ? "active" : ""}`}>
                  <img
                    src={img.url}
                    className="d-block w-100"
                    alt=""
                    crossOrigin="anonymous"
                  />
                </div>;
              })}
            {campground.defaultImg && (
              <div className="carousel-item active">
                <img
                  src={campground.defaultImg}
                  className="d-block w-100"
                  alt=""
                />
              </div>
            )}
          </div>
          {campground.images.length > 1 && (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#campgroundCarousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#campgroundCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </>
          )}
        </div>
        <div className="card col-6 mb-3">
          <div className="card-body">
            <h5 className="card-title">{campground.title}</h5>
            <p className="card-text">{campground.description}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item text-muted">
              {campground.location}
            </li>
            {/* <li className="list-group-item">
              Submitted by {campground.author.username}
            </li> */}
            {/* <li className="list-group-item">
              £{campground.price}.00 per night
            </li> */}
            {/* <li className="list-group-item">
              Photo by<a href=`https://unsplash.com/@${campground.username}?utm_source=campsite-app&utm_medium=referral`>{campground.creator}</a> on <a href="https://unsplash.com/?utm_source=campsite-app&utm_medium=referral">Unsplash</a>
            </li> */}
          </ul>
        </div>
      </div>
    </Boilerplate>
  );
}
