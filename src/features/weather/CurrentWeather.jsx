/** @jsxImportSource @emotion/react */
import React from 'react';
import { useSelector } from 'react-redux';
import { weatherSelector,  forecastSelector, coordsSelector } from './weatherSlice';
import { css } from '@emotion/react';
import MapView from '../../components/MapView';
import ResumeView from './ResumeView';
import CurrentWeatherInfo from './WeatherInfo';

const CurrentWeather = () => {

  const current = useSelector(weatherSelector);
  const coords = useSelector(coordsSelector);
  const forecast = useSelector(forecastSelector);

  const renderInfoCard = () => {
    if (Object.keys(current).length > 0) {
      return <CurrentWeatherInfo weather={current} />
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
      <div className="container-fluid p-2 animate__animated animate__fadeIn">
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
