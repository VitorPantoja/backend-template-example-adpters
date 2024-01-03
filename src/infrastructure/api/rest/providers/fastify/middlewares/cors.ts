import express, { Express } from 'express';
import cors from 'cors';

export default class Cors {
  constructor(app: Express) {
    app.use(cors());
  }
}
