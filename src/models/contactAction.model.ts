import { CONTACT_ACTIONS, INTERESTS } from '@/types/enums/enums';
import { prop, getModelForClass } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

class ContactAction {
    @prop()
    public userEmail!: string;

    @prop()
    public summonId?: string;

    @prop()
    public date!: Date;

    @prop({ required: true, enum: CONTACT_ACTIONS })
    public action!: CONTACT_ACTIONS;
}
  
const ContactActionModel = getModelForClass(ContactAction);
export default ContactActionModel;