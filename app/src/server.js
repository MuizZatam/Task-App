const express = require("express");
const app = express();
const PORT = 3000;
const task_routes = require("./routes/task_routes");
const auth_routes = require("./routes/auth_routes");
const general_routes = require("./routes/general_routes");

app.use(express.json());
app.use("/", general_routes);
app.use("/api/auth", auth_routes);
app.use("/api/tasks", task_routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
