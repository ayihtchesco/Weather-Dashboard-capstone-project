import React, { useState } from "react";
import "./index.css";
import { fetchWeather } from "./components/weather";

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
        style={{ background: "#F59E0B" }}
      >
        <span className="font-bold text-white">B</span>
      </div>
      <div className="leading-tight">
        <div className="text-lg font-semibold text-white">Blessing's Ideas</div>
        <div className="text-xs text-[#EDE7F6]">Weather</div>
      </div>
    </div>
  );
}

function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (q.trim()) onSearch(q.trim());
      }}
      className="w-full max-w-2xl flex items-center gap-3"
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search city, e.g. Madina, Accra"
        className="flex-1 py-3 px-4 rounded-2xl placeholder:text-[#6b7280] bg-white/90 text-[#111827] shadow-sm outline-none"
        aria-label="Search city"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-full bg-[#F59E0B] text-white font-semibold shadow hover:opacity-95 transition"
      >
        Search
      </button>
    </form>
  );
}

function LandingHero({ onSearch }) {
  return (
    <header className="min-h-[60vh] flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-8 px-6 md:px-16 py-12">
      <div className="max-w-xl">
        <Logo />
        <h1 className="mt-8 text-4xl md:text-5xl font-extrabold text-white leading-tight">
          Your local <span className="text-[#EDE7F6]">weather</span>,
          <br /> everywhere.
        </h1>
        <p className="mt-4 text-[#EDE7F6] max-w-md">
          Beautiful, simple, and fast — built with React + Tailwind. Search a
          city to get its current weather and forecast.
        </p>

        <div className="mt-8">
          <SearchBar onSearch={onSearch} />
        </div>

        <div className="mt-6 flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm">
            My Location
          </button>
          <button className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm">
            Top Cities
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          {/* Decorative world map-like background using SVG pattern */}
          <div className="h-60 md:h-80 p-6 flex flex-col justify-between bg-gradient-to-br from-[#3B0A45] to-[#6D28D9]">
            <div className="flex justify-between items-start">
              <div className="text-white">
                <div className="text-xs">Current Location</div>
                <div className="text-2xl font-bold">Accra, Ghana</div>
              </div>
              <div className="text-right text-white">
                <div className="text-xs">Now</div>
                <div className="text-3xl font-bold">28°C</div>
              </div>
            </div>

            <div className="flex gap-3 overflow-auto">
              {["Madina", "Kumasi", "Tamale", "Takoradi", "Tema"].map((c) => (
                <div
                  key={c}
                  className="min-w-[120px] bg-white/10 p-3 rounded-xl"
                >
                  <div className="text-sm text-[#F3E8FF]">{c}</div>
                  <div className="mt-2 text-lg font-semibold text-white">
                    {Math.floor(20 + Math.random() * 12)}°C
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function WeatherCard({
  city,
  temp,
  desc,
  humidity,
  wind,
  pressure,
  visibility,
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 w-full md:w-96 text-[#111827]">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-[#6b7280]">{city}</div>
          <div className="text-3xl font-bold">{Math.round(temp)}°C</div>
        </div>
        <div className="text-right">
          <div className="text-sm">{desc}</div>
          <div className="text-4xl mt-2">☁️</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-[#6b7280]">
        <div className="flex flex-col">
          <span className="font-medium text-[#374151]">Humidity</span>
          <span>{humidity}%</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-[#374151]">Wind</span>
          <span>{wind} m/s</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-[#374151]">Pressure</span>
          <span>{pressure} hPa</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-[#374151]">Visibility</span>
          <span>{visibility / 1000} km</span>
        </div>
      </div>
    </div>
  );
}

function ForecastList() {
  const items = Array.from({ length: 8 }).map((_, i) => ({
    time: `${(i + 1) * 3}h`,
    temp: `${20 + i}°C`,
    icon: i % 2 === 0 ? "🌤" : "🌧",
  }));

  return (
    <div className="mt-6 overflow-x-auto">
      <div className="flex gap-3 w-max">
        {items.map((it, idx) => (
          <div
            key={idx}
            className="bg-white/90 p-3 rounded-xl min-w-[110px] shadow"
          >
            <div className="text-sm text-[#6b7280]">{it.time}</div>
            <div className="text-2xl font-bold">{it.temp}</div>
            <div className="text-xl mt-2">{it.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [city, setCity] = useState(null);
  const [view, setView] = useState("landing");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(q) {
    try {
      setCity(q);
      setView("dashboard");
      setLoading(true);
      setError(null);
      const data = await fetchWeather(q);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#3B0A45] text-white">
      {/* Nav */}
      <nav className="px-6 py-4 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-4">
          <a className="text-sm text-[#EDE7F6]">Docs</a>
          <a className="text-sm text-[#EDE7F6]">About</a>
        </div>
      </nav>

      {view === "landing" && <LandingHero onSearch={handleSearch} />}

      {view === "dashboard" && (
        <main className="px-6 md:px-16 py-10">
          <div className="mb-6 flex items-center justify-between gap-6">
            <div>
              <div className="text-sm text-[#EDE7F6]">Showing results for</div>
              <div className="text-2xl md:text-3xl font-bold">{city}</div>
            </div>
            <div className="flex items-center gap-3">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>

          {loading && <p className="text-[#EDE7F6]">Loading...</p>}
          {error && <p className="text-red-400">{error}</p>}

          {weather && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <WeatherCard
                city={weather.name}
                temp={weather.main.temp}
                desc={weather.weather[0].description}
                humidity={weather.main.humidity}
                wind={weather.wind.speed}
                pressure={weather.main.pressure}
                visibility={weather.visibility}
              />

              <div className="md:col-span-2">
                <div className="bg-white/5 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Hourly Forecast</h3>
                    <div className="text-sm text-[#EDE7F6]">Next 24h</div>
                  </div>

                  <ForecastList />

                  <div className="mt-6">
                    <div className="text-lg font-semibold mb-3">
                      World Map (placeholder)
                    </div>
                    <div className="h-48 rounded-xl bg-gradient-to-br from-[#6D28D9]/20 to-[#3B0A45]/10 flex items-center justify-center text-[#C7B0E8]">
                      Interactive map goes here
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      <footer className="py-8 text-center text-sm text-[#EDE7F6]">
        Blessing's Idieas
      </footer>
    </div>
  );
}
