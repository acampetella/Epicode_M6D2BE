import {body} from 'express-validator'

export const postsValidation = [
    body('category').notEmpty().isString().withMessage("category can't be empty and must be a string"),
    body('content').notEmpty().isString().withMessage("content can't be empty and must be a string"),
    body('title').notEmpty().isString().withMessage("title can't be empty and must be a string"),
    body('author.name').notEmpty().isString().withMessage("author name can't be empty and must be a string")
]