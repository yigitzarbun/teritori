const router = require("express").Router();
const usersModel = require("./users-model");

router.get("/", async (req, res, next) => {
  try {
    const users = await usersModel.getAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await usersModel.getById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
