import { INTERESTS } from '@/enum/enumerators';
import { prop, getModelForClass } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

class Contact {
    @prop({type: String})
    public name?: string;

    @prop({type: String})
    public email!: string;

    @prop({type: String})
    public phone?: string;

    @prop({type: Date})
    public birthday?: Date;

    @prop({ required: true, type: String, enum: INTERESTS })
    public interests!: INTERESTS[];
}
  
const ContactModel = getModelForClass(Contact);
export default ContactModel;