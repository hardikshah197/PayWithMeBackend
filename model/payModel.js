const mongoose = require('mongoose');

const pay_model = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: 0
    },
    vpa: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true
    },
    qrcode: {
        type: String,
        required: true
    },
    bg_color:{
        type: String,
        default:'#000000'
    },
    logo: {
        type: String
    }
});

module.exports = mongoose.model('pay_model',pay_model);