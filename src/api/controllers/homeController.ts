import { Request, Response } from "express";

class HomeController {
  constructor() {}

  async checkStatus(req: Request, res: Response) {
    return res.status(200).json({ msg: "Server online" });
  }
}

export default HomeController;
