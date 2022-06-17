import React, { useEffect, useState, useReducer } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import logger from 'use-reducer-logger';
//import data from '../data';

const reducer = (state, action) => {
    switch(action.type){
        case 'FETCH_REQUEST':
            return {...state, loading: true};
        case 'FETCH_SUCCESS':
            return {...state, products: action.payload, loading: true};
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
}

function HomeScreen() {
    const [{loading, error, products}, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true, 
        error: '',
    });
    // define a state to save the products from backend
    // return a variable [products] and a function [setProducts] to update the vairable
    // const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            dispatch({type: 'FETCH_REQUEST'});
            try {
                const result = await axios.get('/api/products');
                dispatch({type: 'FETCH_SUCCESS', payload: result.data });
            }catch(err){
                dispatch({type: 'FETCH_FAIL', payload: err.message});
            }
            
        };
        // setProducts(result.data);
        fetchData();
    }, []);
    return <div>
        <h1>Featured Products</h1>
        <div className="products">
            {
                products.map((product) => (
                <div className="product" key={product.slug}>
                <Link to={`/product/${product.slug}`}>
                    <img src={product.image} alt={product.name}/>
                </Link>
                <div className="product-info">
                <Link to={`/product/${product.slug}`}>
                    <p>{product.name}</p>
                </Link>
                    <p><strong>${product.price}</strong></p>
                    <button>Add To Chart</button>
                </div>
                
                </div>
            ))

            }
        </div>
    </div>
}

export default HomeScreen;