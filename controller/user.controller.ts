import { Request, Response } from "express";

import { db } from "../src/db";

export class UserController {
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
  async getUsers(req: Request, res: Response) {
    try {
      const users = await db.query("SELECT * from person");
      res.json(users.rows);
    } catch (e) {
      res.json("Error while getting users");
    }
  }
}

export default new UserController();
