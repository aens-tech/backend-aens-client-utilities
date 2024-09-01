import { MASTER_KEY } from "@/utils/env";
import { NextFunction, Request, Response } from "express";

const masterKeyRequired = (req: Request, res: Response, next: NextFunction) => {
    const {
        masterKey
    } = req.body

    if (masterKey !== MASTER_KEY){
        return res.status(403).json({})
    }

    next()
}

export default {
    masterKeyRequired
}