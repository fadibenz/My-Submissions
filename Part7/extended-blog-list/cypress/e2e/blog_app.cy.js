describe("Blog app", function () {
  const user = {
    name: "fadi",
    username: "FADDtest",
    password: "fadIIII",
  };
  const blog = {
    author: "Joel Spolsky",
    title: "The Joel Test: 12 Steps to Better Code",
    url: "https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/",
  };

  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type(user.username);
      cy.get("#password").type(user.password);
      cy.contains("login").click();
      cy.contains(`${user.username} is logged in`);
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type(user.username);
      cy.get("#password").type("wrong");
      cy.contains("login").click();
      cy.get(".error").contains("Wrong Username or Password");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("logged in user can ", () => {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", user).then(
        (response) => {
          localStorage.setItem(
            "loggedBlogappUser",
            JSON.stringify(response.body)
          );
          cy.visit("http://localhost:3000");
        }
      );
    });

    it("Create a new blog", () => {
      cy.contains("New Blog").click();
      cy.get("#author").type(blog.author);
      cy.get("#title").type(blog.title);
      cy.get("#url").type(blog.url);
      cy.contains("Create").click();
      cy.contains(`Added ${blog.title} by ${blog.author}`);
    });

    describe("when a note exists", () => {
      beforeEach(function () {
        cy.contains("New Blog").click();
        cy.get("#author").type(blog.author);
        cy.get("#title").type(blog.title);
        cy.get("#url").type(blog.url);
        cy.contains("Create").click();
      });

      it("like a blog", () => {
        cy.contains("view").click();
        cy.contains("Like Blog").click();
        cy.contains("Likes: 1");
      });

      it("delete a blog when created by user", () => {
        cy.contains("view").click();
        cy.contains("Delete").click();
        cy.contains(`${blog.title} ${blog.author}`).should("not.exist");
      });

      it("blogs are sorted correctly", async () => {
        cy.contains("view").click();
        cy.contains("Like Blog").click();
        cy.get("#author").type("whatever");
        cy.get("#title").type("whatever");
        cy.get("#url").type("whatever");
        cy.contains("Create").click();
        cy.get(`[data-testid="${blog.author}-${blog.title}"]`).should(
          "contain",
          "The Joel Test: 12 Steps to Better Code"
        );
        cy.get('[data-testid="whatever-whatever"]').should("contain", "whatever");
      });
    });
  });
});
