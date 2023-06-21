import { Request, Response } from "express";

import { db } from "../src/db";

class FrequencyController {
  async getCategoriesByFrequency(req: Request, res: Response) {
    try {
      const frequency = await db.query("SELECT * from frequency");
      res.json({
        payload: frequency.rows,
      });
    } catch (e) {
      res.json({
        error: `Error while getting categories by frequency. ${e}`,
      });
    }
  }
}

export default new FrequencyController();
