import { NextFunction, Request, Response } from "express";

const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.userRole !== "") {
        return res.status(403).json({message: "User not allowed to continue."})
    }

    next()
}

export default {
    isAdminMiddleware,
}