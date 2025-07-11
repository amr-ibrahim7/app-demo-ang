import { HttpInterceptorFn } from '@angular/common/http';

export const langInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req.url);
  // show loader
  return next(req); //hide loader
};
