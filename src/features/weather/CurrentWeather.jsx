/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { weatherSelector,  forecastSelector, coordsSelector } from './weatherSlice';
import WeatherIcon from './WeatherIcon';
import { mtok, tempConverter } from '../../utils/convertion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { css } from '@emotion/react';
import MapView from '../../components/MapView';
import ResumeView from './ResumeView';

const CurrentWeather = () => {

  const current = useSelector(weatherSelector);
  const [curTime, setCurTime ] = useState(new Date().toLocaleTimeString().substring(0, 5));
  const coords = useSelector(coordsSelector);
  const forecast = useSelector(forecastSelector);

  useEffect(() => {
    setInterval(() => {
      setCurTime(new Date().toLocaleTimeString().substring(0, 5));
    }, 1000);
  }, []);

  const renderInfoCard = () => {
    if (Object.keys(current).length > 0) {
      return <div>
        <span className="text-muted fs-5 fw-light">{ current.name }, <strong className="text-primary fw-bold">{ current.sys.country }</strong> </span>
        <div className="card border border-primary" >
          <div className="card-body pt-0">
            <div className="mb-4">
              <p className="lead text-secondary fw-bold m-0">Current Time</p>
              <p className="text-muted fw-light">{ curTime }</p>
            </div>
            <div className="d-flex align-items-center justify-content-around mb-4">
              <div className="d-flex align-items-center">
                <WeatherIcon icon={current.weather[0].icon} size="2" className="border border-2 border-primary rounded-circle shadow m-0 p-0 me-2" />
                <span className="fs-1 fw-bold text-secondary">{tempConverter(current.main.temp, 'c')}</span>
              </div>
              
              <div className="d-flex flex-column">
                <p className="fw-bold m-0 fs-">{ current.weather[0].description.toUpperCase()}</p>
                <p className="text-muted fst-italic">Feels like  <strong className="text-secondary">{ tempConverter(current.main.feels_like, 'c') }</strong></p>
              </div>
            </div>
            <div className="d-flex justify-content-between" css={css`
              width: 100%;
              overflow-x: auto;
            `}>
              <div className="d-flex flex-column shadow rounded-2 border border-secondary p-3 me-1 mini-info">
                <p className="text-muted mb-0">WIND</p>
                <strong>{ `${current.wind.speed } m/s`} <FontAwesomeIcon icon={solid('arrow-up')} css={css`
                  transform: rotate(${current.wind.deg}deg);
                  margin-left: 0.3rem;
                `} /></strong>
              </div>
              <div className="d-flex flex-column shadow rounded-2 border border-secondary p-3 me-1 mini-info">
                <p className="text-muted mb-0">HUMIDITY</p>
                <strong>{ `${current.main.humidity }%`}</strong>
              </div>
              <div className="d-flex flex-column shadow rounded-2 border border-secondary p-3 me-1 mini-info">
                <p className="text-muted mb-0">VISIBILITY</p>
                <strong>{ `${mtok(current.visibility) }`}</strong>
              </div>
              <div className="d-flex flex-column shadow rounded-2 border border-secondary p-3 me-1 mini-info">
                <p className="text-muted mb-0">PRESSURE</p>
                <strong>{ `${current.main.pressure } hPa`}</strong>
              </div>
              <div className="d-flex flex-column shadow rounded-2 border border-secondary p-3 me-1 mini-info">
                <p className="text-muted mb-0">CLOUDS</p>
                <strong>{ `${current.clouds.all }%`}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  }

  const renderForecastResume = () => {
    if (forecast.list?.length > 0) {
      return forecast.list.map((forecast, idx) => 
        <ResumeView key={idx}
          dt={forecast.dt}
          temp={forecast.main.temp}
          icon={forecast.weather[0].icon}
        />);
    }
  }

  return (
    <React.Fragment>
      <div className="container-fluid p-2">
        <div className="row">
          <h1 className="display-6 text-primary fw-bold mb-4">Current Weather</h1>
        </div>
        <div className="row">
          <div className="col-sm-7">
            { renderInfoCard() }
          </div>
          <div className="col-sm-5">
            <MapView height="190px" zoom="10" coords={coords} />
            <div className="d-flex" css={css`width: 100%; overflow-x: scroll`}>
              { renderForecastResume() }
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CurrentWeather;
