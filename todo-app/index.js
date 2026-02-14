const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let todos = [];
let id = 1;

// Home Page
app.get("/", (req, res) => {
  res.render("index", { todos });
});

// Add Todo
app.post("/add", (req, res) => {
  const newTodo = {
    id: id++,
    task: req.body.task,
  };
  todos.push(newTodo);
  res.redirect("/");
});

// Delete Todo
app.post("/delete/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== todoId);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");

  setTimeout(() => {
    console.error("ERROR: Intentional crash for testing ECS alert");
    process.exit(1);
  }, 5000); // 5 seconds
});
