import { Request, Response } from "express";

import { db } from "../src/db";

class FrequencyController {
  async getCategoriesByFrequency(req: Request, res: Response) {
    try {
      const frequency = await db.query("SELECT * from frequency");
      res.json(frequency.rows);
    } catch (e) {
      res.json("Error while getting categories by frequency");
    }
  }
}

export default new FrequencyController();
