import { INTERESTS } from '@/types/enums/enums';
import { prop, getModelForClass } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

class Contact {
    @prop()
    public name?: string;

    @prop()
    public email!: string;

    @prop()
    public phone?: string;

    @prop()
    public birthday?: Date;

    @prop({ required: true, enum: INTERESTS })
    public interests!: INTERESTS[];
}
  
const ContactModel = getModelForClass(Contact);
export default ContactModel;