const router = require("express").Router();

const apiRoutes = require("./api"); //refers to the api folder
const homeRoutes = require("./homeRoutes"); //refers to the homeRoutes.js file

router.use("/", homeRoutes); // direct users to homeRoutes
router.use("/api", apiRoutes); // if route has /api, direct to apiRoutes

module.exports = router;
