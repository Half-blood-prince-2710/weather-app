import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/useGeolocation";
import { RefreshCcw } from "lucide-react";
import React, {
  useEffect,
  useState,
} from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../components/ui/alert";
import {
  MapPin,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/useWeatherQuery";
import WeatherSkeleton from "@/components/WeatherSkeleton";
import CurrentWeather from "@/components/CurrentWeather";
import { WeatherDetails } from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import { Skeleton } from "@/components/ui/skeleton";
import HourlyTemperature from "@/components/HourlyTemperature";

const LocationErrorAlert = ({
  error,
  onRetry,
}) => (
  <Alert variant='destructive'>
    <AlertTriangle className='h-4 w-4' />
    <AlertTitle>
      Location Error
    </AlertTitle>
    <AlertDescription className='flex flex-col gap-4'>
      <p>{error}</p>
      <Button
        variant='outline'
        onClick={onRetry}
        className='w-fit'>
        <MapPin className='mr-2 h-4 w-4' />
        Enable Location
      </Button>
    </AlertDescription>
  </Alert>
);

const NoLocationAlert = ({
  onEnableLocation,
}) => (
  <Alert>
    <MapPin className='h-4 w-4' />
    <AlertTitle>
      Location Required
    </AlertTitle>
    <AlertDescription className='flex flex-col gap-4'>
      <p>
        Please enable location access to
        see your local weather.
      </p>
      <Button
        variant='outline'
        onClick={onEnableLocation}
        className='w-fit'>
        <MapPin className='mr-2 h-4 w-4' />
        Enable Location
      </Button>
    </AlertDescription>
  </Alert>
);

const Home = () => {
  const {
    loading,
    error,
    getLocation,
    locationData,
  } = useGeolocation();
  const [coords, setCoords] =
    useState(null);

  useEffect(() => {
    if (locationData) {
      setCoords({
        lat: locationData.lat,
        lon: locationData.lon,
      });
    }
  }, [locationData]);

  const weatherQuery =
    useWeatherQuery(coords);
  const forecastQuery =
    useForecastQuery(coords);
  const locationQuery =
    useReverseGeocodeQuery(coords);

  const handleRefresh = async () => {
    await getLocation();
  };

  if (loading || !locationData) {
    return <WeatherSkeleton />;
  }

  if (error) {
    return (
      <LocationErrorAlert
        error={error}
        onRetry={getLocation}
      />
    );
  }

  if (!locationData) {
    return (
      <NoLocationAlert
        onEnableLocation={getLocation}
      />
    );
  }

  if (
    weatherQuery.error ||
    forecastQuery.error
  ) {
    return (
      <Alert variant='destructive'>
        <AlertTriangle className='h-4 w-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>
            Failed to fetch weather
            data. Please try again.
          </p>
          <Button
            variant='outline'
            onClick={handleRefresh}
            className='w-fit'>
            <RefreshCw className='mr-2 h-4 w-4' />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (
    !weatherQuery.data ||
    !forecastQuery.data
  ) {
    return <WeatherSkeleton />;
  }

  const locationName =
    locationQuery.data?.[0];
  return (
  <>
    { coords ?(
    <div className='flex flex-col gap-10  min-h-screen'>
      {/* <FavoriteCities/> */}

      <div className='flex justify-between items-center h-full '>
        <h1 className='text-xl font-bold tracking-tight'>
          My Location
        </h1>
        <Button
          variant='outline'
          size='icon'
          onClick={handleRefresh}
          disabled={
            weatherQuery.isFetching ||
            forecastQuery.isFetching
          }>
          <RefreshCw
            className={`h-4 w-4 ${
              weatherQuery.isFetching
                ? "animate-spin"
                : ""
            }`}
          />
        </Button>
      </div>

      <div className='flex flex-col  w-full gap-6 '>
        <div className='flex flex-col lg:flex-row  gap-6 '>
          <CurrentWeather
            data={weatherQuery.data}
            locationName={locationName}
          />
          <HourlyTemperature
            data={forecastQuery.data}
          />
        </div>

        <div className='grid gap-6 md:grid-cols-2 items-start'>
          <WeatherDetails
            data={weatherQuery.data}
          />
          <WeatherForecast
            data={forecastQuery.data}
          />
        </div>
      </div>
    </div >
          ):
        <Skeleton />}
      </>
  );
};

export default Home;
