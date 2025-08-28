import React from "react";
import { Sun, Cloud, CloudRain, CloudLightning, Wind } from "lucide-react";

const WeatherDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      {/* sideBar */}
      <aside className="w-20 flex flex-col items-center space-y-6 py-8 border-r border-gray-700">
        <div className="bg-gray-700 p-3 rounded-xl">
          <Wind size={28} />
        </div>
        <nav className="flex flex-col space-y-6 text-gray-400">
          <button className="hover:text-white">🌤️</button>
          <button className="hover:text-white">🏙️</button>
          <button className="hover:text-white">🗺️</button>
          <button className="hover:text-white">⚙️</button>
        </nav>
      </aside>

      {/* main */}
      <main className="flex-1 px-8">
        <input
          type="text"
          placeholder="Search for cities"
          className="w-full rounded-lg bg-gray-700 p-3 mb-6 text-sm placeholder-gray-400 foucus:ouline-none"
        />
        {/* weather info */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Madrid</h1>
            <p className="text-gray-400">chance of rain: 0%</p>
            <h2 className="text-6xl font-extrabold mt-4">31°</h2>
          </div>
          <Sun size={120} className="text-yellow-400" />
        </div>

        {/* today */}
        <section className="mt-8">
          <h3 className="mb-4 text-gray-400 font-semibold">TODAY’S FORECAST</h3>
          <div className="flex gap-6 bg-gray-800 p-4 rounded-2xl;">
            {[
              { time: "6:00 AM", temp: 25, icon: <Cloud /> },
              { time: "9:00 AM", temp: 28, icon: <Sun /> },
              { time: "12:00 PM", temp: 33, icon: <Sun /> },
              { time: "3:00 PM", temp: 34, icon: <Sun /> },
              { time: "6:00 PM", temp: 32, icon: <Sun /> },
              { time: "9:00 PM", temp: 30, icon: <Cloud /> },
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center">
                <p className="text-sm text-gray-400">{f.time}</p>
                <div className="my-2">{f.icon}</div>
                <p className="text-lg font-semibold">{f.temp}</p>
              </div>
            ))}
          </div>
        </section>
        {/* air condition */}
        <section className="mt-8">
          <h3 className="mb-4 text-gray-400 font-semibold">AIR CONDITIONS</h3>
          <div className="bg-gray-800 rounded-2xl p-6 gird gird-cols-2 gap-6">
            <div>
              <p className="text-gray-400">Real Feel</p>
              <h4 className="text-xl font-bold">30°</h4>
            </div>
            <div>
              <p className="text-gray-400">Wind</p>
              <h4 className="text-xl font-bold">0.2 km/h</h4>
            </div>
            <div>
              <p className="text-gray-400">UV Index</p>
              <h4 className="text-xl font-bold">3</h4>
            </div>
          </div>
        </section>
      </main>
      <aside className="w-64 ml-8">
        <h3 className="mb-4 text-gray-400 font-semibold">7-DAY FORECAST</h3>
        <div className="bg-gray-800 rounded-2xl p-4 space-y-4">
          {[
            {
              day: "Today",
              icon: <Sun className="text-yellow-400" />,
              temp: "36/22",
            },
            {
              day: "Tue",
              icon: <Sun className="text-yellow-400" />,
              temp: "37/21",
            },
            {
              day: "Wed",
              icon: <Sun className="text-yellow-400" />,
              temp: "37/21",
            },
            { day: "Thu", icon: <Cloud />, temp: "37/21" },
            { day: "Fri", icon: <Cloud />, temp: "37/21" },
            { day: "Sat", icon: <CloudRain />, temp: "37/21" },
            {
              day: "Sun",
              icon: <CloudLightning className="text-yellow-400" />,
              temp: "37/21",
            },
          ].map((d, i) => (
            <div key={i} className="flex justify-between items-center">
              <span>{d.day}</span>
              <span>{d.icon}</span>
              <span>{d.temp}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default WeatherDashboard;
