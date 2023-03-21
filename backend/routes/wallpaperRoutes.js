import express from "express";
import wallpaperController from "../controllers/wallpaperController.js"

const router = express.Router();

router.get('/', wallpaperController.getWallpapers);
router.post('/', wallpaperController.createWallpaper);
router.post('/getX', wallpaperController.getXWallpapers);
router.patch('/:id', wallpaperController.updateWallpaper);

export default router;