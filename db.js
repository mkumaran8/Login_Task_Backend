
import express from "express";
import mysql from "mysql";
import cors from "cors";
// import jwt from "jsonwebtoken";


const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
})

//POST Method for signup
app.post("/signup", (req, res) => {
  const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES(?)"
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
  ]
  db.query(sql, [values], (err, result) => {
    if (err) return res.json({ Message: "Error in Node" });
    return res.json(result);
  })
})

//POST Method for login
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE email = ? and password = ?"
  db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    if (result.length > 0) {
      return res.json({ Login: true })
    } else {
      return res.json({ Login: false })
    }
  })
})


app.listen(8081, () => {
  console.log("Connected to the server");
})
