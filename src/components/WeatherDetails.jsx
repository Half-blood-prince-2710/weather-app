import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Sunrise,
  Sunset,
  Compass,
  Gauge,
} from "lucide-react";
import { format } from "date-fns";




export function WeatherDetails({
  data,
}) {
  const { wind, main, sys } = data;

  // Format time using date-fns
  const formatTime = (
    timestamp
  ) => {
    return format(
      new Date(timestamp * 1000),
      "h:mm a"
    );
  };

  // Convert wind degree to direction
  const getWindDirection = (
    degree
  ) => {
    const directions = [
      "N",
      "NE",
      "E",
      "SE",
      "S",
      "SW",
      "W",
      "NW",
    ];
    const index =
      Math.round(
        ((degree %= 360) < 0
          ? degree + 360
          : degree) / 45
      ) % 8;
    return directions[index];
  };

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(
        wind.deg
      )} (${wind.deg}°)`,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
  ];

  return (
    <Card className='h-98 py-8'>
      <CardHeader>
        <CardTitle>
          Weather Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid gap-6 sm:grid-cols-2'>
          {details.map((detail) => (
            <div
              key={detail.title}
              className='flex items-center gap-3 rounded-lg border p-4'>
              <detail.icon
                className={`h-5 w-5 ${detail.color}`}
              />
              <div>
                <p className='text-sm font-medium leading-none'>
                  {detail.title}
                </p>
                <p className='text-sm text-muted-foreground'>
                  {detail.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
