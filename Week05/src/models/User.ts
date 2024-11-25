import mongoose, { Schema, Document } from 'mongoose';

interface ITodo {
    todo: string;
}

interface IUser extends Document {
    name: string;
    todos: ITodo[];
}

const todoSchema: Schema<ITodo> = new Schema({
    todo: { type: String, required: true }
});

const userSchema: Schema<IUser> = new Schema({
    name: { type: String, required: true },
    todos: { type: [todoSchema], default: [] }
});

const User: mongoose.Model<IUser> = mongoose.model('User', userSchema);

export { User, IUser, ITodo };
