import { INTERESTS, UTILITY_TYPES } from "@/enum/enumerators";
import ContactActionModel from "@/models/contactAction.model";
import UtilityModel from "@/models/utility.model";
import { checkEnumMatchWithArray, checkEnumMatchWithString } from "@/utils/utils";
import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";

const createUtility = async (req: Request, res: Response) => {
    const {
        name,
        description,
        date,
        url,
        slug,
        type,
        interests
    } = req.body

    const areInterestsValid =  checkEnumMatchWithArray(interests, INTERESTS)

    if (!areInterestsValid) {
        return res.status(400).json({message: "Not valid interests. Any of them was not found as an interest."})
    }

    const isTypeValid = checkEnumMatchWithString(type, UTILITY_TYPES)

    if (!isTypeValid) {
        return res.status(400).json({message: "Not valid type of utility."})
    }

    let utility

    try {

        utility = await UtilityModel.create({
            name,
            description,
            date: new Date(date),
            isEnabled: true,
            url,
            slug,
            type,
            interests
        })

    } catch (err) {
        return res.status(400).json({message: "Error", error: JSON.stringify(err)})
    }

    if (!utility) {
        return res.status(400).json({message: "Something is wrong with the database."})
    }

    return res.status(200).json(utility)
}

const getUtily = async (req: Request, res: Response) => {
    const {
        slug,
        userEmail
    } = req.query

    let userAlreadyIn = false

    const utilityVariant = await UtilityModel.findOne({
        slug
    }).lean().exec()

    if (!utilityVariant) {
        return res.status(404).json({message: "Utility Variant not found."})
    }

    if (userEmail){
        const contactAction = await ContactActionModel.findOne({
            userEmail,
            slug,
        }).lean()

        if (contactAction) userAlreadyIn = true
    }

    return res.status(200).json({
        ...utilityVariant,
        userAlreadyIn
    })
}

export default {
    createUtility,
    getUtily
}