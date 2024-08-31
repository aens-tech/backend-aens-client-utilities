import UserModel, { EUserRole } from "@/models/user.model";
import { ELEVATE_MASTER_KEY } from "@/utils/env";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

const elevateUserToSU = async (req: Request, res: Response) => {
    const { masterKey, userId } = req.body;

    console.log('TEST', userId)

    if (masterKey !== ELEVATE_MASTER_KEY){
        return res.status(403).json({})
    }
    
    let userObjectId: ObjectId | null

    try {
        userObjectId = new ObjectId(userId)
    } catch {
        return res.status(400).json({message: "Error trying to create ObjectID."})
    }

    const temp = await UserModel.findByIdAndUpdate(userObjectId!, {
        role: EUserRole.SU
    }).catch((err) => {
        return res.status(400).json({message: "User not found."})
    })

    if (!temp) {
        return res.status(400).json({message: "Something went wrong."})
    }

    return res.status(200).json({message: "User elevated to SU."})
}

const elevateUserToAdmin = async (req: Request, res: Response) => {
    const { masterKey, userId } = req.body;

    if (masterKey !== ELEVATE_MASTER_KEY){
        return res.status(403).json({})
    }
    
    let userObjectId: ObjectId | null

    try {
        userObjectId = new ObjectId(userId)
    } catch {
        return res.status(400).json({message: "Error trying to create ObjectID."})
    }

    const temp = await UserModel.findByIdAndUpdate(userObjectId!, {
        role: EUserRole.ADMIN
    }).catch((err) => {
        return res.status(400).json({message: "User not found."})
    })

    if (!temp) {
        return res.status(400).json({message: "Something went wrong."})
    }

    return res.status(200).json({message: "User elevated to ADMIN."})
}

export default {
    elevateUserToSU,
    elevateUserToAdmin
}