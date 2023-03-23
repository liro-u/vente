import Wallpaper from '../models/wallpaperModel.js';
import mongoose from 'mongoose';
import request from 'request';

// Get all Wallpapers
const getWallpapers = async (req, res) => {
    const wallpapers = await Wallpaper.find({}).sort({ createdAt: 1 });

    res.status(200).json(wallpapers);
};

// Get wallpaper by id
const getWallpaper = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such wallpaper'});
    }
    
    const wallpaper = await Wallpaper.findById(id);
    
    if (!wallpaper) {
        return res.status(400).json({ error: 'No such wallpaper'});
    }
    
    res.status(200).json(wallpaper);
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
        const wallpaper = await Wallpaper.create({ imageLink, artistId: user.pseudo, title, titleColor });
        res.status(200).json(wallpaper);
    }
    catch (err) {
        res.status(400).json({error: err.message, emptyFields});
    }
}

// DELETE a workout
const deleteWallpaper = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such wallpaper" });
    }

    const wallpaper = await Wallpaper.findOneAndDelete({ _id: id });

    if (!wallpaper) {
        return res.status(400).json({ error: "No such wallpaper" });
    }

    res.status(200).json(wallpaper);
};

// UPDATE a Wallpaper
const updateWallpaper = async (req, res) => {
    const { id } = req.params;

    let emptyFields = [];

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such wallpaper", emptyFields });
    }

    const wallpaper = await Wallpaper.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!wallpaper) {
        return res.status(400).json({ error: "No such wallpaper", emptyFields });
    }

    res.status(200).json(wallpaper);
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