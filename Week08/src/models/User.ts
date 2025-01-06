import mongoose, { Schema, Document } from 'mongoose';

// Define the User interface
interface IUser extends Document {
    email: string;
    password: string;
    username: string;
    isAdmin: boolean;
}

// Define the User schema
const UserSchema: Schema<IUser> = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }
});

// Define the User model
const User = mongoose.model<IUser>('User', UserSchema);

// Export the User model
export { User, IUser };
