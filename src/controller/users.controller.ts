import { Request, Response } from "express";

import { db } from "../db";

export class UsersController {
  async getLastUsersPlaces(req: Request, res: Response) {
    try {
      const response = await db.query("SELECT user_id, last_place FROM users");
      res.json({
        payload: response.rows,
      });
    } catch (e) {
      res.json({
        error: `Error while getting last users places. ${e}`,
      });
    }
  }
  async getUsersCurrencies(req: Request, res: Response) {
    try {
      const response = await db.query(
        "SELECT user_id, last_place, currency FROM users"
      );
      res.json({
        payload: response.rows,
      });
    } catch (e) {
      res.json({
        error: `Error while getting users currencies. ${e}`,
      });
    }
  }
  async setUserFinanceInfo(req: Request, res: Response) {
    const { userId, lastPlace, currency } = req.body;
    try {
      await db.query(
        "UPDATE users SET last_place = $2, currency = $3  WHERE user_id = $1",
        [userId, lastPlace, currency]
      );
      res.json({
        payload: null,
      });
    } catch (e) {
      res.json({
        error: `Error while setting user place. ${e}`,
      });
    }
  }
  async setLastUserPlace(req: Request, res: Response) {
    const { userId, lastPlace } = req.body;
    try {
      await db.query("UPDATE users SET last_place = $2 WHERE user_id = $1", [
        userId,
        lastPlace,
      ]);
      res.json({
        payload: null,
      });
    } catch (e) {
      res.json({
        error: `Error while setting user place. ${e}`,
      });
    }
  }
  async setUserCurrency(req: Request, res: Response) {
    const { userId, currency } = req.body;
    try {
      await db.query("UPDATE users SET currency = $2 WHERE user_id = $1", [
        userId,
        currency,
      ]);
      res.json({
        payload: null,
      });
    } catch (e) {
      res.json({
        error: `Error while setting user currency. ${e}`,
      });
    }
  }
}

export default new UsersController();
