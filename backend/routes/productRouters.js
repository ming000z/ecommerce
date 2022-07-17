import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/ProductModel.js';
import expressAsyncHandler from 'express-async-handler';

const productRouter = express.Router();

productRouter.get('/', async(req, res) => {
    const products = await Product.find();
    res.send(products);
});

productRouter.get(
    '/categories',
    expressAsyncHandler(async (req, res) => {
        const categories = await Product.find().distinct('category');
        res.send(categories);
    })
)

productRouter.get('/slug/:slug', async (req, res) => {
    const product = await Product.findOne({ slug:req.params.slug });
    if (product) {
        res.send(product);
    } else{
        res.status(404).send({message: 'Product not Found'})
    }
});

productRouter.get('/:id', async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id.trim());
    const product = await Product.findById(id);
    if (product) {
        res.send(product);
    } else{
        res.status(404).send({message: 'Product not Found'})
    }
});

export default productRouter;