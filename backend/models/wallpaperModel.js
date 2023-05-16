import mongoose from "mongoose";

const wallpaperSchema = new mongoose.Schema({
    imageLink: {
        type: String,
        required: [true, 'Please enter a Link to the wallpaper'],
        unique: true
    },
    artistId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please enter a title to the wallpaper'],
    },
    titleColor: {
        type: String,
        required: true
    },
    tags: {
        type: String,
    }
}, { timestamps: true });

const Wallpaper = mongoose.model('wallpaper', wallpaperSchema);

export default Wallpaper;