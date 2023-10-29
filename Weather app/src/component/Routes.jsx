// routes.js

import WeatherApp from "../component/signin/WeatherApp";
import SignIn from "../component/signin/signin";

const routes = [
  {
    path: "/",
    exact: true,
    component: WeatherApp,
  },
  {
    path: "/signin",
    exact: true,
    component: SignIn,
  },
];

export default routes;
