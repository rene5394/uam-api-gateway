import { CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException} from '@nestjs/common'
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeOutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>)
  : Observable<any> | Promise<Observable<any>> {
    console.log('This is an interceptor if TIMEOUT SS');
    
    return next.handle().pipe(
      timeout(30000),
      catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      })
    );
  };
}