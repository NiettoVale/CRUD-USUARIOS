const express = require("express");
const router = express.Router();
const createUser = require("../controllers/createUser");
const deleteUser = require("../controllers/deleteUser");
const updateUser = require("../controllers/updateUser");
const getAllUsers = require("../controllers/getAllUsers");

// Ruta /register:
router.post("/register", createUser);
router.delete("/user/:userId", deleteUser);
router.put("/user/:userId", updateUser);
router.get("/user", getAllUsers);

module.exports = router;
