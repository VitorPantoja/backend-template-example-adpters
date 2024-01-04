import { Express, Request, Response, NextFunction } from 'express';
import { HttpResponse } from '../../../utils/http-response';
import { Utils } from '../../../utils';
import { InternalServerError } from '../../../utils/http-exceptions';

export default class CatchError {
  constructor(app: Express) {
    app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
      const httpResponse = HttpResponse.error(error);

      if (httpResponse.statusCode >= InternalServerError.code) {
        Utils.TerminalLogger.log(
          `[${InternalServerError.code}] ${request.method.toUpperCase()} ${request.path}`,
          {
            scope: 'API',
            level: 'ERROR',
          },
          `Route: ${request.originalUrl}`,
          `\nRequest: ${JSON.stringify({
            body: request.body,
            params: request.params,
            query: request.query,
            headers: request.headers,
          })}`,
          `\nStack: ${error.stack}`,
        );
      }

      response.status(httpResponse.statusCode).json(httpResponse);
    });
  }
}
