const express = require("express");
const Path = require("path");
const app = express();
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(Path.join(__dirname, "public")));

app.get("/", (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        res.render("index",{files: files});  
    })
});
app.get("/file/:filename", (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8" ,(err, data) => {
        res.render("show",{filename: req.params.filename, filedata: data});
    })
    
});
app.post("/create", (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.details, (err) => {
        res.redirect("/");
    });
    
});


app.listen(3000);