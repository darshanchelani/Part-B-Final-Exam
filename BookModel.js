const mongoose = require('mongoose');

const BookAPI = new mongoose.Schema({
    title: {
        type: String,
        
    },
    author: {
        type: String,
        
    },

});

module.exports = mongoose.model('BookAPI', BookAPI);
