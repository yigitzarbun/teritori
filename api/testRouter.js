const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    res.json({
      status: 200,
      message: "get data successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
