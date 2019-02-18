import axios from "axios";

export function search(payload) {
  return axios
    .post("/api/customers/search", payload)
    .then(response => {
      return response;
    })
    .catch();
}

export function getAll() {
  return axios
    .get("/api/customers")
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log("There was an error!");
    });
}
