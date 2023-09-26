import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ModelClass } from 'objection';
import LogRequest from 'src/db/models/LogRequest';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject('LogRequest') private logRequest: ModelClass<LogRequest>,
  ) {}
  //LogRequest
  async use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    await this.logRequest.query().insert({
      url: originalUrl,
      body: req.body,
      method: method,
    });
    Logger.log(`${method} ${originalUrl}`, 'RequestLoggerMiddleware');
    next();
  }
}
