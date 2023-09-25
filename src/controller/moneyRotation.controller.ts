import { Request, Response } from "express";

import { db } from "../db";

export class MoneyRotationController {
  async fromMoneyBoxToPocketMoney(req: Request, res: Response) {
    const { sum, currency } = req.body;
    try {
      const checkRowExist = await db.query("SELECT * FROM pocket_money");
      if (!checkRowExist.rowCount) {
        await db.query("INSERT INTO pocket_money DEFAULT VALUES");
      }
      const totalMoneyBox = await db.query(
        `UPDATE money_box SET ${currency} = ${currency} - $1 RETURNING *`,
        [sum]
      );
      const totalPocketMoney = await db.query(
        `UPDATE pocket_money SET ${currency} = ${currency} + $1 RETURNING *`,
        [sum]
      );
      res.json({
        payload: {
          moneyBox: totalMoneyBox.rows[0],
          pocketMoney: totalPocketMoney.rows[0],
        },
      });
    } catch (e) {
      res.json({
        error: `Error while rotating money from money box to pocket money. ${e}`,
      });
    }
  }
  async fromPocketMoneyToMoneyBox(req: Request, res: Response) {
    const { sum, currency } = req.body;
    try {
      const checkRowExist = await db.query("SELECT * FROM money_box");
      if (!checkRowExist.rowCount) {
        await db.query("INSERT INTO money_box DEFAULT VALUES");
      }
      const totalPocketMoney = await db.query(
        `UPDATE pocket_money SET ${currency} = ${currency} - $1 RETURNING *`,
        [sum]
      );
      const totalMoneyBox = await db.query(
        `UPDATE money_box SET ${currency} = ${currency} + $1 RETURNING *`,
        [sum]
      );
      res.json({
        payload: {
          moneyBox: totalMoneyBox.rows[0],
          pocketMoney: totalPocketMoney.rows[0],
        },
      });
    } catch (e) {
      res.json({
        error: `Error while rotating money from pocket money to money box. ${e}`,
      });
    }
  }
}

export default new MoneyRotationController();
