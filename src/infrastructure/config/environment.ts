import 'dotenv/config';

export type NodeEnv = 'development' | 'production' | 'testing';

export const env = {
  PORT: process?.env?.PORT || 3333,
  APP_SECRET: process.env?.APP_SECRET || 'a1b2c3d4e5f6',
  AWS_ACCESSKEY_ID: process.env?.AWS_ACCESSKEY_ID || '',
  AWS_ACCESSKEY_SECRET: process.env?.AWS_ACCESSKEY_SECRET || '',
};
