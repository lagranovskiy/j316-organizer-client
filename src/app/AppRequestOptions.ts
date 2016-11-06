import {BaseRequestOptions, RequestOptionsArgs, RequestOptions} from "@angular/http";
import {Injectable, Inject} from "@angular/core";
import {AppConfig} from "./app-config";
import {APP_CONFIG} from "./app.module";

@Injectable()
export class AppRequestOptions extends BaseRequestOptions {

  constructor(@Inject(APP_CONFIG) private config: AppConfig ) {
    super();
  }

  merge(options?: RequestOptionsArgs): RequestOptions {
    options.url = this.config.apiEndpoint + options.url;

    /**
     * http://restlet.com/blog/2016/04/12/interacting-efficiently-with-a-restful-service-with-angular2-and-rxjs-part-2/

     if (options.method === 'put' ||
     options.method === 'post' ||
     options.method === 'patch') {
      let headers = options.headers | {};
      headers['Content-Type'] = 'application/json';
      options.headers = headers;
    }*/

    return super.merge(options);
  }
}
