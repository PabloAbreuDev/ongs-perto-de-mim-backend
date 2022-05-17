import jwt from "jsonwebtoken"
import config from "../config";

export const verifyRefresh = (user_id: string, token: string) => {
    try {
        const decoded: any = jwt.verify(token, config.refresh_secret || "654321");

        return decoded.user_id === user_id;
    } catch (error) {
        return false;
    }
}

