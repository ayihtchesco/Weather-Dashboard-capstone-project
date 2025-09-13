export async function fetchWeather(city) {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch weather");
  return res.json();
}
