import { HttpRouter } from './http-router';
import { ExpressServerAdapter } from './providers/express/express-server-adapter';

const httpServer = new ExpressServerAdapter();
const httpRouter = new HttpRouter(httpServer);

export { httpRouter, httpServer };
