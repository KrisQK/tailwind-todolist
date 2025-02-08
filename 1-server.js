const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;
const db = new sqlite3.Database(":memory:"); // 使用内存数据库

// 启用跨域和JSON解析
app.use(cors());
app.use(bodyParser.json());

// 初始化数据库表
db.serialize(() => {
    db.run(
        "CREATE TABLE todos (id INTEGER PRIMARY KEY, title TEXT, completed BOOLEAN)"
    );
});

// 获取所有待办事项
app.get("/todos", (req, res) => {
    db.all("SELECT * FROM todos", (err, rows) => {
        res.json(rows);
    });
});

// 添加新待办事项
app.post("/todos", (req, res) => {
    const { title } = req.body;
    db.run(
        "INSERT INTO todos (title, completed) VALUES (?, ?)",
        [title, false],
        function (err) {
            res.json({ id: this.lastID, title, completed: false });
        }
    );
});

// 更新待办事项状态
app.put("/todos/:id", (req, res) => {
    const { completed } = req.body;
    db.run(
        "UPDATE todos SET completed = ? WHERE id = ?",
        [completed, req.params.id],
        () => {
            res.sendStatus(200);
        }
    );
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
