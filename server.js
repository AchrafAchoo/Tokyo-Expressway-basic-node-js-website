const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const USERS_FILE = path.join(__dirname, "js", "crud.json");

app.post("/js/crud", (req, res) => {
    const newUser = req.body;

    fs.readFile(USERS_FILE, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send({ error: "Error reading file" });
        }

        let users;
        try {
            users = JSON.parse(data);
        } catch (e) {
            users = [];
        }

        users.push(newUser);

        fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send({ error: "Error saving file" });
            }
            res.send({ message: "User saved successfully!" });
        });
    });
});

app.get("/js/crud", (req, res) => {
    fs.readFile(USERS_FILE, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send({ error: "Error reading file" });
        }

        let users;
        try {
            users = JSON.parse(data);
        } catch (e) {
            users = [];
        }

        res.json(users);
    });
});

app.put("/js/crud", (req, res) => {
    const updatedUsers = req.body;

    fs.writeFile(USERS_FILE, JSON.stringify(updatedUsers, null, 2), (err) => {
        if (err) {
            return res.status(500).send({ error: "Error updating file" });
        }
        res.send({ message: "Data updated successfully!" });
    });
});

app.delete("/js/crud", (req, res) => {
    fs.writeFile(USERS_FILE, JSON.stringify([], null, 2), (err) => {
        if (err) {
            return res.status(500).send({ error: "Error clearing file" });
        }
        res.send({ message: "All data cleared successfully!" });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
