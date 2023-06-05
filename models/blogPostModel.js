import {Schema, model} from 'mongoose'

const BlogPostSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: false,
        default: 'https://picsum.photos/800/400'
    },
    readTime: {
        value: {
            type: Number,
            required: false,
            default: 0
        },
        unit: {
            type: String,
            required: false,
            default: 'minutes'
        }
    },
    author: {
        name: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: false,
            default: 'https://picsum.photos/200/200'
        }
    },
    content: {
        type: String,
        required: true
    }
})

const BlogPostsModel = model('BlogPosts', BlogPostSchema, 'blogPosts')
export default BlogPostsModel