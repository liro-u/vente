import express from "express";
import wallpaperController from "../controllers/wallpaperController.js"

// restrictions
import requireAuth from '../middleware/restriction/requireAuth.js';
import requireRole from "../middleware/restriction/requireRole.js";

const router = express.Router();

router.get('/', wallpaperController.getWallpapers);
router.get('/:id', wallpaperController.getWallpaper);
router.post('/getX', wallpaperController.getXWallpapers);
router.post('/download', wallpaperController.downloadWallpaper);

// permission
router.use(requireAuth) // be sure user is login to use this controller
router.use(requireRole.requireRoleArtist) // be sure the user is at least an artist to use this controller

router.post('/', wallpaperController.createWallpaper);
router.patch('/:id', wallpaperController.updateWallpaper);
router.delete('/:id', wallpaperController.deleteWallpaper);

export default router;