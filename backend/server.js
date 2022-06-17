import express from 'express';
import data from './data.js';

const app = express();

app.get('/api/products', (req, res) => {
    res.send(data.products);
});


app.listen(3001, () => {
    console.log('serve successfully');
})