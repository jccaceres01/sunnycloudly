import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { loadingSelector } from '../features/weather/weatherSlice';
import { useSelector } from 'react-redux';

const Navbar = () => {

  const loading = useSelector(loadingSelector);

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg bg-body-tertiary mb-4">
        <div className="container-fluid">
          <FontAwesomeIcon icon={solid('cloud-sun')} className="fs-2 mx-2 text-primary" />
          <Link className="navbar-brand text-secondary fw-bold" to="/">Sunny / Cloudly</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className=" ms-4 collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-secondary" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-secondary" aria-current="page" to="/current">Current</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-secondary" aria-current="page" to="/bylocation">By Location</Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-secondary" aria-current="page" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <span className="nav-link text-secondary" aria-current="page">
                  <Loading busy={loading} className="nav-link text-secondary" />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;