import { Pool } from "pg";
import config from "config";

export const db = new Pool({
  user: config.get("USER"),
  password: config.get("PASSWORD"),
  host: config.get("HOST"),
  port: config.get("DB_PORT"),
  database: config.get("DATABASE"),
});
