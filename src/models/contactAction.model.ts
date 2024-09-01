import { CONTACT_ACTIONS } from '@/enum/enumerators';
import { prop, getModelForClass } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

class ContactAction {
    @prop()
    public userEmail!: string;

    @prop()
    public slug!: string;

    @prop()
    public date!: Date;

    @prop({default: 0})
    public timesPerformed!: number;

    @prop({ required: true, type: String, enum: CONTACT_ACTIONS })
    public action!: CONTACT_ACTIONS;
}
  
const ContactActionModel = getModelForClass(ContactAction);
export default ContactActionModel;