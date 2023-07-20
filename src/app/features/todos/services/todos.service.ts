import { Injectable } from '@angular/core';
import { HttpClient } from '@forgerock/javascript-sdk';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor() { }

  /**
   * Send a request to retrieve all Todos for the current user
   * @returns Promise - Response from the GET request
   */
  getTodos(): Promise<Response> {
    return this.request(`${environment.API_URL}/todos`, 'GET');
  }

  /**
   * Send a request using the ForgeRock JS SDK Http Client
   * @param resource - The url for the request
   * @param method - The method for the request
   * @param data - The body for the request
   * @returns Response from the request
   */
  request(resource: string, method: string, data?: any): Promise<Response> {
    /** ***********************************************************************
     * SDK INTEGRATION POINT
     * Summary: HttpClient for protected resource server requests.
     * ------------------------------------------------------------------------
     * Details: This helper retrieves your access token from storage and adds
     * it to the authorization header as a bearer token for making HTTP
     * requests to protected resource APIs. It's a wrapper around the native
     * fetch method.
     *********************************************************************** */
    return HttpClient.request({
      url: resource,
      init: {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        method: method,
      },
      timeout: 5000,
    });
  }
}
