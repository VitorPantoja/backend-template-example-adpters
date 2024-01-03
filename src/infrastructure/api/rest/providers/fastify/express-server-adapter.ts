import express, { type Express } from 'express';

import CatchError from './middlewares/catch-error';
import Helmet from './middlewares/helmet';
import Cors from './middlewares/cors';
import RateLimit from './middlewares/rate-limite';
import { HttpServer } from '../../http-server';
import { Utils } from '../../utils';
import { HttpRoute } from '../../http-route';
import { ExpressRouteAdapter } from './express-route-adapter';
import http from 'http';

export class ExpressServerAdapter implements HttpServer<Express> {
  app: Express;
  private routeCounter?: number = 0;
  private readonly server: http.Server;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);

    new Helmet(this.app);
    new Cors(this.app);
    new CatchError(this.app);
    new RateLimit(this.app);
  }

  async listen(port: number): Promise<void> {
    try {
      this.app.listen(port, () => {
        Utils.TerminalLogger.log(`🚦 Rotas adicionadas: ${this.routeCounter}`);
        this.routeCounter = undefined;
      });

      Utils.TerminalLogger.log(`🚩 Ambiente: ${Utils.Environment.instance.env?.NODE_ENV}`);
    } catch (error) {
      Utils.TerminalLogger.log('❌ Erro ao iniciar a API', {
        level: 'ERROR',
        scope: 'MAIN',
      });
    }
  }

  async close() {
    if (this.server.listening) this.server.close();
  }

  async addRoute<Body, Params, Query>(route: HttpRoute<Body, Params, Query>): Promise<void> {
    this.app.use('/v1', ExpressRouteAdapter.execute(route));
    this.routeCounter = this.routeCounter ? this.routeCounter + 1 : 1;
  }
}
