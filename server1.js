const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

let task = [];

app.use(cors());
app.use(express.json);
// 获取所有任务
app.get("/list", (req, res) => {
  res.json(list);
  console.log(`zhengzaiyunxing:${port}`);
});

app.post("task", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "别输入空的内容气我" });

  const newShuru = { id: Date.now(), text };
  list.push(newShuru);
  res.status(201).json(newShuru);
  console.log(`zhengzaiyunxing:${port}`);
});

app.delete("/list/:id", (req, res) => {
  const shuruID = parseInt(req.params.id);
  list = list.filter((task) => list.id !== shuruID);
  res.status(200).json({ message: "删完了!" });
  console.log(`zhengzaiyunxing:${port}`);
});

app.listen(port, () => {
  console.log(`zhengzaiyunxing:${port}`);
});
