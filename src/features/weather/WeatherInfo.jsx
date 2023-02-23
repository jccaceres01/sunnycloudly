/** @jsxImportSource @emotion/react */
import WeatherIcon from './WeatherIcon';
import { mtok, tempConverter } from '../../utils/convertion';
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import SquareShow from './SquareShow';

const CurrentWeaderInfo = ({ weather }) => {
  const [curTime, setCurTime ] = useState(new Date().toLocaleTimeString().substring(0, 5));

  useEffect(() => {
    setInterval(() => {
      setCurTime(new Date().toLocaleTimeString().substring(0, 5));
    }, 1000);
  }, []);

  return (
    <div>
      <span className="text-muted fs-5 fw-light">{ weather.name }, <strong className="text-primary fw-bold">{ weather.sys.country }</strong> </span>
      <div className="card border border-primary" >
        <div className="card-body pt-0">
          <div className="mb-4">
            <p className="lead text-secondary fw-bold m-0">weather Time</p>
            <p className="text-muted fw-light">{ curTime }</p>
          </div>
          <div className="d-flex align-items-center justify-content-around mb-4">
            <div className="d-flex align-items-center">
              <WeatherIcon icon={weather.weather[0].icon} size="2" className="border border-2 border-primary rounded-circle shadow m-0 p-0 me-2" />
              <span className="fs-1 fw-bold text-secondary">{tempConverter(weather.main.temp, 'c')}</span>
            </div>
            
            <div className="d-flex flex-column">
              <p className="fw-bold m-0 fs-">{ weather.weather[0].description.toUpperCase()}</p>
              <p className="text-muted fst-italic">Feels like  <strong className="text-secondary">{ tempConverter(weather.main.feels_like, 'c') }</strong></p>
            </div>
          </div>
          <div className="d-flex justify-content-between" css={css`
            width: 100%;
            overflow-x: auto;
          `}>
            <SquareShow title="wind" data={weather.wind.speed} symbol="m/s" deg={weather.wind.deg} />
            <SquareShow title="humidity" data={weather.main.humidity} symbol="%" />
            <SquareShow title="visibility" data={mtok(weather.visibility)} />
            <SquareShow title="pressure" data={weather.main.pressure} symbol="hPa" />
            <SquareShow title="clouds" data={weather.clouds.all} symbol="%" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeaderInfo;