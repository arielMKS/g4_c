const customerService = require("../services/customer.service");

const search = (req, res) => {
  const { firstName, lastName, email, ipAddress } = req.body;

  // HERE IS A METHOD WITHOUT USING A PROMISE
  let response = customerService.search(firstName, lastName, email, ipAddress);
  res.status(200).json(response);
};

const getAll = (req, res) => {
  // res.status(200).json(customerService.getAll());
  customerService
    .getAll()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log("CUSTOMER CONTROLLER ERROR!");
    });
};

module.exports = {
  search,
  getAll
};
