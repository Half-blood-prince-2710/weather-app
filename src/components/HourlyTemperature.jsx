import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

const HourlyTemperature = ({
  data,
}) => {
  const chartData = data.list
    .slice(0, 8)
    .map((item) => ({
      time: format(
        new Date(item.dt * 1000),
        "ha"
      ),
      temp: Math.round(item.main.temp),
      feels_like: Math.round(
        item.main.feels_like
      ),
    }));

  return (
    <Card className='flex-1 '>
      <CardHeader>
        <CardTitle>
          Today's Temperature
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='h-[250px] w-full'>
          <ResponsiveContainer className='h-full w-full'>
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}>
              <XAxis dataKey='time' />
              <YAxis />
              <Tooltip
                content={
                  <CustomTooltip />
                }
              />
              <Legend />
              <Line
                type='monotone'
                dataKey='temp'
                stroke='#8884d8'
                activeDot={{ r: 8 }}
              />
              <Line
                type='monotone'
                dataKey='feels_like'
                stroke='#82ca9d'
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
const CustomTooltip = ({
  active,
  payload,
}) => {
  if (
    active &&
    payload &&
    payload.length
  ) {
    return (
      <div className='rounded-lg border bg-background p-2 shadow-sm'>
        <div className='grid grid-cols-2 gap-2'>
          <div className='flex flex-col'>
            <span className='text-[0.70rem] uppercase text-muted-foreground'>
              Temperature
            </span>
            <span className='font-bold'>
              {payload[0].value}°
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-[0.70rem] uppercase text-muted-foreground'>
              Feels Like
            </span>
            <span className='font-bold'>
              {payload[1].value}°
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default HourlyTemperature;
