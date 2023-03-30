import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        set: function(val) {
            return parseFloat(val).toFixed(2);
        },
        required: true
    },
}, { timestamps: true });

const Product = mongoose.model('product', productSchema);

export default Product;