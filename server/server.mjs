// framework for building servers
import express from "express";
// middleware for logging incoming requests
import morgan from "morgan";
// middleware that parses incoming requests
import bp from "body-parser";

const app = express();

// EMPTY DATABASE
const db = {
  todos: [],
};

// SET UP MIDDLEWARE
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(morgan("dev"));

// SET UP ROUTES
app.post("/todos", (req, res) => {
  const newTodo = {
    id: Date.now(),
    text: req.body.text,
  };

  db.todos.push(newTodo);
  res.json({ data: newTodo });
});

app.get("/todos", (req, res) => {
  res.json({ data: db.todos });
});

app.get("/todos/:id", (req, res) => {
  const todo = db.todos.find((t) => t.id.toString() === req.params.id);
  res.json({ data: todo });
});

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
