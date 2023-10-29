import WeatherApp from "./component/signin/WeatherApp";
import Signin from "./component/signin/signin";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "../dist/css/index.css";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the "/signin" route when the app loads
    navigate("/");
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Signin/>} />
        <Route path="/weatherapp" element={<WeatherApp />} />
      </Routes>
    </>
  );
}

export default App;
