import mongoose, { Schema, Document } from 'mongoose';

// Define interface for the todo items
interface ITodo {
    todo: string;
    checked: boolean;
}

// Define interface for the user
interface IUser extends Document {
    name: string;
    todos: ITodo[];
}

// Define the schema for the todo items
const todoSchema: Schema<ITodo> = new Schema({
    todo: { type: String, required: true },
    checked: { type: Boolean, default: false }
});

// Define the schema for the user
const userSchema: Schema<IUser> = new Schema({
    name: { type: String, required: true },
    todos: { type: [todoSchema], default: [] }
});

const User: mongoose.Model<IUser> = mongoose.model('User', userSchema);

export { User, IUser, ITodo };
