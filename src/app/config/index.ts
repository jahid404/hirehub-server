import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL,
  jwt: {
    access_secret: process.env.JWT_ACCESS_SECRET || 'hirehub_super_secret_access_token_key_12345',
    access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || '1d',
    refresh_secret: process.env.JWT_REFRESH_SECRET || 'hirehub_super_secret_refresh_token_key_12345',
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || '365d',
  },
  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 12,
};
