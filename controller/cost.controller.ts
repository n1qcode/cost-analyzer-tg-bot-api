import { Request, Response } from "express";

import { db } from "../src/db";

export class CostController {
  async createCostCategory(req: Request, res: Response) {
    const { cost_category, translation } = req.body;
    try {
      await db.query(
        `ALTER TABLE cost
            ADD COLUMN IF NOT EXISTS ${cost_category} NUMERIC(10, 2) NOT NULL DEFAULT 0.00`
      );
      await db.query(
        `ALTER TABLE translation
            ADD COLUMN IF NOT EXISTS ${cost_category} TEXT NOT NULL DEFAULT '${translation}'`
      );
      const checkTranslationExist = await db.query("SELECT * FROM translation");
      if (!checkTranslationExist.rowCount) {
        await db.query(
          `INSERT INTO translation (${cost_category}) values ($1) RETURNING *`,
          [translation]
        );
      }
      res.json({
        payload: `Successfully created new cost category: ${cost_category}`,
      });
    } catch (e) {
      res.json({
        isError: true,
        payload: `Error while creating new cost category: ${cost_category}. ${e}`,
      });
    }
  }
  async addToCostCategory(req: Request, res: Response) {
    const { cost_category, cost_amount } = req.body;

    const seasons = [
      "winter",
      "winter",
      "spring",
      "spring",
      "spring",
      "summer",
      "summer",
      "summer",
      "autumn",
      "autumn",
      "autumn",
      "winter",
    ];

    const date = new Date();
    const cost_date = date.toISOString().split("T")[0];
    const season = seasons[date.getMonth()];

    try {
      const checkCostExist = await db.query(
        "SELECT * FROM cost WHERE cost_date = $1",
        [cost_date]
      );
      if (!checkCostExist.rowCount) {
        await db.query(
          "INSERT INTO cost (cost_date, season) values ($1, $2) RETURNING *",
          [cost_date, season]
        );
      }
      const checkFrequencyExist = await db.query(
        "SELECT * FROM frequency WHERE category = $1",
        [cost_category]
      );
      if (!checkFrequencyExist.rowCount) {
        await db.query("INSERT INTO frequency (category) values ($1)", [
          cost_category,
        ]);
      }
      await db.query(
        "UPDATE frequency SET count = count + 1 WHERE category = $1",
        [cost_category]
      );
      const updateCost = await db.query(
        `UPDATE cost SET ${cost_category} = ${cost_category} + $1 WHERE cost_date = $2 RETURNING *`,
        [cost_amount, cost_date]
      );
      res.json({
        payload: `${cost_category} : ${updateCost.rows[0][cost_category]}`,
      });
    } catch (e) {
      res.json({
        isError: true,
        payload: `Error while add cost to cost category: ${cost_category}. ${e}`,
      });
    }
  }
  async getAllCost(req: Request, res: Response) {
    try {
      const allCost = await db.query("SELECT * from cost");
      res.json({ payload: allCost.rows });
    } catch (e) {
      res.json({
        isError: true,
        payload: `Error while getting all cost. ${e}`,
      });
    }
  }
  async getYearCost(req: Request, res: Response) {
    try {
      res.json({
        payload: "Successfully getYearCost ...",
      });
    } catch (e) {
      res.json({
        isError: true,
        payload: `Error while getting cost of year. ${e}`,
      });
    }
  }
  async getSeasonCost(req: Request, res: Response) {
    try {
      res.json({
        payload: "Successfully getSeasonCost ...",
      });
    } catch (e) {
      res.json({
        isError: true,
        payload: `Error while getting cost of season. ${e}`,
      });
    }
  }
  async getMonthCost(req: Request, res: Response) {
    const { year, month } = req.params;
    const dateVal = `${year}-${month}%`;
    try {
      const cost = await db.query(
        "SELECT * FROM cost WHERE CAST(cost_date AS TEXT) LIKE $1",
        [dateVal]
      );
      res.json({
        payload: cost.rows,
      });
    } catch (e) {
      res.json({
        isError: true,
        payload: `Error while getting cost of month(${year}-${month}): ${e}`,
      });
    }
  }
  async getDayCost(req: Request, res: Response) {
    const { date } = req.params;
    try {
      const cost = await db.query(
        "SELECT * FROM cost WHERE CAST(cost_date AS TEXT) LIKE $1",
        [date]
      );
      res.json({
        payload: cost.rows,
      });
    } catch (e) {
      res.json({
        isError: true,
        payload: `Error while getting cost of day(${date}): ${e}`,
      });
    }
  }
  async getPeriodCost(req: Request, res: Response) {
    try {
      res.json({
        payload: "Successfully getPeriodCost ...",
      });
    } catch (e) {
      res.json({
        isError: true,
        payload: `Error while getting cost of period. ${e}`,
      });
    }
  }
  async getCostCategories(req: Request, res: Response) {
    try {
      const categories = await db.query(
        "SELECT column_name FROM information_schema.columns WHERE table_name = 'cost';"
      );
      res.json({
        payload: categories.rows
          .map((item) => item.column_name)
          .filter((cat) => cat.substring(0, 3) === "cat"),
      });
    } catch (e) {
      res.json({
        isError: true,
        payload: `Error while getting cost categories. ${e}`,
      });
    }
  }
}

export default new CostController();
