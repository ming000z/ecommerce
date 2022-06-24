// mogo password：pukpMNBeV0KLpA4Z

// mongodb+srv://miz221:pukpMNBeV0KLpA4Z@cluster0.qu3ph.mongodb.net/amazona?retryWrites=true&w=majority

import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connect to DB successfully')
    })
    .catch((err) => {
        console.log(err.message);
    });

const app = express();

app.get('/api/products', (req, res) => {
    res.send(data.products);
});

app.get('/api/product/slug/:slug', (req, res) => {
    const product = data.products.find((x) => x.slug === req.params.slug);
    if (product) {
        res.send(product);
    } else{
        res.status(404).send({message: 'Product not Found'})
    }
});

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id);
    if (product) {
        res.send(product);
    } else{
        res.status(404).send({message: 'Product not Found'})
    }
});


app.listen(3001, () => {
    console.log('serve successfully');
})