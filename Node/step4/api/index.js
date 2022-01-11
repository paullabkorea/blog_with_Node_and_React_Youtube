// npm init --yes
// npm i express mongoose dotenv multer
// npm install --save-dev nodemon 
// package.json에서 
// "test": "echo \"Error: no test specified\" && exit 1"를
// "start" : "nodemon index.js"로 고치고
// npm start

//////////////////

// cd api
// npm i
// npm i multer // 파일 업로드 모듈

//////////////////

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer"); // 파일 업로드 모듈
const path = require("path");

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("DB 연결 완료!"))
    .catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => { //cb는 콜백함수
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, "hello2.png"); // 파일이름
    },
});

// postman에서 
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute); // const authRoute = require("./routes/auth"); 와 연결
app.use("/api/users", userRoute); // const userRoute = require("./routes/user"); 와 연결
app.use("/api/posts", postRoute); // const postRoute = require("./routes/post"); 와 연결
app.use("/api/categories", categoryRoute); // const categoryRoute = require("./routes/categories"); 와 연결

app.listen("8080", () => {
  console.log("노드 실행 중");
});