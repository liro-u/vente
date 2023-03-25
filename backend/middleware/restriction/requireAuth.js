import jwt from 'jsonwebtoken';
import User from '../../models/userModel.js';

const requireAuth = async (req, res, next) => {

    // verify authentification
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'});
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);

        req.user = await User.findOne({ _id }).select('_id role pseudo');
        next();
    }
    catch (err) {
        console.log(err);
        res.status(401).json({error: 'request is not authorized'});
    }
}

export default requireAuth;