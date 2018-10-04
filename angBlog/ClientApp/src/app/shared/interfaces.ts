import { ModuleWithProviders } from '@angular/core';
import { Routes } from '@angular/router';

export interface Forecast {
  date: string;
  tempC: number;
  summary: string;
}
