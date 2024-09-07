import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateLocation } from '../redux/general';

export interface Location {
  lat: number;
  lon: number;
}

interface LocationError {
  code: number;
  message: string;
}

type UseLocation = [Location | null, LocationError | null, boolean];

const useLocation = (): UseLocation => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<LocationError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError({ code: 0, message: 'Geolocation is not supported by your browser' });
      setLoading(false);
      return;
    }

    const onSuccess = (position: GeolocationPosition) => {
      const location = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      }
      setLocation(location);
      setLoading(false);
      dispatch(updateLocation(location));
    };

    const onError = (error: GeolocationPositionError) => {
      setError({ code: error.code, message: error.message });
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return [location, error, loading];
};

export default useLocation;
