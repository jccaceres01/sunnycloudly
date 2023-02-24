import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from '../pages/Home';
import CurrentWeather from "../features/weather/CurrentWeather";
import ByLocation from "../features/geocode/ByLocation";
import About from "../pages/About";

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
        element: <About />
      },
    ]
  }
]);

export default router;