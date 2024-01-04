import express, { Express } from 'express';
import rateLimit from 'express-rate-limit';
import { TooManyRequestError } from '../../../utils/http-exceptions';

export default class RateLimit {
  constructor(app: Express) {
    const limiter = rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minute
      max: 10,
      keyGenerator: request => {
        const { ip, originalUrl } = request;

        return `${originalUrl}-${ip}`;
      },
      handler: (_request, response, next) => {
        next(new TooManyRequestError('Calma ai paizão !'));
      },
    });

    // Aplicar o middleware rate-limit ao aplicativo Express
    app.use(limiter);
  }
}
