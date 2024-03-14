import React from "react";
import Boilerplate from "../layouts/Boilerplate";

export default function Index({ campgrounds }) {
  //   console.log(campgrounds);
  function getImageUrl(campground) {
    if (campground.images.length) {
      return campground.images[0].url;
    } else if (campground.defaultImg) {
      return campground.defaultImg;
    } else {
      return "https://res.cloudinary.com/dakgl7s9n/image/upload/v1688987603/YelpCamp/agoyxcxqghd1kdl8mzrh.jpg";
    }
  }

  return (
    <>
      <Boilerplate>
        <div id="cluster-map"></div>
        <h1>All Campgrounds</h1>
        <div>
          <a href="/campgrounds/new">Add new campground</a>
        </div>
        {campgrounds.map((campground, index) => (
          <div className="card mb-3">
            <div className="row">
              <div className="col-md-4">
                <img
                  key={index}
                  className="img-fluid"
                  alt="campground preview image"
                  src={getImageUrl(campground)}
                  crossOrigin="anonymous"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{campground.title}</h5>
                  <p className="card-text">{campground.description}</p>
                  <p className="card-text">
                    <small className="text-muted">{campground.location}</small>
                  </p>
                  <a
                    className="btn btn-primary"
                    href={`/campgrounds/${campground._id}`}
                  >
                    View {campground.title}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Boilerplate>

      <script>
        const mapToken = {process.env.MAPBOX_TOKEN}
        {/* const campgrounds = {features: JSON.stringify(campgrounds)} */}
      </script>
      <script src="/scripts/clusterMap.js"></script>
    </>
  );
}
