const express = require("express");
const cors = require("cors"); // 允许跨域请求
const app = express();
const port = 3000;

// 任务列表数据（临时存储在内存中）
let tasks = [];

// 中间件
app.use(cors());
app.use(express.json()); // 解析 JSON 数据
app.use(express.urlencoded({ extended: true })); // 解析表单数据

// 获取所有任务
app.get("/tasks", (req, res) => {
  res.json(tasks);
  console.log(`✅ 获取所有任务
 http://localhost:${port}`);
});

// 添加任务
app.post("/tasks", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "任务内容不能为空" });

  const newTask = { id: Date.now(), text };
  tasks.push(newTask);
  res.status(201).json(newTask);
  console.log(`✅ 添加任务http://localhost:${port}`);
});

// 删除任务
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== taskId);
  res.status(200).json({ message: "任务已删除" });
  console.log(`✅ 任务已删除服务器运行在 http://localhost:${port}`);
});

// 启动服务器
app.listen(port, () => {
  console.log(`✅ 服务器运行在 http://localhost:${port}`);
});
