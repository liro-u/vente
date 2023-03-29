import mongoose from "mongoose";

const userLikeWallpaperSchema = new mongoose.Schema({
    wallpaperId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true });

const UserLikeWallpaper = mongoose.model('userLikeWallpaper', userLikeWallpaperSchema);

export default UserLikeWallpaper;