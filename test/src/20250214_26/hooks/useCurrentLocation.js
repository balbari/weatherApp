import { useEffect, useState } from 'react';

export const useCurrentLocation = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    }
  }, []);

  return location;
};

