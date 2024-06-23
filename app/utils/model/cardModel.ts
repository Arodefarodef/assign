import { Document, Schema, model, models } from "mongoose";
import { iCard } from "../cardinter";

interface iCardData extends iCard, Document {}

const cardModel = new Schema<iCardData>(
  {
    title: { type: String },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const myCardModel = models.cards || model<iCardData>("card", cardModel);
export default myCardModel;
