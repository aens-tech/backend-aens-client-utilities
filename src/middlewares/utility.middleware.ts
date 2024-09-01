import { CONTACT_ACTIONS, INTERESTS, UTILITY_TYPES } from "@/enum/enumerators";
import { checkEnumMatchWithArray, checkEnumMatchWithString } from "@/utils/utils";
import { NextFunction, Request, Response } from "express";

const checkUtilityType = (req: Request, res: Response, next: NextFunction) => {
    const { 
        utilityType
    } = req.body

    if (!utilityType) {
        return res.status(400).json({message: "Utility type required."})
    }

    const utilityVariant = checkEnumMatchWithString(utilityType, UTILITY_TYPES)

    if (!utilityVariant) {
        return res.status(404).json({message: "Utility type not found."})
    }

    next()
}

const checkActionType = (req: Request, res: Response, next: NextFunction) => {
    const { 
        action
    } = req.body

    if (!action) {
        return res.status(400).json({message: "Action type required."})
    }

    const utilityVariant = checkEnumMatchWithString(action, CONTACT_ACTIONS)

    if (!utilityVariant) {
        return res.status(404).json({message: "Action type not found."})
    }

    next()
}

const checkInterests = (req: Request, res: Response, next: NextFunction) => {
    const { 
        interests
    } = req.body

    if (!interests) {
        return res.status(400).json({message: "Interest required."})
    }

    const utilityVariant = checkEnumMatchWithArray(interests, INTERESTS)

    if (!utilityVariant) {
        return res.status(404).json({message: "Interest not found."})
    }

    next()
}



export default {
    checkUtilityType,
    checkActionType,
    checkInterests
}