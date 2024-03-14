import React from "react";
import Boilerplate from "../layouts/Boilerplate";

export default function Show({ campground, currentUser }) {
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
            <li className="list-group-item">
              Submitted by{" "}
              {campground.author
                ? campground.author.username
                : campground.username}
            </li>
            <li className="list-group-item">
              £{campground.price}.00 per night
            </li>
            <li className="list-group-item">
              Photo by{" "}
              <a
                href={`https://unsplash.com/@${campground.username}?utm_source=campsite-app&utm_medium=referral`}
              >
                {campground.creator}
              </a>{" "}
              on{" "}
              <a href="https://unsplash.com/?utm_source=campsite-app&utm_medium=referral">
                Unsplash
              </a>
            </li>
          </ul>
          <div id="map"></div>
          {currentUser && campground.author.equals(currentUser._id) && (
            <div className="card-body">
              <a
                href={`/campgrounds/${campground._id}/edit`}
                className="card-link btn btn-info"
              >
                Edit
              </a>
              <form
                className="d-inline"
                action={`/campgrounds/${campground._id}?_method=DELETE`}
                method="POST"
              >
                <button className="btn btn-danger">Delete</button>
              </form>
            </div>
          )}
          <div className="card-footer">
            2 days ago
            <a href="/campgrounds" className="card-link float-end">
              Back to all campgrounds
            </a>
          </div>
        </div>
        <div className="col-6">
          {currentUser && (
            <>
              <h2>Leave a Review</h2>
              <form
                action={`/campgrounds/${campground._id}/reviews`}
                method="POST"
                className="mb-3 needs-validation"
                novalidate
              >
                <div className="mb-3">
                  <fieldset className="starability-grow">
                    <legend>Your rating:</legend>
                    <input
                      type="radio"
                      id="no-rate"
                      className="input-no-rate"
                      name="review[rating]"
                      value="3"
                      checked
                      aria-label="No rating."
                    />
                    <input
                      type="radio"
                      id="first-rate1"
                      name="review[rating]"
                      value="1"
                    />
                    <label htmlFor="first-rate1" title="Terrible">
                      1 star
                    </label>
                    <input
                      type="radio"
                      id="first-rate2"
                      name="review[rating]"
                      value="2"
                    />
                    <label htmlFor="first-rate2" title="Not good">
                      2 stars
                    </label>
                    <input
                      type="radio"
                      id="first-rate3"
                      name="review[rating]"
                      value="3"
                    />
                    <label htmlFor="first-rate3" title="Average">
                      3 stars
                    </label>
                    <input
                      type="radio"
                      id="first-rate4"
                      name="review[rating]"
                      value="4"
                    />
                    <label htmlFor="first-rate4" title="Very good">
                      4 stars
                    </label>
                    <input
                      type="radio"
                      id="first-rate5"
                      name="review[rating]"
                      value="5"
                    />
                    <label htmlFor="first-rate5" title="Amazing">
                      5 stars
                    </label>
                  </fieldset>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="body">
                    Review
                  </label>
                  <textarea
                    className="form-control"
                    name="review[body]"
                    id="body"
                    cols="30"
                    rows="3"
                    required
                  ></textarea>
                  <div id="enterReview" className="invalid-feedback">
                    Please enter some text before submitting
                  </div>
                </div>
                <button className="btn btn-success">Submit</button>
              </form>
              {campground.reviews.map((review) => {
                <div className="card mb-3">
                  <div className="card-body">
                    <h4>{review.rating} stars</h4>
                    <p
                      className="starability-result"
                      data-rating={review.rating}
                    >
                      Rated: {review.rating} stars
                    </p>
                    <p className="card-text">Review: {review.body}</p>
                    <p className="card-subtitle mb-2 text-muted">
                      By {review.author.username}
                    </p>
                    {currentUser && review.author.equals(currentUser) && (
                      <form
                        action={`/campgrounds/${campground._id}/reviews/${review._id}?_method=DELETE`}
                        method="POST"
                      >
                        <button className="btn btn-sm btn-danger">
                          Delete
                        </button>
                      </form>
                    )}
                  </div>
                </div>;
              })}
            </>
          )}
        </div>
      </div>
      <img src="/pin-marker.PNG" alt="" id="marker" width="40" />
      <script>
        const mapToken = process.env.MAPBOX_TOKEN; const campground =
        JSON.stringify(campground);
      </script>
      <script src="/scripts/showPageMap.js"></script>
      {/* <script>console.log(campground);</script> */}
    </Boilerplate>
  );
}
