import { Request, Response } from "express";

import { db } from "../src/db";

export class CostController {
  async createUser(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const newPerson = await db.query(
        "INSERT INTO person (name) values ($1) RETURNING *",
        [name]
      );
      res.json(newPerson.rows[0]);
    } catch (e) {
      res.json("Erorr ...");
    }
  }
  async createCost(req: Request, res: Response) {
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
        `ALTER TABLE category
            ADD COLUMN IF NOT EXISTS ${cost_category} integer`
      );
      res.json(`Successfully created new cost category: ${cost_category}`);
    } catch (e) {
      res.json(`Error while creating new cost category: ${cost_category}`);
    }
  }
  async addToCost(req: Request, res: Response) {
    try {
      res.json("Successfully ...");
    } catch (e) {
      res.json("Erorr ...");
    }
  }
  async getUsers(req: Request, res: Response) {
    try {
      const users = await db.query("SELECT * from person");
      res.json(users.rows);
    } catch (e) {
      res.json("Erorr ...");
    }
  }
  async getCurrentDayCostOfUser(req: Request, res: Response) {
    try {
      res.json("Successfully ...");
    } catch (e) {
      res.json("Erorr ...");
    }
  }
  async getCurrentDayCost(req: Request, res: Response) {
    try {
      res.json("Successfully ...");
    } catch (e) {
      res.json("Erorr ...");
    }
  }
  async getAllCostOfUser(req: Request, res: Response) {
    try {
      res.json("Successfully ...");
    } catch (e) {
      res.json("Erorr ...");
    }
  }
  async getAllCost(req: Request, res: Response) {
    try {
      res.json("Successfully ...");
    } catch (e) {
      res.json("Erorr ...");
    }
  }
  async getYearCostOfUser(req: Request, res: Response) {
    try {
      res.json("Successfully ...");
    } catch (e) {
      res.json("Erorr ...");
    }
  }
  async getYearCost(req: Request, res: Response) {
    try {
      res.json("Successfully ...");
    } catch (e) {
      res.json("Erorr ...");
    }
  }
  async getSeasonCostOfUser(req: Request, res: Response) {
    try {
      res.json("Successfully ...");
    } catch (e) {
      res.json("Erorr ...");
    }
  }
  async getSeasonCost(req: Request, res: Response) {
    try {
      res.json("Successfully ...");
    } catch (e) {
      res.json("Erorr ...");
    }
  }
  async getMonthCostOfUser(req: Request, res: Response) {
    try {
      res.json("Successfully ...");
    } catch (e) {
      res.json("Erorr ...");
    }
  }
  async getMonthCost(req: Request, res: Response) {
    try {
      res.json("Successfully ...");
    } catch (e) {
      res.json("Erorr ...");
    }
  }
  async getPeriodCostOfUser(req: Request, res: Response) {
    try {
      res.json("Successfully ...");
    } catch (e) {
      res.json("Erorr ...");
    }
  }
  async getPeriodCost(req: Request, res: Response) {
    try {
      res.json("Successfully ...");
    } catch (e) {
      res.json("Erorr ...");
    }
  }
}

export default new CostController();
