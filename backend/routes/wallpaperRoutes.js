import express from "express";
import wallpaperController from "../controllers/wallpaperController.js"

const router = express.Router();

router.get('/', wallpaperController.getWallpapers);
router.get('/:id', wallpaperController.getWallpaper);
router.post('/', wallpaperController.createWallpaper);
router.post('/getX', wallpaperController.getXWallpapers);
router.patch('/:id', wallpaperController.updateWallpaper);
router.delete('/:id', wallpaperController.deleteWallpaper);

export default router;