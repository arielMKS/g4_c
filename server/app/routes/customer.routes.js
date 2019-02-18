const router = require("express").Router();

const customerController = require("../controllers/customer.controller");

// handle "api/customers"
router.post("/search", customerController.search);
router.get("/", customerController.getAll);

module.exports = router;
