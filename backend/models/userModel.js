import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: [true, 'Please enter a pseudo'],
        unique: true
    }
}, { timestamps: true });

const User = mongoose.model('user', userSchema);

export default User;