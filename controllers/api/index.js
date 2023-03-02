const router = require("express").Router();
const userRoutes = require("./userRoutes");
const dashboardRoutes = require("./dashboard");

router.use("/users", userRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
