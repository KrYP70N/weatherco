import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateData } from '../../redux/general';
import { useEffect } from 'react';

// Define the correct return type for the custom hook

export interface WeatherLocation {
  name: string;
  country: string;
  lat: number;
  lon: number;
  localtime: string;
  tz_id: string;
}

export interface WeatherCondition {
  text: string;
  icon: string;
}

export interface WeatherStatus {
  temp_c: number;
  condition: WeatherCondition;
  wind_mph: number;
  pressure_mb: number;
  uv: number;
}

export interface WeatherAstro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: number;
  is_moon_up: number;
  is_sun_up: number;
}

export type LocationData = {
  location: WeatherLocation;
  current: WeatherStatus;
  forecast: {
    forecastday: {
      astro: WeatherAstro;
      hour: WeatherStatus[];
    }[];
  };
};

export interface LocationAPIError {
  error: true;
  message: string;
}

// Ensure the Location interface matches the expected shape
export interface Location {
  lat: number;
  lon: number;
}

// Function to get the current geolocation as a promise
const getCurrentLocation = (): Promise<LocationAPIError | Location> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject({error: true, message: "Geolocation is not supported by this browser."});
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        resolve({error: true, message: "Failed to retrieve location. Please enable location services."});
      }
    );
  });
};

// Fetch data function
const fetchData = async (query: string): Promise<LocationData | LocationAPIError> => {
  try {
    if (query === "") {
      const locationResult = await getCurrentLocation();

      if ('error' in locationResult) {
        // If there's an error from getCurrentLocation, return it
        return locationResult;
      }

      const { lat, lon } = locationResult;
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
        params: {
          key: 'd59e5acbcfaa4ca594694003240709',
          q: `${lat},${lon}`
        }
      });
      return response.data as LocationData;
    } else {
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
        params: {
          key: 'd59e5acbcfaa4ca594694003240709',
          q: query
        }
      });
      return response.data as LocationData;
    }
  } catch (error) {
    return {error: true, message: error instanceof Error ? error.message : 'An unknown error occurred'};
  }
};

type UseForecast = {
  data?: LocationData | LocationAPIError;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const useForecast = (): UseForecast => {
  const locationName = useSelector((state: RootState) => state.general.name);
  const dispatch = useDispatch();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["forecast", locationName], // Updated queryKey to include locationName
    queryFn: () => {
      return fetchData(locationName)
    }
  });

  useEffect(() => {
    dispatch(updateData(data as LocationData))
  }, [data])

  return { data, isLoading, isError, error };
};
