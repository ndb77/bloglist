const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // importing express app
const helper = require("./test_helper");

const api = supertest(app); // api is assigned a superagent object

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe(" Testing GET, POST, PUT, DELETE", () => {
  test("4.8 GET TEST: blog list application returns the blog posts in the JSON format", async () => {
    await api
      .get("/api/blogs") // makes api call
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");
  }, 5000);

  test("4.8 GET test: blog list application returns the correct number of blog posts", async () => {
    const blogs_recieved = await helper.blogsInDb();
    expect(blogs_recieved).toHaveLength(helper.initialBlogs.length);
  }, 5000);
  
  test("POST test: making an HTTP POST request to the /api/blogs url successfully creates a new blog post.", async () => {
    const new_post = {
      title: "String5",
      author: "String5",
      url: "String5",
      likes: 105,
    };
  
    await api.post("/api/blogs").send(new_post).expect(201);
  
    const blogs_recieved = await helper.blogsInDb();
    expect(blogs_recieved).toHaveLength(helper.initialBlogs.length + 1);
  });
  
  test('DELETE test: making an HTTP DELETE request to /api/blogs/:id deletes a given blog post',async ()=>{
    const current_blogs = await helper.blogsInDb()
    const id_to_delete = current_blogs[0].id
    await api.delete(`/api/blogs/${id_to_delete}`).expect(204)
    const deleted_blogs = await helper.blogsInDb()
    expect(deleted_blogs).toHaveLength(current_blogs.length-1);
  })

  test('PUT test: making an HTTP PUT request to /api/blogs/:id updates a given blog post',async ()=>{
    const current_blogs = await helper.blogsInDb()
    const id_to_update = current_blogs[0].id
    const updated_blog = {
      title: 'Noah',
      author: 'noah',
      id: id_to_update,
      url: 'urlhere',
      likes: 100
    }
    const updated_blog_post = await api.put(`/api/blogs/${id_to_update}`).send(updated_blog)
    expect(updated_blog_post.body).toEqual(updated_blog)

  })
});

