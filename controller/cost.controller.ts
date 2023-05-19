import { Request, Response } from "express";

import { db } from "../src/db";

export class CostController {
  async createCostCategory(req: Request, res: Response) {
    const { cost_category } = req.body;
    try {
      await db.query(
        `ALTER TABLE cost
            ADD COLUMN IF NOT EXISTS ${cost_category} NUMERIC(10, 2) NOT NULL DEFAULT 0.00`
      );
      res.json(`Successfully created new cost category: ${cost_category}`);
    } catch (e) {
      res.json(`Error while creating new cost category: ${cost_category}`);
    }
  }
  async addToCostCategory(req: Request, res: Response) {
    const { user_id, cost_category, cost_amount } = req.body;

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
        "SELECT * FROM cost WHERE cost_date = $1 AND user_id = $2",
        [cost_date, user_id]
      );
      if (!checkCostExist.rowCount) {
        await db.query(
          "INSERT INTO cost (cost_date, season, user_id) values ($1, $2, $3) RETURNING *",
          [cost_date, season, user_id]
        );
      }
      const updateCost = await db.query(
        `UPDATE cost SET ${cost_category} = ${cost_category} + $1 WHERE cost_date = $2  AND user_id = $3 RETURNING *`,
        [cost_amount, cost_date, user_id]
      );
      res.json(`${cost_category} : ${updateCost.rows[0][cost_category]}`);
    } catch (e) {
      res.json(`${e}`);
    }
  }
  async getAllCostOfUser(req: Request, res: Response) {
    try {
      res.json("Successfully ...");
    } catch (e) {
      res.json("Error ...");
    }
  }
  async getAllCost(req: Request, res: Response) {
    try {
      res.json("Successfully getAllCost ...");
    } catch (e) {
      res.json("Error ...");
    }
  }
  async getYearCostOfUser(req: Request, res: Response) {
    try {
      res.json("Successfully getYearCostOfUser ...");
    } catch (e) {
      res.json("Error ...");
    }
  }
  async getYearCost(req: Request, res: Response) {
    try {
      res.json("Successfully getYearCost ...");
    } catch (e) {
      res.json("Error ...");
    }
  }
  async getSeasonCostOfUser(req: Request, res: Response) {
    try {
      res.json("Successfully getSeasonCostOfUser ...");
    } catch (e) {
      res.json("Error ...");
    }
  }
  async getSeasonCost(req: Request, res: Response) {
    try {
      res.json("Successfully getSeasonCost ...");
    } catch (e) {
      res.json("Error ...");
    }
  }
  async getMonthCostOfUser(req: Request, res: Response) {
    const { id, year, month } = req.params;
    const dateVal = `${year}-${month}%`;
    try {
      const cost = await db.query(
        "SELECT * FROM cost WHERE CAST(cost_date AS TEXT) LIKE $1 AND user_id = $2",
        [dateVal, id]
      );
      res.json(cost.rows);
    } catch (e) {
      res.json(`${e}`);
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
      res.json(e);
    }
  }
  async getDayCostOfUser(req: Request, res: Response) {
    const { id, date } = req.params;
    const dateVal = `${date}%`;
    try {
      const cost = await db.query(
        "SELECT * FROM cost WHERE CAST(cost_date AS TEXT) LIKE $1 AND user_id = $2",
        [dateVal, id]
      );
      res.json(cost.rows);
    } catch (e) {
      res.json(`${e}`);
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
      res.json(`${e}`);
    }
  }
  async getPeriodCostOfUser(req: Request, res: Response) {
    try {
      res.json("Successfully getPeriodCostOfUser ...");
    } catch (e) {
      res.json("Error ...");
    }
  }
  async getPeriodCost(req: Request, res: Response) {
    try {
      res.json("Successfully getPeriodCost ...");
    } catch (e) {
      res.json("Error ...");
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
          .map((cat) => cat.substring(4))
      );
    } catch (e) {
      res.json("Error ...");
    }
  }
}

export default new CostController();
