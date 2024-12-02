import mongoose, { Schema, Document } from "mongoose";

// Define interface for the offer
interface IOffer extends Document {
  title: string;
  description: string;
  price: number;
  imageId?: string;
}

// Define the schema for the offer
const offerSchema: Schema<IOffer> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageId: { type: String, required: false },
});

const Offer: mongoose.Model<IOffer> = mongoose.model("Offer", offerSchema);

export { Offer, IOffer };
