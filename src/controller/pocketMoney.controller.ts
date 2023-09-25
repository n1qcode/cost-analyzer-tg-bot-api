import { Request, Response } from "express";

import { db } from "../db";

export class PocketMoneyController {
  async getInfoOfPocketMoney(req: Request, res: Response) {
    try {
      const total = await db.query("SELECT * FROM pocket_money");
      res.json({
        payload: total.rows[0],
      });
    } catch (e) {
      res.json({
        error: `Error while getting info of pocket money. ${e}`,
      });
    }
  }
  async putMoneyToPocketMoney(req: Request, res: Response) {
    const { sum, currency } = req.body;
    try {
      const checkRowExist = await db.query("SELECT * FROM pocket_money");
      if (!checkRowExist.rowCount) {
        await db.query("INSERT INTO pocket_money DEFAULT VALUES");
      }
      const total = await db.query(
        `UPDATE pocket_money SET ${currency} = ${currency} + $1 RETURNING *`,
        [sum]
      );
      res.json({
        payload: total.rows[0],
      });
    } catch (e) {
      res.json({
        error: `Error while putting money to pocket money. ${e}`,
      });
    }
  }
  async takeMoneyFromPocketMoney(req: Request, res: Response) {
    const { sum, currency } = req.body;
    try {
      const existedCurrency = await db.query(
        `SELECT ${currency} from pocket_money`
      );
      const existedValue = Number(existedCurrency.rows[0][currency]);
      if (existedValue === 0 || existedValue - sum <= 0) {
        throw new Error("ZERO");
      }
      const total = await db.query(
        `UPDATE pocket_money SET ${currency} = ${currency} - $1 RETURNING *`,
        [sum]
      );
      res.json({
        payload: total.rows[0],
      });
    } catch (e) {
      res.json({
        error: `Error while taking money from pocket money. ${e}`,
      });
    }
  }
}

export default new PocketMoneyController();
