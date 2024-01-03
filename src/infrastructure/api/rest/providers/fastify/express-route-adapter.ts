import { RequestHandler, Express } from 'express';
import { HttpRequestType, HttpRoute } from '../../http-route';
import { LoggerLevel } from '../../utils/helper/terminal-logger';
import { Utils } from '../../utils';

export class ExpressRouteAdapter {
  static execute<Body, Params, Query>(route: HttpRoute<Body, Params, Query>): RequestHandler {
    return async (request, reply) => {
      const routeRequest: HttpRequestType<Body, Params, Query> = {
        headers: request.headers,
        body: request.body as Body,
        params: request.params as Params,
        query: request.query as Query,
        method: request.method,
        url: request.url,
      };

      try {
        const data = await route.handle(routeRequest, {
          send: data => {
            let level: LoggerLevel;

            if (data.statusCode >= 400 && data.statusCode < 500) {
              level = 'WARN';
            } else if (data.statusCode >= 500) {
              level = 'ERROR';
            } else if (data.statusCode >= 200 && data.statusCode < 300) {
              level = 'SUCCESS';
            } else {
              level = 'DEBUG';
            }

            Utils.TerminalLogger.log(
              `[${data.statusCode}] ${route.method.toUpperCase()} ${route.path}`,
              {
                level,
                scope: 'HTTP',
              },
              JSON.stringify(routeRequest),
            );

            reply.status(data.statusCode).send(data);
          },
        });
      } catch (error) {
        // Tratar erros aqui, se necessário
        console.error(error);
        reply.status(500).send({ error: 'Aconteceu uma baguncinha no backend.' });
      }
    };
  }
}
