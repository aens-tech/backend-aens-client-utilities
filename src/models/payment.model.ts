import { prop, getModelForClass } from "@typegoose/typegoose";
import * as mongoose from "mongoose";

enum Status {
    PENDING = "male",
    IN_PROGRESS = "female",
    DONE = "done",
    CANCELED = "canceled",
    REFUND = "refund"
}

class Payment {
    @prop()
    public fromUser!: string;

    @prop()
    public toBusiness!: string;

    @prop()
    public createdAt!: Date;

    @prop()
    public lastUpdate!: string;

    @prop({ required: true, enum: Status })
    public status!: Status;
}

const PaymentModel = getModelForClass(Payment);
export default PaymentModel;
