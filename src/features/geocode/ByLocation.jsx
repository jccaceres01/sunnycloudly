/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { 
  getPosition,
  getLocatedWeather,
  getLocatedForecast,
  filteredPositionsSelector, 
  setSelectedPosition,
  clearFilteredPositions, 
  selectedPositionSelector,
  locatedWeatherSelector,
  locatedForecastSelector
} from './geocodeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import WeatherInfo from '../weather/WeatherInfo';
import ResumeView from '../weather/ResumeView';
import { css } from '@emotion/react';

const ByLocation = () => {

  const [criteria, setCriteria] = useState('');
  const filteredPositions = useSelector(filteredPositionsSelector);
  const selectedLocation = useSelector(selectedPositionSelector);
  const weather = useSelector(locatedWeatherSelector);
  const forecast = useSelector(locatedForecastSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getPosition(criteria));
    }, 500);
    
    return () => clearTimeout(timer);
  }, [criteria]);

  useEffect(() => {
    if (selectedLocation !== null) {
      dispatch(getLocatedWeather());
      dispatch(getLocatedForecast());
    }
  }, [selectedLocation]);

  const setSelectedLocation = (position) => {
    dispatch(setSelectedPosition(position));
    dispatch(clearFilteredPositions());
    setCriteria('');
  }

  const renderLocationList = () => {
    if (filteredPositionsSelector.length > 0) {
      return (
        <ul className="list-group" css={css`
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100%;
          z-index: 1000;
        `}>
          { filteredPositions.map((location, idx) => {
            return <li className="list-group-item list-group-item-action pointer" key={idx} role="button" onClick={() => setSelectedLocation(location)}>
              <span className="d-flex align-items-center justify-content-between">
                <p className="text-muted m-0">{location.name}, <strong>{location.country}</strong></p>
                <span><img src={`https://openweathermap.org/images/flags/${location.country.toLowerCase()}.png`} alt="" /></span>
              </span>
            </li>
          })}
        </ul>
      )
    }
  }
  
  const renderWeatherInfo = () => {
    if (weather?.cod === 200) {
      return <WeatherInfo weather={weather} />
    }
  }

  const renderForecastResume = () => {
    if (forecast.list?.length > 0) {
      return <div>
        <span className="display-6 text-secondary">Forecast</span>
          <div className="d-flex" css={css`width: 100%; overflow-x: auto;`}>
              { forecast.list.map((forecast, idx) => 
              <ResumeView key={idx}
                dt={forecast.dt}
                temp={forecast.main.temp}
                icon={forecast.weather[0].icon}
              />)}
          </div>
      </div>  
    }
  }

  return (
      <div className="container-fluid p-2">
        <div className="row">
          <div className="col-sm-6">
            <h1 className="display-6 text-primary fw-bold mb-4">Find Location</h1>
          </div>
          <div className="col-sm-6">
            <div>
              <form onSubmit={(e) => e.preventDefault() }>
                <div className="input-group mb-2">
                  <input type="text" className="form-control form-control-lg text-primary border border-primary" value={criteria} placeholder="Search Location" onChange={(e) => {setCriteria(e.currentTarget.value)} } />
                  <button type="button" className="btn btn-primary" onClick={() => setCriteria('') }>
                    <FontAwesomeIcon icon={solid('remove')} className="text-white" />
                  </button>
                </div>
              </form>
              <div className="position-relative">
                { renderLocationList() }
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            { renderWeatherInfo() }
          </div>
        </div>
        <div className="row">
          <div className="col">
            { renderForecastResume() }
          </div>
        </div>
      </div>
  );
}

export default ByLocation;