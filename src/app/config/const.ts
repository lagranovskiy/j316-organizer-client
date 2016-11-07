import {AppConfig} from "./app.config";
import {OpaqueToken} from "@angular/core";

export const J316_CONFIG: AppConfig = {
  apiEndpoint: 'http://localhost:4200/api',
  mapsAPI: 'AIzaSyDxEGs76p175F19pK8Vf_rEzsJaP_BKoes'
};

export const APP_CONFIG = new OpaqueToken('config');
