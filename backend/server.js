// mogo password：pukpMNBeV0KLpA4Z

// mongodb+srv://miz221:pukpMNBeV0KLpA4Z@cluster0.qu3ph.mongodb.net/amazona?retryWrites=true&w=majority

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRouters.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import path from 'path';

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

app.use(express.json())
app.use(express.urlencoded({ extended: true}));

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

// app.get('/api/products', (req, res) => {
//     res.send(data.products);
// });

// app.get('/api/product/slug/:slug', (req, res) => {
//     const product = data.products.find((x) => x.slug === req.params.slug);
//     if (product) {
//         res.send(product);
//     } else{
//         res.status(404).send({message: 'Product not Found'})
//     }
// });

// app.get('/api/products/:id', (req, res) => {
//     const product = data.products.find((x) => x._id === req.params.id);
//     if (product) {
//         res.send(product);
//     } else{
//         res.status(404).send({message: 'Product not Found'})
//     }
// });


// app.listen(3001, () => {
//     console.log('server successfully');
// })

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});