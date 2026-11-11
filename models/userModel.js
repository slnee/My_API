import {readFileSync} from "fs";

const FICHIER = "./data/user.json";

function getUsers() {

  return JSON.parse(
    readFileSync(FICHIER, "utf-8")
  );

}

function checkIdentifiants(email, password) {

  const users = getUsers();

  const user = users.find(u =>
    u.email === email &&
    u.password === password
  );

  return user || null;

}

export default{
  getUsers,
  checkIdentifiants
};
