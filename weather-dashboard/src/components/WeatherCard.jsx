export default function WeatherCard({ weather }) {
  const { name, main, weather: weatherInfo, wind } = weather;

  return (
    <div className="bg-white/20 backdrop-blur p-6 rounded-xl shadow-md text-black max-w-md w-full">
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <div className="flex items-center justify-between mb-2">
        <img
          src={`https://openweathermap.org/img/wn/${weatherInfo[0].icon}@2x.png`}
          alt={weatherInfo[0].description}
        />
        <p className="text-3xl font-bold">{Math.round(main.temp)}°C</p>
      </div>
      <p className="capitalize mb-2">{weatherInfo[0].description}</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind: {wind.speed} km/h</p>
    </div>
  );
}
