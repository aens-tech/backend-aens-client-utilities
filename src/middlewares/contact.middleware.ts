import { CONTACT_ACTIONS } from "@/enum/enumerators"
import ContactModel from "@/models/contact.model"
import { checkEnumMatchWithArray, checkEnumMatchWithString } from "@/utils/utils"
import { NextFunction, Request, Response } from "express"

const findAndUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const {
        userEmail,
        userName,
        userBirthday,
        userPhone,
        interests,
    } = req.body

    let user = await ContactModel.findOne({email: userEmail})

    if (!Array.isArray(interests)) {
        return res.status(400).json({message: "Interests is not an array!"})
    }

    if (!user) {
        user = await ContactModel.create({
            name: userName,
            email: userEmail,
            birthday: userBirthday,
            phone: userPhone,
            interests: interests
        })
    } else {
        user = await ContactModel.findOneAndUpdate({email: userEmail}, {
            name: userName ? userName : undefined,
            birthday: userBirthday ? new Date(userBirthday) : undefined,
            phone: userPhone ? userPhone : undefined,
            interests: interests,
        })
    }

    next()
}

const validateAction = (req: Request, res: Response, next: NextFunction) => {
    const {
        action
    } = req.body

    const isPartOfValidActions = checkEnumMatchWithString(action, CONTACT_ACTIONS)

    if (!isPartOfValidActions) {
        return res.status(400).json({message: "Invalid action. Doesn't exist."})
    }

    next()
}

export default {
    findAndUpdate,
    validateAction
}