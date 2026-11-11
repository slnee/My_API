import * as phobieModel from "../models/phobieModel.js";
const PAR_PAGE = 20;


function getPhobies(req, res) {
  const page = parseInt(req.query.page)|| 1;
    if (page < 1) {
      return res.status(400).json({
      erreur: "Page invalide"
    });
  }

  const phobies = phobieModel.getPhobies();
  const start = (page - 1) * PAR_PAGE;
  const end = start + PAR_PAGE;
  const result = phobies.slice(start, end);

  res.json({
    page,
    parPage : PAR_PAGE,
    total : phobies.length,
    nombreDePages : Math.ceil(phobies.length /PAR_PAGE),
    phobies : result
    });
}


function getPhobie(req, res) {
  const id = parseInt(req.params.id);
  const phobie = phobieModel.getPhobieById(id);

  if (!phobie) {
    return res.status(404).json({
    erreur: "Phobie introuvable"
    });
  }

  res.json(phobie);
}


function addPhobie(req, res) {
  const {nom, category, description, rarete} = req.body;

  if (!nom || !category || !description || !rarete) {
    return res.status(400).json({erreur: "Tous les champs sont obligatoires"});
  }

  const phobie = {nom, description, categorie: category, rareté: rarete};
  const resultat = phobieModel.addPhobie(phobie);

  res.status(201).json({message: "Phobie ajoutée", phobie: resultat});
}


function updatePhobie(req, res) {
  const id = parseInt(req.params.id);
  const {nom, category, description, rarete} = req.body;

  if (!nom || !category || !description || !rarete) {
    return res.status(400).json({
    erreur: "Tous les champs sont obligatoires"});
  }

  const phobie = {nom, description, categorie: category, rareté: rarete};
  const resultat = phobieModel.updatePhobie(id, phobie);

  if (!resultat) {
    return res.status(404).json({erreur: "Phobie introuvable"});
  }

  res.json({message: "Phobie modifiée", phobie: resultat});
}


function deletePhobie(req, res) {
  const id = parseInt(req.params.id);
  const resultat = phobieModel.deletePhobie(id);

  if (!resultat) {
    return res.status(404).json({erreur: "Phobie introuvable"});
  }

  res.json({message: "Phobie supprimée", phobie: resultat});
}


export {
getPhobies,
getPhobie,
addPhobie,
updatePhobie,
deletePhobie
};
