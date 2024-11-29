import { CONTACT_ACTIONS } from "@/enum/enumerators";
import ContactActionModel from "@/models/contactAction.model";
import UtilityModel from "@/models/utility.model";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

const executeContactAction = async (req: Request, res: Response) => {
    const { action, slug, userEmail, utilityType } = req.body;

    const utility = await UtilityModel.findOne({ slug });

    if (!utility) {
        return res.status(404).json({ message: "Utility not found." });
    }

    if (utility.type !== utilityType) {
        return res.status(404).json({ message: "Utility not found." });
    }

    let temp;

    try {
        temp = await ContactActionModel.findOneAndUpdate(
            {
                userEmail,
                slug,
            },
            {
                slug,
                action: action,
                date: new Date(),
                userEmail,
                $inc: {
                    timesPerformed: 1,
                },
            },
            {
                upsert: true,
                new: true,
            }
        );
    } catch (err) {
        return res
            .status(400)
            .json({ message: "Error", error: JSON.stringify(err) });
    }

    if (!temp) {
        return res.status(400).json({ message: "Something went wrong..." });
    }

    return res.status(200).json({});
};

const getAllContactActions = async (req: Request, res: Response) => {
    const temp = await ContactActionModel.find();

    return res.status(200).json({ data: temp });
};

const getContactActions = async (req: Request, res: Response) => {
    const { slug } = req.params;

    // const temp = await ContactActionModel.find({
    //     slug,
    // })

    const temp1 = await ContactActionModel.aggregate([
        {
            $match: {
                slug
            }
        },
        {
            $lookup: {
                from: "contacts",
                localField: "userEmail",
                foreignField: "email",
                as: "user",
            },
        },
        {$unwind: "$user"},
    ]);

    const temp2 = await ContactActionModel.aggregate([
        {
            $match: {
                slug
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                "cantidad": { $sum: 1 },
            },
        },
        {
            $sort: { _id: -1 },
        },
        {
            $limit: 15,
        },
    ]);

    return res.status(200).json({ data: temp1, graphData: temp2 });
};

export default {
    executeContactAction,
    getAllContactActions,
    getContactActions,
};
