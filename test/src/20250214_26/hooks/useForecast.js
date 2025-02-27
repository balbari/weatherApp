import { useQuery } from '@tanstack/react-query';

const fetchForecast = async (lat, lon, city) => {
  const apiKey = '4dd5efb839f3ff7b01a272b04ea157a1';

  if (city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  }

  if (lat && lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  }

  throw new Error('No valid location provided');
};

export const useForecast = ({ lat, lon, city }) => {
  return useQuery({
    queryKey: ['forecast', { lat, lon, city }],
    queryFn: () => fetchForecast(lat, lon, city),
    enabled: !!city || (!!lat && !!lon),
  });
};
