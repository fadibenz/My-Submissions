const mongoose = require("mongoose");
mongoose.set("bufferTimeoutMS", 30000);
const supertest = require("supertest");
const app = require("../index");
const Blog = require("../models/blog");
const helper = require("../utils/test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of helper.Initial_blogs) {
    const BlogObj = new Blog(blog);
    await BlogObj.save();
  }
}, 100000);

test("notes are returned correctly as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("notes are the correct number", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.Initial_blogs.length);
});

test("id is defined", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

test("Blog is added Succefully", async () => {
  const listOneBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  };

  await api
    .post("/api/blogs")
    .send(listOneBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.Initial_blogs.length + 1);
}, 1000000);

test("should default likes to 0", async () => {
  const newBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  };

  const response = await api.post("/api/blogs").send(newBlog).expect(201);
  expect(response.body.likes).toBe(0);
});

test("should respond with 400 when url missing", async () => {
  const newBlog = {
    title: "React patterns",
    author: "Michael Chan",
  };
  await api.post("/api/blogs").send(newBlog).expect(400);

}, 100000);

test("should respond with 400 when title is missing", async () => {
  const newBlog = {
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  };
  await api.post("/api/blogs").send(newBlog).expect(400);
}, 100000);



describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await api.get("/api/blogs");
    const blogToDelete = blogsAtStart.body[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await api.get("/api/blogs");

    expect(blogsAtEnd.body).toHaveLength(helper.Initial_blogs.length - 1);
  });
});



describe("updating a blog", () => {
  test("succeeds with status code 200 if id is valid", async () => {
    // Get the list of blogs at the start
    const blogsAtStart = await api.get("/api/blogs");
    const blogToUpdate = blogsAtStart.body[0];


    // Update the likes for the blog
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);

    // Get the list of blogs at the end
    const blogsAtEnd = await api.get("/api/blogs");

    // Check if the likes are updated for the specific blog
    const updatedBlogAtEnd = blogsAtEnd.body.find(
      (blog) => blog.id === blogToUpdate.id
    );
    expect(updatedBlogAtEnd.likes).toBe(blogToUpdate.likes + 1);
  });

});



afterAll(async () => {
  await mongoose.connection.close();
});
