import { Request, Response } from "express";

import { db } from "../src/db";

export class CostController {
  async createCostCategory(req: Request, res: Response) {
    // const months = [
    //   "January",
    //   "February",
    //   "March",
    //   "April",
    //   "May",
    //   "June",
    //   "July",
    //   "August",
    //   "September",
    //   "October",
    //   "November",
    //   "December",
    // ];
    // const seasons = [
    //   "Winter",
    //   "Winter",
    //   "Spring",
    //   "Spring",
    //   "Spring",
    //   "Summer",
    //   "Summer",
    //   "Summer",
    //   "Autumn",
    //   "Autumn",
    //   "Autumn",
    //   "Winter",
    // ];

    // const date = new Date();
    // const year = String(date.getFullYear());
    // const season = seasons[date.getMonth()];
    // const month = months[date.getMonth()];
    // const day = String(date.getUTCDate());

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
    try {
      res.json("Successfully ...");
    } catch (e) {
      res.json("Erorr ...");
    }
  }
  async getCurrentDayCostOfUser(req: Request, res: Response) {
    try {
      res.json("Successfully ...");
    } catch (e) {
      res.json("Error ...");
    }
  }
  async getCurrentDayCost(req: Request, res: Response) {
    try {
      res.json("Successfully ...");
    } catch (e) {
      res.json("Error ...");
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
      res.json("Successfully ...");
    } catch (e) {
      res.json("Error ...");
    }
  }
  async getYearCostOfUser(req: Request, res: Response) {
    try {
      res.json("Successfully ...");
    } catch (e) {
      res.json("Error ...");
    }
  }
  async getYearCost(req: Request, res: Response) {
    try {
      res.json("Successfully ...");
    } catch (e) {
      res.json("Error ...");
    }
  }
  async getSeasonCostOfUser(req: Request, res: Response) {
    try {
      res.json("Successfully ...");
    } catch (e) {
      res.json("Error ...");
    }
  }
  async getSeasonCost(req: Request, res: Response) {
    try {
      res.json("Successfully ...");
    } catch (e) {
      res.json("Error ...");
    }
  }
  async getMonthCostOfUser(req: Request, res: Response) {
    try {
      res.json("Successfully ...");
    } catch (e) {
      res.json("Error ...");
    }
  }
  async getMonthCost(req: Request, res: Response) {
    try {
      res.json("Successfully ...");
    } catch (e) {
      res.json("Error ...");
    }
  }
  async getPeriodCostOfUser(req: Request, res: Response) {
    try {
      res.json("Successfully ...");
    } catch (e) {
      res.json("Error ...");
    }
  }
  async getPeriodCost(req: Request, res: Response) {
    try {
      res.json("Successfully ...");
    } catch (e) {
      res.json("Error ...");
    }
  }
}

export default new CostController();
