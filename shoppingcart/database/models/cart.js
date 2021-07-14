const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    items: Array,
    name: String,
    address: String
});
module.exports = mongoose.model('cart', cartSchema, 'carts');
