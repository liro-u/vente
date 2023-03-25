import Wallpaper from '../models/wallpaperModel.js';
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

// Get wallpaper by id
const getWallpaper = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such wallpaper'});
    }
    
    const objId = new mongoose.Types.ObjectId(id);
    console.log(id)
    const wallpapers = await Wallpaper.aggregate([
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

    ])

    if (wallpapers.length === 0){
        return res.status(404).json({ error: 'No such wallpaper'});
    }
    
    res.status(200).json(wallpapers[0]);
};

// Get X Wallpapers
const getXWallpapers = async (req, res) => {

    var idArray = [];
    req.body.idArray.forEach(id => {
        idArray.push( new mongoose.Types.ObjectId(id) )
    });

    var x = parseInt(req.body.x)

    const wallpapers = await Wallpaper.aggregate([
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
        { $project: { "user": 0 } }

    ])

    res.status(200).json(wallpapers);
};

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

// DELETE a workout
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
        if (user._id === wallpaper.artistId || user.role === 'admin') {
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

    const wallpaper = await Wallpaper.findOne({ _id: id });

    if (!wallpaper) {
        return res.status(400).json({ error: "No such wallpaper", emptyFields });
    }else{
        if (user._id === wallpaper.artistId || user.role === 'admin') {
            await Wallpaper.findOneAndUpdate({ _id: id }, {
                ...req.body
            })
            res.status(200).json(wallpaper);
        }else{
            res.status(401).json({ error: "request is not authorized" });
        }
    }
};

const downloadWallpaper = async (req, res) => {
    const imagePath = req.body.url;
    const imageStream = request(imagePath);

    res.setHeader('Content-Type', 'image/jpeg');

    imageStream.pipe(res);
}


export default {
    getWallpapers,
    getWallpaper,
    getXWallpapers,
    createWallpaper,
    updateWallpaper,
    deleteWallpaper,
    downloadWallpaper
};