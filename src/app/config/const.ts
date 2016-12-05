import {AppConfig} from "./app.config";
import {OpaqueToken} from "@angular/core";
import {environment} from "../../environments";

export const J316_CONFIG: AppConfig = {
  mapsAPI: environment.mapsAPI,
  authAPI: environment.authAPI,
  production: environment.production
};

export const APP_CONFIG = new OpaqueToken('config');
