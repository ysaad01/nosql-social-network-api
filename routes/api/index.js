const router = require("express").Router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

/* add `/user` to imported user-routes */
router.use("/users", userRoutes);

/* add `/thought` to imported thought-routes */
router.use("/thoughts", thoughtRoutes);

module.exports = router;
