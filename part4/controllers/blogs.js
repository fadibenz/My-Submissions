const blogsRouter = require("express").Router();
const blog = require("../models/blog");
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { name: 1, username: 1 });
  response.status(200).json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response
      .status(400)
      .json({ error: "Title and URL are required fields" });
  }

  const user = request.user;
  const { title, author, url, likes = 0 } = request.body;

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  });
  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    response.status(500).json({ error: "Failed to save the blog post" });
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user;
  try {
    const deletedBlog = await Blog.findById(request.params.id);

    if (!deletedBlog) {
      response.status(404).json({ message: "Blog not found." });
    }
    if (user._id.toString() === deletedBlog.user.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      response.status(401).json({ error: "Not authorized" });
    }
  } catch (error) {
    response.status(400).json({ message: "Error deleting blog." });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    if (!updatedBlog) {
      response.status(404).json({ message: "Blog not found." });
    } else {
      response.json(updatedBlog);
    }
  } catch (error) {
    response.status(400).json({ message: "Error updating blog likes." });
  }
});

module.exports = blogsRouter;
