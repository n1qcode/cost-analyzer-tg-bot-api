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
      res.json(`Successfully created new cost category: ${cost_category}`);
    } catch (e) {
      res.json(`Error while creating new cost category: ${cost_category}`);
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
      const updateCost = await db.query(
        `UPDATE cost SET ${cost_category} = ${cost_category} + $1 WHERE cost_date = $2 RETURNING *`,
        [cost_amount, cost_date]
      );
      res.json(`${cost_category} : ${updateCost.rows[0][cost_category]}`);
    } catch (e) {
      res.json(`${e}`);
    }
  }
  async getAllCost(req: Request, res: Response) {
    try {
      res.json("Successfully getAllCost ...");
    } catch (e) {
      res.json("Error while getting all cost");
    }
  }
  async getYearCost(req: Request, res: Response) {
    try {
      res.json("Successfully getYearCost ...");
    } catch (e) {
      res.json("Error while getting cost of year");
    }
  }
  async getSeasonCost(req: Request, res: Response) {
    try {
      res.json("Successfully getSeasonCost ...");
    } catch (e) {
      res.json("Error while getting cost of season");
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
      res.json(cost.rows);
    } catch (e) {
      res.json(`Error while getting cost of month(${year}-${month}): ${e}`);
    }
  }
  async getDayCost(req: Request, res: Response) {
    const { date } = req.params;
    try {
      const cost = await db.query(
        "SELECT * FROM cost WHERE CAST(cost_date AS TEXT) LIKE $1",
        [date]
      );
      res.json(cost.rows);
    } catch (e) {
      res.json(`Error while getting cost of day(${date}): ${e}`);
    }
  }
  async getPeriodCost(req: Request, res: Response) {
    try {
      res.json("Successfully getPeriodCost ...");
    } catch (e) {
      res.json("Error while getting cost of period");
    }
  }
  async getCostCategories(req: Request, res: Response) {
    try {
      const categories = await db.query(
        "SELECT column_name FROM information_schema.columns WHERE table_name = 'cost';"
      );
      res.json(
        categories.rows
          .map((item) => item.column_name)
          .filter((cat) => cat.substring(0, 3) === "cat")
      );
    } catch (e) {
      res.json("Error while getting cost categories");
    }
  }
}

export default new CostController();
