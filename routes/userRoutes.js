const express = require("express");
const { body } = require("express-validator");
const {
  getUser,
  addUser,
  updateUser,
  removeUser,
} = require("../controllers/userController");
const router = express.Router();

router.get("/", getUser);
router.post(
  "/",
  [
    body("name", "Name is required").notEmpty(),
    body("email", "please include a valid email").isEmail(),
  ],
  addUser
);
router.put("/:id", updateUser);
router.delete("/:id", removeUser);

module.exports = router;
