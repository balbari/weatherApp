import React, { useState, useMemo } from "react";
import WeatherInfo from './WeatherInfo'
import SearchBar from './SearchBar'
import Back from './Back'
import { useWeather } from "./hooks/useWeather";
import { useForecast } from "./hooks/useForecast";
import { useCurrentLocation } from "./hooks/useCurrentLocation";
import './App.css'

const App = () => {
  const [unit, setUnit] = useState('C');
  const [city, setCity] = useState('');
  const location = useCurrentLocation();

  // const { data: currentWeather, error: weatherError, isLoading: weatherLoading } 
  // = useWeather({ lat: location.lat, lon: location.lon, city });

  // const { data: forecastData, error: forecastError, isLoading: forecastLoading } 
  // = useForecast({ lat: location.lat, lon: location.lon, city });

  const { data: currentWeather, error: weatherError, isLoading: weatherLoading } = useWeather({
    lat: typeof city === 'object' ? city.lat : location.lat,
    lon: typeof city === 'object' ? city.lon : location.lon,
    city: typeof city === 'string' ? city : undefined,
  });

  const { data: forecastData, error: forecastError, isLoading: forecastLoading } = useForecast({
    lat: typeof city === 'object' ? city.lat : location.lat,
    lon: typeof city === 'object' ? city.lon : location.lon,
    city: typeof city === 'string' ? city : undefined,
  });

  if (weatherLoading || forecastLoading) {
    return <div>Loading...</div>;
  }

  if (weatherError || forecastError) {
    return <div>Error: {weatherError ? weatherError.message : forecastError.message}</div>;
  }

  // const getGradientBackground = (temp, unit) => {
  //   const maxTempC = 40;
  //   const minTempC = -10;
  //   const maxTempF = 104;
  //   const minTempF = 14;

  //   const tempRange = unit === 'C' ? { min: minTempC, max: maxTempC } : { min: minTempF, max: maxTempF };
  //   const ratio = (temp - tempRange.min) / (tempRange.max - tempRange.min);
  //   const clampedRatio = Math.min(Math.max(ratio, 0), 1);

  //   const blueStart = { r: 100, g: 180, b: 255 };
  //   const lightBlueStart = { r: 180, g: 210, b: 255 };
  //   const yellowStart = { r: 246, g: 164, b: 81 };
  //   const redStart = { r: 255, g: 111, b: 97 };

  //   let r, g, b;
  //   if (clampedRatio < 0.5) {
  //     r = Math.round(lightBlueStart.r + (blueStart.r - lightBlueStart.r) * (clampedRatio * 2));
  //     g = Math.round(lightBlueStart.g + (blueStart.g - lightBlueStart.g) * (clampedRatio * 2));
  //     b = Math.round(lightBlueStart.b + (blueStart.b - lightBlueStart.b) * (clampedRatio * 2));
  //   } else {
  //     const ratio2 = (clampedRatio - 0.5) * 2;
  //     r = Math.round(yellowStart.r + (redStart.r - yellowStart.r) * ratio2);
  //     g = Math.round(yellowStart.g + (redStart.g - yellowStart.g) * ratio2);
  //     b = Math.round(yellowStart.b + (redStart.b - yellowStart.b) * ratio2);
  //   }

  //   return `rgb(${r}, ${g}, ${b})`;
  // };

  // const gradientStyle = useMemo(() => {
  //   if (currentWeather) {
  //     const temperature = unit === 'C' ? currentWeather.main.temp : (currentWeather.main.temp * 9 / 5) + 32;
  //     return getGradientBackground(temperature, unit);
  //   }
  //   return 'white'; // 기본 배경색
  // }, [currentWeather, unit]);

  return (
    <div className="main">
      {/* <Back/> */}
      <SearchBar setCity={setCity} />
      {currentWeather && (
        <WeatherInfo
          weather={currentWeather}
          forecast={forecastData}
          unit={unit}
          onToggleUnit={() => setUnit(unit === 'C' ? 'F' : 'C')}
        />
      )}
    </div>
  );
};

export default App;
