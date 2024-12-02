import mongoose, { Schema, Document } from "mongoose";

interface IImage extends Document {
  filename: string;
  path: string;
}

const imageSchema: Schema<IImage> = new Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
});

const Image: mongoose.Model<IImage> = mongoose.model("Image", imageSchema);

export { Image, IImage };
