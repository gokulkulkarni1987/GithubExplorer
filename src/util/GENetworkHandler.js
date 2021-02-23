// @flow

'use strict';

import axios from 'axios';
import {API_BASE_PATH, NETWORK_TIME_OUT} from './NetworkConstants';

class NetworkHandler {
  constructor() {
    const instance = axios.create({
      baseURL: API_BASE_PATH,
      timeout: NETWORK_TIME_OUT,
    });
    // instance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.instance = instance;
  }

  handleSuccess = (response) => {
    return Promise.resolve(response);
  };

  handleError = (error) => {
    if (error.response && error.response.status) {
      const status = error.response.status;
      switch (status) {
        case 404: //Host unreachable
          break;
        case 502: //Bad Gateway
          break;
        case 500: // Service Failure
          break;
        case 503: //Service Unavailable
          break;
        default:
          break;
      }
    }
  };

  get = (path, header) => {
    return new Promise((resolve, reject) => {
      let options = {};
      if (header) {
        options.headers = header;
      }
      this.instance
        .get(path, options)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          this.handleError(error);
        });
    });
  };

  post = (path, body, header) => {
    return new Promise((resolve, reject) => {
      let options = {};
      if (header) {
        options.header = header;
      }
      this.instance
        .post(path, body, options)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          this.handleError(error);
        });
    });
  };

  put = (path, body, header) => {
    return new Promise((resolve, reject) => {
      let options = {};
      if (header) {
        options.headers = header;
      }
      this.instance
        .put(path, body, options)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          this.handleError(error);
        });
    });
  };

  delete = (path, body) => {
    return new Promise((resolve, reject) => {
      this.instance
        .delete(path, body)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          this.handleError(error);
        });
    });
  };
}

const requestHandler = new NetworkHandler();
export const GENetworkHandler = requestHandler;
