import queryStringify from "./queryStringify";

const METHODS: Record<string, string> = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE"
};

export class HTTPTransport  {
  get = (url: string, options: any = {}) => {
    return this.request(url, {...options, method: METHODS.GET}, options.timeout);
  };

  post = (url: string, options: any = {}) => {
    return this.request(url, {...options, method: METHODS.POST}, options.timeout);
  };

  put = (url: string, options: any = {}) => {
    return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
  };

  delete = (url: string, options: any = {}) => {
    return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
  };

  request = (url:string = 'localhost', options: any = { method: METHODS.GET }, timeout: number = 5000) => {
  const {method, data} = options;

    return new Promise((resolve, rejects) => {
      const xhr: XMLHttpRequest = new XMLHttpRequest();

      if (method === METHODS.GET) {
          xhr.open(method, url + queryStringify(data));
      } else {
          xhr.open(method, url);
      };

      xhr.timeout = timeout;

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.ontimeout = rejects;
      xhr.onabort = rejects;
      xhr.onerror = rejects;

      if (method === METHODS.GET) {
        console.log (queryStringify(data));
        xhr.send();
      } else {
        xhr.send(data);
      };
    });
  };
};

async function fetchWithRetry(url: string, options: any) {
  let retries = options.retries;
  let response;

  while(retries > 0) {
    try {
      response = await (new HTTPTransport()).get(url);
      return response;
    } catch(e) {
      console.error(`retry number ${options.retries - retries + 1} failed`);
    };
    retries--;
    if (retries <= 0) {
      throw new Error("error");
    };
  };
};
