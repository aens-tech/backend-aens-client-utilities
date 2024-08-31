import { INTERESTS } from '@/types/enums/enums';
import { prop, getModelForClass } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';


class Summon {
    @prop()
    public name!: string;

    @prop()
    public description?: string;

    @prop()
    public date!: Date;

    @prop()
    public isOpen!: boolean;

    @prop({ required: true, enum: INTERESTS })
    public interests!: INTERESTS[];
}
  
const SummonModel = getModelForClass(Summon);
export default SummonModel;