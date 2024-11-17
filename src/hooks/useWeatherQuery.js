import  WeatherAPI  from "@/api/weather"
import { useQuery } from "@tanstack/react-query"

export const WEATHER_KEYS = {
  weather: (coords) => [
    "weather",
    coords,
  ],
  forecast: (coords) => [
    "forecast",
    coords,
  ],
  location: (coords) => [
    "location",
    coords,
  ],
  search: (query) => [
    "location-search",
    query,
  ],
};


export function useWeatherQuery(coords) {
  // console.log('enter getCurrentWeather coords: ',coords)//enter getCurrentWeather coords:  {lat: 28.6542, lon: 77.2373}
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coords ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coords ? 
        WeatherAPI.getCurrentWeather(coords) :null,
        enabled: !!coords,
    })
} 

export function useForecastQuery(
  coords
) {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(
      coords ?? { lat: 0, lon: 0 }
    ),
    queryFn:() =>
      coords ?
      WeatherAPI.getForecast(
        coords
      ):null,
    enabled: !!coords,
  });
} 
export function useReverseGeocodeQuery(
  coords
) {
  return useQuery({
    queryKey: WEATHER_KEYS.location(
      coords ?? { lat: 0, lon: 0 }
    ),
    queryFn:() =>
      coords ?
      WeatherAPI.reverseGeocode(
        coords
      ):null,
    enabled: !!coords,
  });
} 
export function useLocationSearch(
  query
) {
  return useQuery({
    queryKey: WEATHER_KEYS.search(
      query
    ),
    queryFn:() =>
      
      WeatherAPI.searchLocations(query),
    enabled: query.length>3,
  });
} 