import { ModuleWithProviders } from '@angular/core';
import { Routes } from '@angular/router';


export interface IPagedResults<T> {
    totalRecords: number;
    results: T;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IApiResponse {
    status: boolean;
    error?: string;
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
  images: string;
}


export interface NewPost {
  title: string;
  content: string;
  images: string;
}

export interface Posts {
  count: number;
  posts: IPost[];
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

export interface Status {
  status: boolean;
}

