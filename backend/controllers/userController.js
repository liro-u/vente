import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: process.env.SESSION_DURATION })
}

const handleError = (err) => {
    const { message, code } = err;
    let errors = { email: '', password: '', global: '' };

    // incorrect email
    if (err.message === 'incorrect') {
        errors.global = 'incorrect password or email';
    }
    
    // duplicate error code
    if (code === 11000) {
        errors.email = 'that email is already registered';
    }

    // validation errors
    if (message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        // create token
        const token = createToken(user._id);

        res.status(200).json({
            pseudo: user.pseudo,
            role: user.role,
            _id: user._id,
            token
        })
    }
    catch (err) {
        const errors = handleError(err);
        res.status(400).json({ errors });
    }
}

// signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.create({email, password, pseudo: "liro_u", role: "user"});

        // create token
        const token = createToken(user._id);
        
        res.status(200).json({
            pseudo: user.pseudo,
            role: user.role,
            _id: user._id,
            token
        })
    }
    catch (err) {
        const errors = handleError(err)
        res.status(400).json({ errors });
    }
}

export default {
    loginUser,
    signupUser
};