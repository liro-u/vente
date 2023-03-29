import jwt from 'jsonwebtoken';
import User from '../../models/userModel.js';

const tryAddAuth = async (req, res, next) => {

    // verify authentification
    const { authorization } = req.headers;

    if (authorization) {        
        const token = authorization.split(' ')[1];
        
        try {
            const { _id } = jwt.verify(token, process.env.SECRET);
            
            req.user = await User.findOne({ _id }).select('_id role pseudo email');
            next();
        }
        catch (err) {
            console.log(err);
            next();
        }
    }else{
        next();
    }
}

export default tryAddAuth;