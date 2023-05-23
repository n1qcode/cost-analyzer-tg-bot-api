import { Request, Response } from "express";

import { db } from "../src/db";

export class TranslationController {
  async createTranslationCostCategory(req: Request, res: Response) {
    const { cost_category, translation } = req.body;
    try {
      await db.query(
        `ALTER TABLE translation
            ADD COLUMN IF NOT EXISTS ${cost_category} TEXT NOT NULL DEFAULT '${translation}'`
      );
      res.json(
        `Successfully created new translation of cost category: ${cost_category} - ${translation}`
      );
    } catch (e) {
      res.json(
        `Error while creating new translation of cost category: ${cost_category} - ${translation}`
      );
    }
  }
  async updateTranslationCostCategory(req: Request, res: Response) {
    const { cost_category, translation } = req.body;
    try {
      await db.query(
        `ALTER TABLE translation
              ADD COLUMN IF NOT EXISTS ${cost_category} TEXT NOT NULL`
      );
      const checkTranslationExist = await db.query("SELECT * FROM translation");
      if (!checkTranslationExist.rowCount) {
        await db.query(
          `INSERT INTO translation (${cost_category}) values ($1) RETURNING *`,
          [cost_category]
        );
      }
      await db.query(
        `UPDATE translation set ${cost_category} = '${translation}' where id = 1 RETURNING *`
      );
      res.json(
        `Successfully updated translation of cost category: ${cost_category} to ${translation}!`
      );
    } catch (e) {
      res.json(
        `Error while updating translation of cost category: ${cost_category} to ${translation}`
      );
    }
  }
  async getTranslationCostCategory(req: Request, res: Response) {
    try {
      const translation = await db.query(
        "SELECT * from translation where id = 1"
      );
      res.json(translation.rows[0]);
    } catch (e) {
      res.json("Error while getting translation of cost categories");
    }
  }
}

export default new TranslationController();
