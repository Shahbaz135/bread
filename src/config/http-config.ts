import { environment } from '../environments/environment';

export class HttpConfig {
  static readonly API_URL = '/api/v1';

  static getApiUrl() {
    return environment.url + this.API_URL + '/auth';
  }
}
