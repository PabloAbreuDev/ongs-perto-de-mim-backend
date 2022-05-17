import { Request, Response } from "express";

class HomeController {
  async checkStatus(req: Request, res: Response) {
    console.log(req.user)
    return res.status(200).json({ msg: "Server online" });
  }
}

export default HomeController;
