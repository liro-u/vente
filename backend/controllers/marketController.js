import UserAddProduct from '../models/userAddProductModel.js';
import Product from '../models/productModel.js'

import mongoose from 'mongoose';

// Get all products relations
const getProductRelations = async (req, res) => {
    const user = req.user;

    const userAddProducts = await UserAddProduct.aggregate([
        // select only user basket
        { $match: { userId: user._id } },
        // wallpaper
        { $lookup: {
            from: 'wallpapers',
            localField: 'wallpaperId',
            foreignField: '_id',
            as : "wallpaperList"
        } },
        { $addFields: { "wallpaper": { $arrayElemAt: ["$wallpaperList", 0] } } },
        { $project: { "wallpaperList": 0 } },
        // product
        { $lookup: {
            from: 'products',
            localField: 'productId',
            foreignField: '_id',
            as : "productList"
        } },
        { $addFields: { "product": { $arrayElemAt: ["$productList", 0] } } },
        { $project: { "productList": 0 } },

    ])

    res.status(200).json(userAddProducts);
};

// POST a new Product relation
const createProductRelation = async (req, res) => {
    const user = req.user;
    const {wallpaperId, productId, quantity } = req.body;

    let emptyFields = [];

    if (!wallpaperId) {
        emptyFields.push('wallpaperId');
    }
    if (!productId) {
        emptyFields.push('productId')
    }
    if (!quantity) {
        emptyFields.push('quantity')
    }
    if (emptyFields.length > 0) {
        console.log(emptyFields)
        console.log(productId)
        console.log(quantity)
        return res.status(400).json({ error: 'Need more data to add to basket', emptyFields })
    }

    // add doc to db
    try {
        const userAddProduct = await UserAddProduct.create({ wallpaperId, userId: user._id, productId, quantity });
        res.status(200).json(userAddProduct);
    }
    catch (err) {
        console.log(err)
        res.status(400).json({error: err.message, emptyFields});
    }
}

// DELETE a product relation
const deleteProductRelation = async (req, res) => {
    const { id } = req.params;
    const user = req.user;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such wallpaper" });
    }

    const wallpaper = await Wallpaper.findOne({ _id: id });

    if (!wallpaper) {
        return res.status(400).json({ error: "No such wallpaper" });
    }else {
        if (user._id.toString() === wallpaper.artistId.toString() || user.role === 'admin') {
            await Wallpaper.findOneAndDelete({ _id: id });
            res.status(200).json(wallpaper);
        } else {
            res.status(401).json({ error: "request is not authorized" });
        }
    }
};

// UPDATE a product relation
const updateProductRelation = async (req, res) => {
    const { id } = req.params;
    const user = req.user;

    let emptyFields = [];

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such wallpaper", emptyFields });
    }

    const wallpaper = await Wallpaper.findOne({ _id: id });

    if (!wallpaper) {
        return res.status(400).json({ error: "No such wallpaper", emptyFields });
    }else{
        if (user._id.toString() === wallpaper.artistId.toString() || user.role === 'admin') {
            await Wallpaper.findOneAndUpdate({ _id: id }, {
                ...req.body
            })
            res.status(200).json(wallpaper);
        }else{
            res.status(401).json({ error: "request is not authorized" });
        }
    }
};

// POST a new Product
const createProduct = async (req, res) => {
    const {product, price } = req.body;

    let emptyFields = [];

    if (!product) {
        emptyFields.push('product');
    }
    if (price != 0 && !price) {
        emptyFields.push('price')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Need more data to add a new product', emptyFields })
    }

    // add doc to db
    try {
        const newProduct = await Product.create({ product, price });
        res.status(200).json(newProduct);
    }
    catch (err) {
        console.log(err)
        res.status(400).json({error: err.message, emptyFields});
    }
}

// Get all products
const getProducts = async (req, res) => {
    const products = await Product.find({});

    res.status(200).json(products);
};

export default {
    getProductRelations,
    createProductRelation,
    deleteProductRelation,
    updateProductRelation,
    createProduct,
    getProducts
}