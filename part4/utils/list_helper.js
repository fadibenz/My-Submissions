const _ = require("lodash");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => {
    return sum + item.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  let result;
  if (blogs.length > 0) {
    result = blogs.reduce(
      (max, current) => {
        return current.likes > max.likes
          ? {
              title: current.title,
              author: current.author,
              likes: current.likes,
            }
          : max;
      },
      {
        title: blogs[0].title,
        author: blogs[0].author,
        likes: blogs[0].likes,
      }
    );
  } else {
    result = {};
  }

  return result;
};

const mostBlogs = (blogs) => {
  if (blogs.length > 0) {
    const blogsByAuthor = _.groupBy(blogs, "author");
    let authorBlogs = [];
    console.log(blogsByAuthor);

    for (const blog in blogsByAuthor) {
      authorBlogs.push({
        author: blog,
        blogs: blogsByAuthor[blog].length,
      });
    }
    const result = authorBlogs.reduce((max, current) => {
      return current.blogs > max.blogs ? current : max;
    }, authorBlogs[0]);
    return result;
  } else return {};
};

const mostLikes = (blogs) => {
  if (blogs.length > 0) {
    const blogsByAuthor = _.groupBy(blogs, "author");
    let authorBlogs = [];

    for (const blog in blogsByAuthor) {
      authorBlogs.push({
        author: blog,
        likes: blogsByAuthor[blog].reduce((sum, item) => {
          return sum + item.likes;
        }, 0),
      });
    }
    const result = authorBlogs.reduce((max, current) => {
      return current.likes > max.likes ? current : max;
    }, authorBlogs[0]);
    return result;
  } else return {};
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
