const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    snippet: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    }

}, { timestamps: true });

// will look for Blogs on atlas
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog