import React from 'react';
import './Back.css'; 

const Circle = ({ temperature }) => {
  const getTemperatureColor = (temp) => {
    if (temp < 0) return 'blue';
    if (temp >= 0 && temp < 20) return 'green';
    if (temp >= 20 && temp < 30) return 'yellow';
    return 'red';
  };

  const temperatureColor = getTemperatureColor(temperature);

  return (
    <div className="weather-container">
      <div className="circle" style={{ backgroundColor: temperatureColor }} />
      <div className="temperature">{temperature}°</div>
    </div>
  );
};

export default Circle;
