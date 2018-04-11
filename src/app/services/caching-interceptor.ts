import { Injectable, Input } from '@angular/core';
import { Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { Observable } from "rxjs/Rx"
import { HttpInterceptor } from '@angular/common/http';

// @Injectable()
// export class CachingInterceptor implements HttpInterceptor {
//   constructor(private cache: RequestCache) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     // continue if not cachable.
//     if (!isCachable(req)) { return next.handle(req); }

//     const cachedResponse = this.cache.get(req);
//     return cachedResponse ?
//       of(cachedResponse) : sendRequest(req, next, this.cache);
//   }
// }