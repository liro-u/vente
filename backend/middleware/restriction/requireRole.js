import User from '../../models/userModel.js';

const requireRole = (req, res, next, roleRequired) => {
    const user = req.user;
    
    try {
        if (!User.ROLES.includes(roleRequired)){
            throw new Error('roleRequired dosnt exist')
        }
        let search = true;
        let i = 0;
        while (search && i < User.ROLES.length) {
            if (User.ROLES[i] === user.role) {
                search = false
            }else if (User.ROLES[i] === roleRequired) {
                throw new Error('request is not authorized');
            }
            i++;
        }
        if (search) {
            throw new Error('user role not find');
        }
        next();
    }
    catch (err) {
        console.log(err);
        res.status(401).json({error: 'request is not authorized'});
    }
}

const requireRoleAdmin = (req, res, next) => {
    requireRole(req, res, next, "admin");
}

const requireRoleArtist = (req, res, next) => {
    requireRole(req, res, next, "artist");
}

const requireRoleUser = (req, res, next) => {
    requireRole(req, res, next, "user");
}

export default {
    requireRole,
    requireRoleAdmin,
    requireRoleArtist,
    requireRoleUser
};