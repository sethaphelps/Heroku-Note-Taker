const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const PORT = 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Makes route for homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Makes route for notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.post("/api/notes", (req, res) => {
  let title = req.body.title;
  let text = req.body.text;
  let newNote = { title, text, id: uuidv4() };

  fs.readFile("db/db.json", "utf-8", (err, data) => {
    let createdNotes = JSON.parse(data);
    createdNotes.push(newNote);
    fs.writeFile("db/db.json", JSON.stringify(createdNotes), (err) => {
      err
        ? console.log("this is the error", err)
        : console.log(newNote.title + "has been created");
    });
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });
});

// app.get("/notes", (req, res) => {
//   res.sendFile(path.join(__dirname, "/public/notes.html"));
// });

// app.post("/api/notes", (req, res) => {
//   let title = req.body.title;
//   let text = req.body.text;
//   let newNote = { title, text, id: uuidv4() };

//   fs.readFile("db/db.json", "utf-8", (err, data) => {
//     let createdNotes = JSON.parse(data);
//     createdNotes.push(newNote);
//     fs.writeFile("db/db.json", JSON.stringify(createdNotes), (err) => {
//       err
//         ? console.log("this is the error", err)
//         : console.log(newNote.title + "has been created");
//     });
//     res.sendFile(path.join(__dirname, "public/notes.html"));
//   });
// });

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
