import mongoose, { Schema, Document } from "mongoose";

// Define the Topic interface
interface ITopic extends Document {
  title: string;
  content: string;
  username: string;
  createdAt: Date;
}

// Define the Topic schema
const TopicSchema: Schema<ITopic> = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Define the Topic model
const Topic = mongoose.model<ITopic>("Topic", TopicSchema);

// Export the Topic model
export { Topic, ITopic };
