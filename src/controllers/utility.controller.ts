import { INTERESTS, UTILITY_TYPES } from "@/enum/enumerators";
import ContactActionModel from "@/models/contactAction.model";
import UtilityModel from "@/models/utility.model";
import utilityUtilities from "@/utils/controllerUtilities/utility.utilities";
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

    const validations = utilityUtilities.isUtilityDataValid(interests, type, url);

    if (!validations) return res.status(400).json({message: "Bad request!"})
    
    try {
        const utility = await UtilityModel.create({
            name,
            description,
            date: new Date(date),
            isEnabled: true,
            url,
            slug,
            type,
            interests
        })

        if (!utility) {
            return res.status(400).json({message: "Something is wrong with the database."})
        }

        return res.status(200).json(utility)
    } catch (err) {
        return res.status(400).json({message: "Error", error: JSON.stringify(err)})
    }


}

const updateUtility = async (req: Request, res: Response) => {
    const {
        name,
        description,
        date,
        url,
        type,
        interests
    } = req.body

    const {
        slug
    } = req.params

    const validations = utilityUtilities.isUtilityDataValid(interests, type, url);

    if (!validations) return res.status(400).json({message: "Bad request!"})
    
    try {
        const utility = await UtilityModel.findOneAndUpdate({
            slug
        },{
            name,
            description,
            date: new Date(date),
            isEnabled: true,
            url,
            type,
            interests
        })

        if (!utility) {
            return res.status(400).json({message: "Something is wrong with the database."})
        }

        return res.status(200).json(utility)
    } catch (err) {
        return res.status(400).json({message: "Error", error: JSON.stringify(err)})
    }
}

const getUtily = async (req: Request, res: Response) => {
    const {
        userEmail
    } = req.query

    const {
        slug,
    } = req.params

    let userAlreadyIn = false

    console.log(slug)

    const utilityVariant = await UtilityModel.findOne({
        slug,
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

const getAllUtilities = async (req: Request, res: Response) => {
    const temp = await UtilityModel.find()

    return res.status(200).json({
        data: temp
    })
}

const removeUtility = async  (req: Request, res: Response) => {
    const {
        slug
    } = req.params

    const temp = await UtilityModel.deleteOne({slug})

    if (!temp) return res.status(400).json({message: "Error"});

    return res.status(200).json({})
}

export default {
    createUtility,
    getUtily,
    getAllUtilities,
    updateUtility,
    removeUtility
}