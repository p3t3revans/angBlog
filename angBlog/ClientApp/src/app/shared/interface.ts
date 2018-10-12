import { ModuleWithProviders } from '@angular/core';
import { Routes } from '@angular/router';

export interface Forecast {
  date: string;
  tempC: number;
  summary: string;
}
export interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

export interface WeatherForecasts {
  count: number;
  forecasts: WeatherForecast[];
}
