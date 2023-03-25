import mongoose from "mongoose";
import validator from 'validator';
const { isEmail, isStrongPassword } = validator;
import bcrypt from 'bcrypt';

const ROLES = ['admin', 'artist', 'user'];

const isRole = (role) => {
    return ROLES.includes(role);
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        validate: [isStrongPassword, 'The password you entered does not meet the required criteria. Please ensure that your password contains at least 8 characters, including a capital letter, a special character, and a number.']
    },
    pseudo: {
        type: String,
        required: [true, 'Please enter a pseudo'],
    },
    role: {
        type: String,
        required: [true, 'Please enter a role'],
        validate: [isRole, 'Please choose a real role']
    }
}, { timestamps: true });

// fire a function before doc saved to db (before signup)
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static login method
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});

    if (user) {
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            return user;
        }
        throw Error('incorrect');
    }
    throw Error('incorrect');
}

userSchema.statics.ROLES = ROLES;

const User = mongoose.model('user', userSchema);

export default User;