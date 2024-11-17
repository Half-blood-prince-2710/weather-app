import React from 'react'
import { Card, CardContent } from './ui/card'
import {
  ArrowDown,
  ArrowUp,
  Droplets,
  Wind,
} from "lucide-react";

const CurrentWeather = ({ data, locationName }) => {
    const { state, name, country } = locationName
    const { temp, temp_max, temp_min, feels_like, humidity } = data.main
    const { speed } = data.wind
    const { icon,description } = data.weather[0]
    // console.log('cureent weather',icon,description)

    const newTemp = (t) =>
        `${Math.trunc(t)}°`;
    
  return (
    <Card className='overflow-hidden w-full lg:w-1/2 xl:w-2/5 2xl:w-1/3  py-2 px-6'>
      <CardContent>
        <div className='flex items-center justify-between py-6 gap-4 '>
          {/* //weather deatils */}
          <div className='flex flex-col gap-4 items-start bg-yellow-60'>
            {/* city name and state */}
            <div className='flex flex-col px-1 bg-green-60 pl-2'>
              <div className='flex items-end gap-1 '>
                <h1 className='text-4xl font-bold tracking-tight'>
                  {name}
                  <span className='text-muted-foreground text-sm'>
                    ,
                  </span>
                </h1>
                <p className='text-muted-foreground text-lg'>
                  {state}
                </p>
              </div>
              <span className='text-muted-foreground'>
                {country}
              </span>
            </div>
            {/* temperature and feel like */}
            <div className='flex items-start gap-2 bg-yellow-30 h-24'>
              <div className='text-8xl'>
                {newTemp(temp)}
              </div>
              <div className='text-muted-foreground tracking-tight pt-2'>
                <div>{`feels like ${newTemp(
                  feels_like
                )}`}</div>
                <div className='flex gap-2 text-sm font-medium'>
                  <span className='flex items-center gap-1 text-blue-500'>
                    <ArrowDown className='h-3 w-3' />
                    {newTemp(temp_min)}
                  </span>
                  <span className='flex items-center gap-1 text-red-500'>
                    <ArrowUp className='h-3 w-3' />
                    {newTemp(temp_max)}
                  </span>
                </div>
              </div>
            </div>
            {/* humidity and wind speed */}
            <div className='flex gap-6'>
              <div className='flex items-center gap-2'>
                <Droplets className='h-6 w-6 text-blue-500' />
                <div className='space-y-0.5'>
                  <p className='text-sm font-medium'>
                    Humidity
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {humidity}%
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Wind className='h-6 w-6 text-blue-500' />
                <div className='space-y-0.5'>
                  <p className='text-sm font-medium'>
                    Wind Speed
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {speed} m/s
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* //weather image and name */}
          <div className='flex flex-col  '>
            <div className='relative flex aspect-square w-full max-w-[240px] items-center justify-center'>
              <img
                src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                alt={
                  description
                }
                className='h-full w-full object-contain'
              />
              <div className='absolute bottom-0 text-center'>
                <p className='text-md font-medium capitalize'>
                  {
                    description
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CurrentWeather
