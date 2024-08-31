import CompanyModel from "@/models/company.model";
import { Request, Response } from "express";


const createCompany = async (req: Request, res: Response) => {
    const {
        name,
        logo,
        ownerId,
        week_days_available,
        custom_disabled_dates,
        zone_images,
        zones,
        hours,
        slug
    } = req.body

    if (
        !name || !logo || !ownerId || 
        !week_days_available || !custom_disabled_dates ||
        !zone_images || !zones || !hours || !slug
    ) {
        return res.status(401)
    }

    const company = await CompanyModel.create({
        name,
        slug,
        logo,
        ownerId,
        
    })

}