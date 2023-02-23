import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from '../pages/Home';
import CurrentWeather from "../features/weather/CurrentWeather";
import ByLocation from "../features/geocode/ByLocation";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/current',
        element: <CurrentWeather />
      },
      {
        path: '/bylocation',
        element: <ByLocation />
      },
      {
        path: '/about',
        element: <h1>About Page</h1>
      },
    ]
  }
]);

export default router;