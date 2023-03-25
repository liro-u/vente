import Wallpaper from '../models/wallpaperModel.js';
import mongoose from 'mongoose';

const debugdb = async (req, res) => {
  const idobj = new mongoose.Types.ObjectId("641dade74fa678291660d773");
  const wallp = await Wallpaper.updateMany(
    { artistId: { $regex: "641dade74fa678291660d773" } },
    [
      { $addFields: { artistId: { $toObjectId: '641dade74fa678291660d773' } } }
    ]
  )
  res.status(200).json(wallp);
};

export default {
  debugdb
};