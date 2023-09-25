import { Request, Response } from "express";

import { db } from "../db";

export class MoneyBoxController {
  async getInfoOfMoneyBox(req: Request, res: Response) {
    try {
      const total = await db.query("SELECT * FROM money_box");
      res.json({
        payload: total.rows[0],
      });
    } catch (e) {
      res.json({
        error: `Error while getting info of money box. ${e}`,
      });
    }
  }
  async putMoneyToMoneyBox(req: Request, res: Response) {
    const { sum, currency } = req.body;
    try {
      const checkRowExist = await db.query("SELECT * FROM money_box");
      if (!checkRowExist.rowCount) {
        await db.query("INSERT INTO money_box DEFAULT VALUES");
      }
      const total = await db.query(
        `UPDATE money_box SET ${currency} = ${currency} + $1 RETURNING *`,
        [sum]
      );
      res.json({
        payload: total.rows[0],
      });
    } catch (e) {
      res.json({
        error: `Error while putting money to money box. ${e}`,
      });
    }
  }
  async takeMoneyFromMoneyBox(req: Request, res: Response) {
    const { sum, currency } = req.body;
    try {
      const existedCurrency = await db.query(
        `SELECT ${currency} from money_box`
      );
      const existedValue = Number(existedCurrency.rows[0][currency]);
      if (existedValue === 0 || existedValue - sum <= 0) {
        throw new Error("ZERO");
      }
      const total = await db.query(
        `UPDATE money_box SET ${currency} = ${currency} - $1 RETURNING *`,
        [sum]
      );
      res.json({
        payload: total.rows[0],
      });
    } catch (e) {
      res.json({
        error: `Error while taking money from money box. ${e}`,
      });
    }
  }
}

export default new MoneyBoxController();
