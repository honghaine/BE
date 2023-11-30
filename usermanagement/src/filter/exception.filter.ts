// exception.filter.ts

import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any>  {
    // const ctx = host.switchToHttp();
    // const response = ctx.getRequest();

    const ctx = host.switchToRpc();
    const response = ctx.getContext();
    const rpcError = exception.getError();

    return throwError(() => exception.getError());
  }
}
