const mongoose = require('mongoose');
const mongoos = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;

var wishList = new Schema({
    title :  {type: String, default: "Cool Wish List"},  
    products : [{type: ObjectId, ref : 'Product'}]
});

module.exports = mongoose.model('WishList', wishList);
