const router = require("../routes/userRoutes");
const users = require("../models/User");
const { validationResult } = require("express-validator");

// container for user controller
const controller = {};
/**
 * @route get /api/user
 * @desc RETURN ALL USERS
 * @Access Private
 */
controller.getUser = async (req, res) => {
  try {
    const user1 = await users.find().sort();
    res.json(user1);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("server error");
  }
};

/**
 * @route POST /api/user
 * @desc ADD A NEW USER TO THE DATABASE
 * @Access private
 */
controller.addUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const { name, email, phone } = req.body;
  try {
    const newUser = new users({ name, email, phone });
    userr = await newUser.save();
    res.status(201).json(userr);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
};
/**
 * @route Put /api/user/:id
 * @desc EDIT A USER BY ID
 * @Access private
 */
controller.updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone } = req.body;
  // build user object
  const userFields = {};
  if (name) userFields.name = name;
  if (email) userFields.email = email;
  if (phone) userFields.phone = phone;
  try {
    let user = await users.findById(id);

    if (!user) return res.status(404).json({ msg: "user not found" });

    user = await users.findByIdAndUpdate(
      id,
      { $set: userFields },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
};
/**
 * @route UPDATE /api/user/id
 * @desc REMOVE A USER BY ID
 * @Access private
 */
controller.removeUser = async (req, res) => {
  const id = req.params.id;
  try {
    let user = await users.findById(id);

    if (!user) return res.status(404).json({ msg: "user not found" });

    await users.deleteOne({ _id: id });
    res.json({ msg: "user removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
};
//export the module

module.exports = controller;