import {readFileSync, writeFileSync} from "fs";

const FICHIER = "./data/phobie.json";

function getPhobies() {
  return JSON.parse(
    readFileSync(FICHIER, "utf-8")
  );
}


function getPhobieById(id) {

  const phobies = getPhobies();

  return phobies.find(p => p.id === id);
}


function addPhobie(phobie) {

  const phobies = getPhobies();

  const dernierId = phobies.reduce(
    (max, p) => Math.max(max, p.id),
    0
  );

  const nouvellePhobie = {id: dernierId + 1, ...phobie};

  phobies.push(nouvellePhobie);

  save(phobies);

  return nouvellePhobie;
}


function updatePhobie(id, newPhobie) {

  const phobies = getPhobies();

  const index = phobies.findIndex(p => p.id === id);

  if (index === -1) {
    return null;
  }

  phobies[index] = {id, ...newPhobie};

  save(phobies);

  return phobies[index];
}


function deletePhobie(id) {

  const phobies = getPhobies();

  const index = phobies.findIndex(p => p.id === id);

  if (index === -1) {
    return null;
  }

  const phobieDeleted =
    phobies.splice(index, 1)[0];

  save(phobies);

  return phobieDeleted;
}


function save(phobies) {

  writeFileSync(
    FICHIER,
    JSON.stringify(phobies, null, 2),
    "utf-8"
  );
}

export {
  getPhobies,
  getPhobieById,
  addPhobie,
  updatePhobie,
  deletePhobie
};
