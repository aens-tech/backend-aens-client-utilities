import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import * as mongoose from "mongoose";

class Zone {
    @prop({ unique: true })
    public id!: string;

    @prop({ required: true })
    public label!: string;

    @prop()
    public description?: string;

    @prop()
    public price!: number;
}

class Hour {
    @prop({ unique: true })
    public id!: string;

    @prop({ required: true })
    public label!: string;

    @prop({ required: true })
    public group!: string;
}

class Company {

    @prop({required: true})
    public slug!: string;

    @prop({ required: true })
    public name!: string;

    @prop()
    public logo?: string;

    @prop()
    public ownerId!: string;

    @prop({ type: () => [Number] })
    public week_days_available!: number[];

    @prop({ type: () => [String] })
    public custom_disabled_dates!: string[];

    @prop({type: () => [String]})
    public zone_images?: string[];

    @prop({type: () => [Zone]})
    public zones!: Zone[];

    @prop({type: () => [Hour]})
    public hours!: Hour[];
}

const CompanyModel = getModelForClass(Company);
export default CompanyModel;
