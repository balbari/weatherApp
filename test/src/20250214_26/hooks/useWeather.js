import { useQuery } from '@tanstack/react-query';

const fetchWeather = async (lat, lon, city) => {
  const apiKey = '4dd5efb839f3ff7b01a272b04ea157a1';
  const url = city
    ? `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const useWeather = ({ lat, lon, city }) => {
  return useQuery({
    queryKey: ['weather', { lat, lon, city }],
    queryFn: () => fetchWeather(lat, lon, city),
    enabled: !!city || (!!lat && !!lon), 
  });
};
