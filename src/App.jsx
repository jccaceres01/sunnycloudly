import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCoords, getWeatherData, getForecastData, coordsSelector } from './features/weather/weatherSlice';

import Navbar from './components/Navbar';

function App() {

  const dispatch = useDispatch();
  const coords = useSelector(coordsSelector);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition(pos => {
        if (coords !== {latitude: pos.coords.latitude, longitude: pos.coords.longitude}) {
          dispatch(setCoords({latitude: pos.coords.latitude, longitude: pos.coords.longitude}));
        } else { console.log('No position coorsdinate changed')}
      }, er => {
        console.log(er);
      });
    } else {
      throw new Error('No geolocation enable');
    }
  }, []);

  useEffect(() => {
    if (coords.latitude !== 0 || coords.longitude !== 0) {
      dispatch(getWeatherData());
      dispatch(getForecastData());
    }
  }, [coords]);

  useEffect(() => {
    setInterval(() => {
      dispatch(getWeatherData());
    }, 600000);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="app-wrappler shadow-lg">
          <header>
            <Navbar />
          </header>

          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
