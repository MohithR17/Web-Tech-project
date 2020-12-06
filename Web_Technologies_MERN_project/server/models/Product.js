const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'//we can bring all the information about this user like this
    },
    title: {
        type: String,
        maxlength: 50
    },
    
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    SovenirPlace: {//changed ------------------------
        type: Number,
        default: 1
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true })//to know updated parameter


productSchema.index({ 
    title:'text' //search based on title

})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }