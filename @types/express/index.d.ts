import { Express } from "express-serve-static-core";

interface userHeader {
    user_id: string,
    email: string
}
declare module "express-serve-static-core" {
    interface Request {
        user: userHeader,
    }
}