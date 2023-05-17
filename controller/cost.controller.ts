import { Request, Response } from "express";

import { db } from "../src/db";

export class CostController {
  async createUser(req: Request, res: Response) {
    const { name } = req.body;
    try {
      const user = await db.query(
        "INSERT INTO person (name) values ($1) RETURNING *",
        [name]
      );
      res.json(user.rows[0]);
    } catch (e) {
      res.json(`Error while trying create user: ${name}`);
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
  async updateUser(req: Request, res: Response) {
    const { id, name } = req.body;
    try {
      const user = await db.query(
        "UPDATE person set name = $1 where id = $2 RETURNING *",
        [name, id]
      );
      res.json(user.rows[0]);
    } catch (e) {
      res.json(`Error while trying update user: ${name}`);
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
      res.json("Error ...");
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
