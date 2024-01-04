import express, { Express } from 'express';
import helmet from 'helmet';

export default class Helmet {
  constructor(app: Express) {
    app.use(helmet());
  }
}
