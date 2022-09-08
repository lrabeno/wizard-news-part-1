const express = require("express");
const app = express();

const morgan = require("morgan");
const postBank = require("./postBank");
app.use(morgan("dev"));

app.use(express.static("public"));

// app.get("/", (req, res) => res.send("Hello World!"));

app.get("/", (req, res) => {
  // First, get the list of posts.
  const posts = postBank.list();

  // Then, prepare some HTML to send as output.
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts
        .map(
          (post) => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>${post.title}
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
        )
        .join("")}
    </div>
  </body>
</html>`;

  // Finally, sent a response.
  res.send(html);
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
