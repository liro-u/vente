import mongoose from "mongoose";

const userAddProductSchema = new mongoose.Schema({
    wallpaperId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const UserAddProduct = mongoose.model('userAddProduct', userAddProductSchema);

export default UserAddProduct;