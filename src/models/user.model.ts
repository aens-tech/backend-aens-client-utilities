import { prop, getModelForClass } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';


export enum EUserRole {
    SU = "SU",
    ADMIN = "ADMIN",
    USER = "USER",
}


class User {
    @prop()
    public name!: string;

    @prop({ required: true, enum: EUserRole })
    public role!: EUserRole;

    @prop()
    public email!: string;

    @prop()
    public phone!: string;

    @prop({type: () => [String]})
    public recent_companies?: string[];

    @prop()
    public password!: string;
}
  
const UserModel = getModelForClass(User);
export default UserModel;