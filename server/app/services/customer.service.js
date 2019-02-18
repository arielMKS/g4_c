var fs = require("fs");

var data = fs.readFileSync("./customers.json");
var customers = JSON.parse(data);

// this function filters through customers.json file; Promise() not used here
const search = (firstName, lastName, email, ipAddress) => {
  var firstName = firstName.trim().toUpperCase();
  var lastName = lastName.trim().toUpperCase();
  var fullName = firstName + lastName;
  var email = email.trim().toUpperCase();

  // handle email or ipAddress
  if (email || ipAddress) {
    return customers.filter(item => {
      if (item.email.toUpperCase() === email || item.ip === ipAddress) {
        return item;
      }
    });
  } else if (firstName && lastName) {
    // handle fullname
    return customers.filter(item => {
      if (
        item.first_name.toUpperCase().concat(item.last_name.toUpperCase()) ===
        fullName
      ) {
        return item;
      }
    });
  } else if (lastName) {
    // handle partial or full lastname
    return customers.filter(item => {
      if (item.last_name.toUpperCase().includes(lastName)) return item;
    });
  }
  return [];
};

// this function filters through customers.json file; this method uses Promise()
const getAll = () => {
  return new Promise(function(resolve, reject) {
    fs.readFile("./customers.json", "utf8", (err, data) => {
      if (err) throw err;
      else resolve(data);
    });
  })
    .then(response => {
      return JSON.parse(response);
    })
    .catch(error => console.log("Error in customer service!!"));
};

module.exports = {
  search,
  getAll
};
