import { Request, Response } from "express";

import { db } from "../db";
import { SEASONS } from "../utils/constants";

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

      //transaction
      const date = new Date();
      const dateOptions = {
        timeZone: "Europe/Moscow",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      } as const;
      const transaction_date = date
        .toLocaleDateString("ru-RU", dateOptions)
        .split(".")
        .reverse()
        .join("-");
      const season = SEASONS[date.getMonth()];

      try {
        const checkTransactionExist = await db.query(
          "SELECT * FROM money_box_transactions WHERE transaction_date = $1  AND currency = $2 AND action = $3",
          [transaction_date, currency, "PUT"]
        );
        if (!checkTransactionExist.rowCount) {
          await db.query(
            "INSERT INTO money_box_transactions (transaction_date, season, currency, action) values ($1, $2, $3, $4)",
            [transaction_date, season, currency, "PUT"]
          );
        }
        await db.query(
          "UPDATE money_box_transactions SET sum = sum + $1 WHERE transaction_date = $2 AND currency = $3 AND action = $4",
          [sum, transaction_date, currency, "PUT"]
        );
      } catch (e) {
        console.log(
          `Error while updating transaction of putting money to money box. ${e}`
        );
      }
      //transaction

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

      //transaction
      const date = new Date();
      const dateOptions = {
        timeZone: "Europe/Moscow",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      } as const;
      const transaction_date = date
        .toLocaleDateString("ru-RU", dateOptions)
        .split(".")
        .reverse()
        .join("-");
      const season = SEASONS[date.getMonth()];

      try {
        const checkTransactionExist = await db.query(
          "SELECT * FROM money_box_transactions WHERE transaction_date = $1  AND currency = $2 AND action = $3",
          [transaction_date, currency, "TAKE"]
        );
        if (!checkTransactionExist.rowCount) {
          await db.query(
            "INSERT INTO money_box_transactions (transaction_date, season, currency, action) values ($1, $2, $3, $4)",
            [transaction_date, season, currency, "TAKE"]
          );
        }
        await db.query(
          "UPDATE money_box_transactions SET sum = sum + $1 WHERE transaction_date = $2 AND currency = $3 AND action = $4",
          [sum, transaction_date, currency, "TAKE"]
        );
      } catch (e) {
        console.log(
          `Error while updating transaction of putting money to money box. ${e}`
        );
      }
      //transaction

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
