import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import axios from "axios";
import {environment} from "./environments/environment.development";
import {AppComponent} from "./app/views/app/app.component";

axios.defaults.baseURL = environment.apiUrl

axios.interceptors.request.use(function (config) {
  config.headers['X-Binarybox-Api-Key'] = environment.apiKey
  return config;
});

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
