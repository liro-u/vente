import Wallpaper from '../models/wallpaperModel.js';
import UserLikeWallpaper from '../models/userLikeWallpaperModel.js';

import mongoose from 'mongoose';
import request from 'request';

// Get all Wallpapers
const getWallpapers = async (req, res) => {
    const wallpapers = await Wallpaper.aggregate([
        { $lookup : {
            from: 'users',
            localField: 'artistId',
            foreignField: '_id',
            as : "user"
        } },
        // Extraire la valeur de "pseudo" du tableau "user" avec $arrayElemAt
        { $addFields: { "pseudo": { $arrayElemAt: ["$user.pseudo", 0] } } },

        // Supprimer le champ "user" avec $project
        { $project: { "user": 0 } },

        // sort by latest
        { $sort: { "createdAt": -1 } }

    ])

    res.status(200).json(wallpapers);
};

const getWallpaperById = async (id, user) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('No such wallpaper');
    }
    
    const objId = new mongoose.Types.ObjectId(id);
    
    let aggregateOptions = [
        { $match: { _id: objId } },
        { $lookup : {
            from: 'users',
            localField: 'artistId',
            foreignField: '_id',
            as : "user"
        } },
        // Extraire la valeur de "pseudo" du tableau "user" avec $arrayElemAt
        { $addFields: { "pseudo": { $arrayElemAt: ["$user.pseudo", 0] } } },
        // Supprimer le champ "user" avec $project
        { $project: { "user": 0 } }
    ]

    if (user){
        aggregateOptions = [...aggregateOptions, ...[
            //liked
            { $lookup: {
                from: 'userlikewallpapers',
                localField: '_id',
                foreignField: 'wallpaperId',
                pipeline: [
                    { $match: { userId: user._id } },
                ],
                as : "likeRelations"
            } },
            { $addFields: { "liked": { $cond: {
                if: { $eq: [ { $size: "$likeRelations" }, 0 ] },
                then: false,
                else: true
              } } } },
            { $project: { "likeRelations": 0 } },
        ]]
    }

    const wallpapers = await Wallpaper.aggregate(aggregateOptions)

    return wallpapers;
}

// Get wallpaper by id
const getWallpaper = async (req, res) => {
    const { id } = req.params;
    const user = req.user;

    try {
        const wallpapers = await getWallpaperById(id, user)
    
        if (wallpapers.length === 0){
            return res.status(404).json({ error: 'No such wallpaper'});
        }
        
        res.status(200).json(wallpapers[0]);
    }catch (err){
        console.log(err)
        return res.status(404).json({ error: 'No such wallpaper'});
    }
};

// Get X Wallpapers
const getXWallpapers = async (req, res) => {

    const user = req.user;

    var idArray = [];
    req.body.idArray.forEach(id => {
        idArray.push( new mongoose.Types.ObjectId(id) )
    });

    var x = parseInt(req.body.x)

    let aggregateOptions = [
        { $match: { _id: { $nin : idArray } } },
        { $sample: { size: x } },
        { $lookup : {
            from: 'users',
            localField: 'artistId',
            foreignField: '_id',
            as : "user"
        } },
        // Extraire la valeur de "pseudo" du tableau "user" avec $arrayElemAt
        { $addFields: { "pseudo": { $arrayElemAt: ["$user.pseudo", 0] } } },
        // Supprimer le champ "user" avec $project
        { $project: { "user": 0 } },
        
    ]

    if (user){
        aggregateOptions = [...aggregateOptions, ...[
            //liked
            { $lookup: {
                from: 'userlikewallpapers',
                localField: '_id',
                foreignField: 'wallpaperId',
                pipeline: [
                    { $match: { userId: user._id } },
                ],
                as : "likeRelations"
            } },
            { $addFields: { "liked": { $cond: {
                if: { $eq: [ { $size: "$likeRelations" }, 0 ] },
                then: false,
                else: true
              } } } },
            { $project: { "likeRelations": 0 } },
        ]]
    }

    const wallpapers = await Wallpaper.aggregate(aggregateOptions)

    res.status(200).json(wallpapers);
};

