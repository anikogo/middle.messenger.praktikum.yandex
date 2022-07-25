import queryStringify from "../utils/queryStringify";

const METHODS: Record<string, string> = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE"
};

export class HTTPTransport  {
  get = (url: string, options: any = {}): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  post = (url: string, options: any = {}): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  put = (url: string, options: any = {}): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  delete = (url: string, options: any = {}): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request = (url: string = "localhost", options: any = { method: METHODS.GET }, timeout: number = 5000): Promise<XMLHttpRequest>  => {
  const { method, data } = options;

    return new Promise((resolve, rejects) => {
      const xhr: XMLHttpRequest = new XMLHttpRequest();

      if (method === METHODS.GET && data) {
          xhr.open(method, url + queryStringify(data));
      } else {
          xhr.open(method, url);
      }

      xhr.timeout = timeout;

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.ontimeout = rejects;
      xhr.onabort = rejects;
      xhr.onerror = rejects;

      xhr.setRequestHeader("content-type", "application/json");
      xhr.withCredentials = true;

      if (method === METHODS.GET) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
