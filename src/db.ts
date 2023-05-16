import { Pool } from "pg";
import config from "config";

export const pool = new Pool({
  user: config.get("USER"),
  password: config.get("PASSWORD"),
  host: config.get("HOST"),
  port: config.get("PORT"),
  database: config.get("DATABASE"),
});