const reloadWallpapers = async (req, res) => {
    const user = req.user;

    var idArray = [];
    req.body.idArray.forEach(id => {
        idArray.push( new mongoose.Types.ObjectId(id) )
    });

    let aggregateOptions = [
        { $match: { _id: { $in : idArray } } },
        { $lookup : {
            from: 'users',
            localField: 'artistId',
            foreignField: '_id',
            as : "user"
        } },
        // Extraire la valeur de "pseudo" du tableau "user" avec $arrayElemAt
        { $addFields: { "pseudo": { $arrayElemAt: ["$user.pseudo", 0] } } },
        // Supprimer le champ "user" avec $project
        { $project: { "user": 0 } },
        // add ordering field
        { "$addFields" : { "__order" : { "$indexOfArray" : [ idArray, "$_id" ] } } },
        // sort
        { "$sort" : { "__order" : 1 } },
        { $project: { "__order": 0 } },
    ]

    if (user){
        aggregateOptions = [...aggregateOptions, ...[
            //liked
            { $lookup: {
                from: 'userlikewallpapers',
                localField: '_id',
                foreignField: 'wallpaperId',
                pipeline: [
                    { $match: { userId: user._id } },
                ],
                as : "likeRelations"
            } },
            { $addFields: { "liked": { $cond: {
                if: { $eq: [ { $size: "$likeRelations" }, 0 ] },
                then: false,
                else: true
              } } } },
            { $project: { "likeRelations": 0 } },
        ]]
    }

    const wallpapers = await Wallpaper.aggregate(aggregateOptions)

    res.status(200).json({wallpapers});
}

// POST a new Wallpaper
const createWallpaper = async (req, res) => {
    const user = req.user;
    const {imageLink, title, titleColor } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title');
    }
    if (!imageLink) {
        emptyFields.push('src')
    }
    if (!titleColor) {
        emptyFields.push('titleColor')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // add doc to db
    try {
        console.log(user._id)
        const wallpaper = await Wallpaper.create({ imageLink, artistId: user._id, title, titleColor });
        res.status(200).json(wallpaper);
    }
    catch (err) {
        console.log(err)
        res.status(400).json({error: err.message, emptyFields});
    }
}

// DELETE a wallpaper
const deleteWallpaper = async (req, res) => {
    const { id } = req.params;
    const user = req.user;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such wallpaper" });
    }

    const wallpaper = await Wallpaper.findOne({ _id: id });

    if (!wallpaper) {
        return res.status(400).json({ error: "No such wallpaper" });
    }else {
        if (user._id.toString() === wallpaper.artistId.toString() || user.role === 'admin') {
            await Wallpaper.findOneAndDelete({ _id: id });
            res.status(200).json(wallpaper);
        } else {
            res.status(401).json({ error: "request is not authorized" });
        }
    }
};

// UPDATE a Wallpaper
const updateWallpaper = async (req, res) => {
    const { id } = req.params;
    const user = req.user;

    let emptyFields = [];

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such wallpaper", emptyFields });
    }

    let wallpaper = await Wallpaper.findOne({ _id: id });

    if (!wallpaper) {
        return res.status(400).json({ error: "No such wallpaper", emptyFields });
    }else{
        if (user._id.toString() === wallpaper.artistId.toString() || user.role === 'admin') {
            await Wallpaper.findOneAndUpdate({ _id: id }, {
                ...req.body
            })
            const wallpapers = await getWallpaperById(id, user)
            if (wallpapers.length != 0) {
                return res.status(200).json(wallpapers[0]);
            }else{
                return res.status(400).json({ error: "updated but problem with new value", emptyFields });
            }
        }else{
            res.status(401).json({ error: "request is not authorized", emptyFields });
        }
    }
};

const downloadWallpaper = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such wallpaper" });
    }
    const wallpaper = await Wallpaper.findOne({_id: id});
    
    if (wallpaper){
        const imageStream = request(wallpaper.imageLink);
    
        res.setHeader('Content-Type', 'image/jpeg');
    
        imageStream.pipe(res);
    }else{
        return res.status(404).json({ error: "No such wallpaper" });
    }
}

const toggleLikeWallpaper = async (req, res) =>{
    const { id } = req.params;
    const user = req.user;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such wallpaper" });
    }

    const wallpaper = await Wallpaper.findOne({ _id: id });

    if (!wallpaper) {
        return res.status(400).json({ error: "No such wallpaper" });
    }else{
        const currentUserLikeWallpaper = { wallpaperId: id, userId: user._id }
        const userLikeWallpaper = await UserLikeWallpaper.findOne(currentUserLikeWallpaper)
        if (!userLikeWallpaper){
            await UserLikeWallpaper.create(currentUserLikeWallpaper);
        }else{
            await UserLikeWallpaper.findOneAndDelete(currentUserLikeWallpaper)
        }
        res.status(200).json({liked: !userLikeWallpaper});
    }
}

export default {
    getWallpapers,
    getWallpaper,
    getXWallpapers,
    reloadWallpapers,
    createWallpaper,
    updateWallpaper,
    deleteWallpaper,
    downloadWallpaper,
    toggleLikeWallpaper
};