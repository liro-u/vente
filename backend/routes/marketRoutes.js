import express from 'express';
import marketController from '../controllers/marketController.js';
import requireAuth from '../middleware/restriction/requireAuth.js';
import requireRole from "../middleware/restriction/requireRole.js";

const router = express.Router()

router.use(requireAuth) // be sure user is login to use this controller
router.get('/', marketController.getProductRelations)
router.post('/', marketController.createProductRelation)
router.delete('/:id', marketController.deleteProductRelation)
router.patch('/:id', marketController.updateProductRelation)
router.get('/product/', marketController.getProducts)

router.use(requireRole.requireRoleAdmin) // be sure the user is at least an artist to use this controller
router.post('/product/', marketController.createProduct)

export default router;