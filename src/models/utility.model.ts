import { INTERESTS, UTILITY_TYPES } from '@/enum/enumerators';
import { prop, getModelForClass } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';



class Utility {
    @prop()
    public name!: string;

    @prop()
    public description?: string;

    @prop()
    public date?: Date;

    @prop()
    public isEnabled!: boolean;

    @prop()
    public url? : string;

    @prop({unique: true, type: String})
    public slug!: String;

    @prop({ required: true, type: String, enum: UTILITY_TYPES })
    public type!: UTILITY_TYPES;

    @prop({ required: true, type: String, enum: INTERESTS })
    public interests!: INTERESTS[];
}
  
const UtilityModel = getModelForClass(Utility);
export default UtilityModel;