import express from "express";
import BlogPostsModel from "../models/blogPostModel.js";
import { validationResult } from "express-validator";
import { postsValidation } from "../middlewares/validatePosts.js";
import BlogAuthorsModel from "../models/blogAuthorModel.js";

const posts = express.Router();

posts.get("/blogPosts", async (req, res) => {
  const { page = 1, pageSize = 3, title = '' } = req.query;
  const regExp = new RegExp(title, 'i');
  try {
    const posts = await BlogPostsModel.find({title: regExp})
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    const postsCount = await BlogPostsModel.count({title: regExp});
    res.status(200).send({
      count: postsCount,
      currentPage: Number(page),
      totalPages: Math.ceil(postsCount / pageSize),
      statusCode: 200,
      posts,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      statusCode: 500,
    });
  }
});

posts.get("/blogPosts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await BlogPostsModel.findOne({ _id: id });
    if (!post) {
      return res.status(404).send({
        message: `post by id ${id} doesn't exist`,
        statusCode: 404,
      });
    }
    res.status(200).send({
      statusCode: 200,
      message: "operation performed",
      post,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      statusCode: 500,
    });
  }
});

posts.get("/authors/:id/blogPosts", async (req, res) => {
  const { id } = req.params;
  try {
    const authorExists = await BlogAuthorsModel.findOne({ _id: id });
    if (!authorExists) {
      return res.status(404).send({
        message: `author by id ${id} not found`,
        statusCode: 404,
      });
    }
    const authorName = `${authorExists.firstName} ${authorExists.lastName}`;
    const { page = 1, pageSize = 3 } = req.query;
    const posts = await BlogPostsModel.find({
        "author.name": authorName
        
    })
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    const postsCount = await BlogPostsModel.count();
    res.status(200).send({
      count: postsCount,
      currentPage: Number(page),
      totalPages: Math.ceil(postsCount / pageSize),
      statusCode: 200,
      posts
    });
  } catch (error) {
    res.status(500).send({
        message: "Internal server error",
        statusCode: 500
      });
  }
});

posts.post("/blogPosts", postsValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array(),
      statusCode: 400,
    });
  }
  const post = new BlogPostsModel({
    category: req.body.category,
    title: req.body.title,
    cover: req.body.cover,
    readTime: req.body.readTime,
    author: req.body.author,
    content: req.body.content,
  });

  try {
    const postExists = await BlogPostsModel.findOne({ title: req.body.title });
    if (postExists) {
      return res.status(409).send({
        message: "post with this title already exists",
        statusCode: 409,
      });
    }
    const newPost = await post.save();
    res.status(201).send({
      message: "post saved successfully",
      statusCode: 201,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      statusCode: 500,
    });
  }
});

posts.patch("/blogPosts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await BlogPostsModel.findById(id);
    if (!post) {
      return res.status(404).send({
        message: `post by id ${id} not found`,
        statusCode: 404,
      });
    }
    const newData = req.body;
    const option = { new: true };
    const result = await BlogPostsModel.findByIdAndUpdate(id, newData, option);
    res.status(200).send({
      message: `post by id ${id} edited successfully`,
      statusCode: 200,
      result,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      statusCode: 500,
    });
  }
});

posts.delete("/blogPosts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await BlogPostsModel.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).send({
        message: `post by id ${id} not found`,
        statusCode: 404,
      });
    }
    res.status(200).send({
      message: `post by id ${id} deleted`,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      statusCode: 500,
    });
  }
});

export default posts;
