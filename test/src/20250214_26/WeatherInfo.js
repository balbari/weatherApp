import React from 'react';
import { CiLocationOn } from "react-icons/ci";
import './WeatherInfo.css'

function WeatherInfo({ weather, forecast, unit, onToggleUnit }) {
  if (!weather) return null;

  const temperature = unit === 'C' ? weather.main.temp : (weather.main.temp * 9 / 5) + 32;
  const { name, main, wind } = weather;

  // const weatherConditions = {
  //   'Clear': { icon: './01d.png', description: '맑음' },
  //   'Clouds': { icon: './03d-1.png', description: '구름 많음' },
  //   'scattered clouds':{icon:'./03d-1.png', description: '구름 많음'},
  //   'Rain': { icon: './03d.png', description: '비' },
  //   'Snow': { icon: './04d.png', description: '눈' },
  //   'Drizzle': { icon: './05d.png', description: '이슬비' },
  //   'Thunderstorm': { icon: './06d.png', description: '천둥 번개' },
  // };
  // const weatherCondition = weatherConditions[weather.weather[0].main] || { icon: null, description: '정보 없음' };

  // const iconCode = weather.weather[0].icon;
  // const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
  // const weatherDescription = weather.weather[0].description || '정보 없음';

  const weatherCondition = weather.weather[0].main;
  const iconCode = weather.weather[0].icon;

  // API 아이콘 코드와 로컬 이미지 경로 매핑
  const getIcon = (iconCode) => {
    return `/weather-icons/${iconCode}.png`; 
  };

  const dailyForecast = forecast.list.reduce((acc, item) => {
    const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const date = new Date(item.dt * 1000).toLocaleDateString(undefined, dateOptions).replace(/\./g, '');
    const hour = new Date(item.dt * 1000).getHours();

    if (!acc[date]) {
      acc[date] = { morning: null, afternoon: null };
    }

    if (hour === 6 && acc[date].morning === null) {
      acc[date].morning = item.main.temp;
    }

    if (hour === 15 && acc[date].afternoon === null) {
      acc[date].afternoon = item.main.temp;
    }

    return acc;
  }, {});

  const getGradientBackground = (temp, unit) => {
    const maxTempC = 40;
    const minTempC = -10;
    const maxTempF = 104;
    const minTempF = 14;

    const tempRange = unit === 'C' ? { min: minTempC, max: maxTempC } : { min: minTempF, max: maxTempF };
    const ratio = (temp - tempRange.min) / (tempRange.max - tempRange.min);
    const clampedRatio = Math.min(Math.max(ratio, 0), 1)

    const blueStart = { r: 100, g: 180, b: 255 };  // #64b4ff
    const lightBlueStart = { r: 180, g: 210, b: 255 };
    const yellowStart = { r: 246, g: 164, b: 81 }; // #f6a451
    const redStart = { r: 255, g: 111, b: 97 };     // #ff6f61

    let r, g, b;

    if (clampedRatio < 0.5) {
      r = Math.round(lightBlueStart.r + (blueStart.r - lightBlueStart.r) * (clampedRatio * 2));
      g = Math.round(lightBlueStart.g + (blueStart.g - lightBlueStart.g) * (clampedRatio * 2));
      b = Math.round(lightBlueStart.b + (blueStart.b - lightBlueStart.b) * (clampedRatio * 2));
    } else {
      const ratio2 = (clampedRatio - 0.5) * 2;
      r = Math.round(yellowStart.r + (redStart.r - yellowStart.r) * ratio2);
      g = Math.round(yellowStart.g + (redStart.g - yellowStart.g) * ratio2);
      b = Math.round(yellowStart.b + (redStart.b - yellowStart.b) * ratio2);
    }

    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className='w_contents'>
      <div className='today'>
        <h2><CiLocationOn />{name}</h2>
        <div className='temperature'>
          <div className='g_circle' style={{ background: getGradientBackground(temperature, unit) }}></div>
          <div className='t_circle'>
            <img className='icon' src={getIcon(iconCode)} alt={weather.weather[0].description} />
            <p className='temp'>{temperature.toFixed(0)}° {unit}</p>
          </div>
        </div>
        <div className='w_info'>
          <p>날씨 상태 : {weather.weather[0].description}</p>
          <p>습도 : {main.humidity}%</p>
          <p>풍속 : {wind.speed} m/s</p>
        </div>
        <button onClick={onToggleUnit} className='toggle'>
          {unit === 'C' ? '화씨로 보기' : '섭씨로 보기'}
        </button>
      </div>

      <h3>5일 예보</h3>
      <div className='f_days'>
        {Object.entries(dailyForecast).map(([date, { morning, afternoon }]) => (
          <div key={date} className='f_card'>
            <div className='days'>
              <p>{date}</p>
              <img className='i_days' src={getIcon(iconCode)} alt={weather.weather[0].description} />
              <div className='f_temp'>
                <span className='mo'>{morning !== null ? (unit === 'C' ? morning.toFixed(0) : ((morning * 9 / 5) + 32).toFixed(0)) + '° ' + unit : 'N/A'}</span>
                <span className='af'>{afternoon !== null ? (unit === 'C' ? afternoon.toFixed(0) : ((afternoon * 9 / 5) + 32).toFixed(0)) + '° ' + unit : 'N/A'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherInfo;

