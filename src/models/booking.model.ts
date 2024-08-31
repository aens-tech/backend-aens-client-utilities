import { getModelForClass, prop } from "@typegoose/typegoose";

class Booking {
    @prop({ required: true })
    public date!: Date;

    @prop({ required: true })
    public hour!: string;

    @prop()
    public amout_of_guests!: number;

    @prop()
    selected_zone!: string;

    @prop()
    public userId!: string;

    @prop()
    public companyId!: string;
}

const BookingModel = getModelForClass(Booking);
export default BookingModel;