import {Schema, model} from 'mongoose'

const BlogAuthorSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    }
}, {
    timestamps: true, strict: true
})

const BlogAuthorsModel = model('BlogAuthorModel', BlogAuthorSchema, 'blogAuthors')
export default BlogAuthorsModel