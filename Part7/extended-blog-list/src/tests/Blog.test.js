import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";
import CreateBlog from "../components/CreateBlog";

describe("testing Blog componenet", () => {
  let container;

  const blog = {
    user: "5a43e6b6c37f3d065eaaa581",
    likes: 1,
    author: "Joel Spolsky",
    title: "The Joel Test: 12 Steps to Better Code",
    url: "https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/",
  };
  const mockHandler = jest.fn();
  beforeEach(() => {
    container = render(
      <Blog blog={blog} handleLike={mockHandler}></Blog>
    ).container;
  });

  test("should render blog title and author coorectly", () => {
    const blog = {
      user: "5a43e6b6c37f3d065eaaa581",
      likes: 1,
      author: "Joel Spolsky",
      title: "The Joel Test: 12 Steps to Better Code",
      url: "https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/",
    };

    const element = container.querySelector("visible");
    const notVisible = container.querySelector("notVisible");
    expect(element).toBeDefined();
    expect(notVisible).toBeNull();
  });

  test("should render likes and url when button is clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const element = container.querySelector("notVisible");
    expect(element).toBeDefined();
  });

  test("should call like handler twice if like button is clicked twice", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const like = screen.getByText("Like");
    await user.click(like);
    await user.click(like);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});

describe("testing ceateBlog component", () => {
  test("should call createBlog with the right data", async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();
    render(<CreateBlog createBlog={createBlog} />);

    const author = screen.getByPlaceholderText("author");
    const title = screen.getByPlaceholderText("title");
    const Url = screen.getByPlaceholderText("Url");

    const sendButton = screen.getByText("Create");

    await user.type(author, "Joel Spolsky");
    await user.type(title, "The Joel Test: 12 Steps to Better Code");
    await user.type(
      Url,
      "https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/"
    );

    await user.click(sendButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].author).toBe("Joel Spolsky");
    expect(createBlog.mock.calls[0][0].title).toBe(
      "The Joel Test: 12 Steps to Better Code"
    );
    expect(createBlog.mock.calls[0][0].url).toBe(
      "https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/"
    );
  });
});
