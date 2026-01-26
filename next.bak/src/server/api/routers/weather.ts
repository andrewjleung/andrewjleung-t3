import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const WEATHER_ENDPOINT =
  "https://api.open-meteo.com/v1/forecast?latitude=32.7378&longitude=-97.3631&current=temperature_2m,is_day,precipitation,rain,showers,snowfall,cloud_cover,wind_speed_10m&hourly=wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&forecast_days=1";

const WeatherResponse = z.object({
  current: z.object({
    time: z.coerce.date(),
    temperature_2m: z.number(),
    is_day: z
      .number()
      .int()
      .gte(0)
      .lte(1)
      .transform((val) => val === 1),
    precipitation: z.number(),
    rain: z.number(),
    showers: z.number(),
    snowfall: z.number(),
    cloud_cover: z.number(),
    wind_speed_10m: z.number(),
  }),
});

type WeatherResponse = z.infer<typeof WeatherResponse>;

export const weatherRouter = createTRPCRouter({
  getCurrentWeather: publicProcedure.query(async () => {
    const currentWeather = await fetch(WEATHER_ENDPOINT)
      .then((res) => res.json())
      .then((res) => WeatherResponse.parse(res).current);

    // TODO: Refine these.
    const adjectivesAndConditions: [string, boolean][] = [
      ["snowy", currentWeather.snowfall > 0],
      ["rainy", currentWeather.rain >= 0.01],
      ["windy", currentWeather.wind_speed_10m > 20],
      ["cloudy", currentWeather.cloud_cover > 45],
      ["sunny", currentWeather.is_day],
      ["peaceful", !currentWeather.is_day],
    ];

    const result = adjectivesAndConditions.find(([_, condition]) => condition);

    if (result === undefined) {
      return undefined;
    }

    return result[0];
  }),
});
