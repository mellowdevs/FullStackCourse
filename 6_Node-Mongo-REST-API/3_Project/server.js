const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Product = require('./model/product');
const WishList = require('./model/wishlist');
const { request, response } = require('express');
const wishlist = require('./model/wishlist');
const port = 3000;
const db = mongoose.connect('mongodb://localhost/swap-shop');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// Product
app.post('/product', (req, res) => {
    var product = new Product();
    product.title = req.body.title;
    product.price = req.body.price;
    product.save((err, savedProduct) => {
        if(err) {
            res.status(500).send({error: "error saving product " + product.title});
        } else {
            res.send(savedProduct);
        }
    });
});

app.get('/product', (req, res) => {
    Product.find({}, (err, products) => {
        if (err) {
            res.status(500).send({error: "error finding products."});
        } else {
            res.send(products);
        }
    });
});

// WishList
app.post('/wishlist', (req, res) => {
    var wishList = new WishList();
    wishList.title = req.body.title;
    wishList.save((err, savedWishList) => {
        if(err) {
            res.status(500).send({error: "error saving wish list "});
        } else {
            res.send(savedWishList);
        }
    });
});

app.put('/wishlist/product/add', (req, res) => {
    Product.findOne({_id: req.body.productId}, (err, product) => {
        if (err) {
            res.status(500).send({error: "error adding product to wish list "});
        } else {
            WishList.update({_id : req.body.wishListId}, {$addToSet:
            {products : product._id}}, (err, wishList) => {
                if(err) {
                    res.status(500).send({error: "error updating wish list "});
                } else {
                    res.send(wishList);
                } 
            });
        }
    });
});

app.get('/wishlist', (req, res) => {
    WishList.find({}).populate({path : 'products', model : 'Product'}).exec((err, wishLists) => {
        if (err) {
            res.status(500).send({error: "error fetching wish list"});
        } else {
            res.send(wishLists);
        }
    });
});




app.listen(port,  function(){
    console.log(`Listening on port ${port}`);
});