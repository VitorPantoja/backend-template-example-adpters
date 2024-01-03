declare namespace NodeJS {
  interface ProcessEnv extends Dict<string | string> {
    NODE_ENV: 'development' | 'production' | 'test';
    API_HOST: string;
    PORT: number;
  }
}
