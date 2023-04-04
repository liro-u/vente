import jwt from 'jsonwebtoken';
import User from '../../models/userModel.js';

const tryAddAuth = async (req, res, next) => {

    // verify authentification
    const { authorization } = req.headers;

    if (authorization) {        
        const token = authorization.split(' ')[1];
        
        try {
            try{
                const { _id } = jwt.verify(token, process.env.SECRET);
                
                req.user = await User.findOne({ _id }).select('_id role pseudo email');
                next();
            }catch (err){
                if (err.message === 'jwt expired'){
                    req.user = null;
                    return res.status(401).json({error: 'session expired'});
                }else if (err.name === 'TokenExpiredError'){
                    req.user = null;
                    return res.status(401).json({error: 'session expired'});
                }
                else{
                    throw err;
                }
            }
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