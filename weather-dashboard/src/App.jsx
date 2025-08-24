import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";

const API_KEY = "599d3a6adec928f0608fef62fc01fe26";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName) => {
    try {
      setError("");
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (res.ok) {
        setWeather(data);
      } else {
        setError(data.message);
        setWeather(null);
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setWeather(null);
    }
  };

  const handleSearch = (cityName) => {
    setCity(cityName);
    fetchWeather(cityName);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6">🌦️ Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage message={error} />}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;
