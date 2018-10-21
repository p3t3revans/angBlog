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
export interface NewPost {
  title: string;
  content: string;
}

export interface Posts {
  count: number;
  posts: IPost[];
}
export interface IPost {
  _id: string;
  author: string;
  title: string;
  content: string;
  tags: string[];
  createDate: Date;
  comments: IComment[];
  likes: number;
  dislikes: number;
}

export interface IComment {
  commentDate: Date;
  createUser: string;
  text: string;
  likes: number;
  dislikes: number;
}

export interface ICom {
  id: string;
  comment: string;
}

export interface LikeComment {
  id: string;
  index: number;
}

