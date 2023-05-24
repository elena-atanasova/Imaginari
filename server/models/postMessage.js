import mongoose from 'mongoose';

const postSchema = mongoose.Schema({

    title: String,
    message: String,
    name: String,
    creator: String,    // artist
    tags: [String],
    selectedFile: String,   // the artwork

    likes: {
        type: [String], // array of strings, of IDs
        default: [],
    },

    comments: {
        type: [String],
        default: [],
    },

    // when is the artwork created
    createdAt: {
        type: Date,
        default: new Date()
    },

});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;