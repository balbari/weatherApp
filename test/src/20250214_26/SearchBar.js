import React, { useState } from 'react';
import { FiSearch } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { useCurrentLocation } from "./hooks/useCurrentLocation";

const SearchBar = ({ setCity }) => {
  const [inputCity, setInputCity] = useState('');
  const currentLocation = useCurrentLocation();

  const handleCitySubmit = () => {
    setCity(inputCity);
  };

  const enter = (e) => {
    if(e.key === 'Enter'){
      handleCitySubmit();
    }
  }
  const handleCurrentLocation = () => {
    if (currentLocation && currentLocation.lat && currentLocation.lon) {
      // 현재 위치의 위도와 경도를 setCity에 전달
      setCity({ lat: currentLocation.lat, lon: currentLocation.lon });
    }
  };

  return (
    <div className='search-bar'>
      <input 
        type="text" 
        value={inputCity} 
        onChange={(e) => setInputCity(e.target.value)} 
        onKeyDown={enter}
        placeholder="Enter city" 
      />
      <button onClick={handleCitySubmit} className='icon'>
        <FiSearch size="24px"/>
      </button>
      <button onClick={handleCurrentLocation} className='icon'>
        <CiLocationOn  size="24px"/>
      </button>
    </div>
  );
};

export default SearchBar;

