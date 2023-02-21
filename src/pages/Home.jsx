/** @jsxImportSource @emotion/react */
import React from 'react';
import bannerBg from '../images/banners/banner.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <React.Fragment>
      <div className="container-fluid m-3">
        <div className="row">
          <div className="col-sm-5 p-2">
            <h1 className="display-4 text-primary fw-bold mb-0">Weather at yours hands</h1>
            <p className="text-secondary mb-4">Weather and forecast for everyone!</p>

            <h2 className="text-secondary fw-normal fs-3">What should you expect?</h2>
            <p className="lead fs-6 text-muted">Our app is the best way to check the weather and get accurate weather forecasts. Powered by Open Weather.</p>

            <Link to="/current"  className="btn btn-lg btn-outline-primary mt-4">View Current Weather</Link>
          </div>
          <div className="col-sm-7 p-4 m-0 d-flex align-items-end justify-content-center">
            <img src={bannerBg} className="img-fluid" alt="No banner load" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Home;
