let page = 1;
let nombreDePages = 1;
let estAdmin = false;
let idModif = null;

function displayPhobies() {
    fetch("/api/phobies?page=" + page)
        .then(r => r.json())
        .then(data => {
            liste.innerHTML = "";
            nombreDePages = data.nombreDePages;

            data.phobies.forEach(p => {liste.innerHTML += 
                    `<div class="phobie">
                        <h3>${p.id} - ${p.nom}</h3>
                        <p>${p.description}</p>
                        <p>Catégorie : ${p.categorie}</p>
                        <p>Rareté : ${p.rareté}</p>
                        ${estAdmin ? `<button onclick="editPhobie(${p.id})">Modifier</button>
                        <button onclick="removePhobie(${p.id})">Supprimer</button>` : ""}
                    </div>
                    <br>`
                    ;
            });
            document.getElementById("page").textContent = page;
        });
}

function updateLogin(user) {
    estAdmin = !!user && user.role === "admin";
    logout.hidden = !user;
    loginForm.hidden = !!user;
    admin.hidden = !estAdmin;
    displayPhobies();
}

function editPhobie(id) {
    fetch("/api/phobies/" + id)
        .then(r => r.json())
        .then(p => {
            if (p.erreur) {
                message.textContent = p.erreur;
                return;
            }

            phobieNom.value = p.nom;
            description.value = p.description;
            category.value = p.categorie;
            rarete.value = p.rareté;

            idModif = id;
            titreForm.textContent = "Modifier la phobie " + id;
            phobieBouton.textContent = "Modifier";
            annuler.hidden = false;
            admin.scrollIntoView();
        })
        .catch(() => message.textContent = "Erreur serveur");
}

function cancelEdit() {
    phobieForm.reset();
    idModif = null;
    titreForm.textContent = "Ajouter une phobie";
    phobieBouton.textContent = "Ajouter";
    annuler.hidden = true;
}

function removePhobie(id) {
    if (!confirm("Supprimer la phobie " + id + " ?")) {
        return;
    }

    fetch("/api/phobies/" + id, {
        method: "DELETE"
    })
    .then(r => r.json())
    .then(data => {
        message.textContent = data.message || data.erreur;
        displayPhobies();
    });
}

loginForm.onsubmit = function(e) {
    e.preventDefault();

    fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })
    .then(r => r.json())
    .then(data => {

        message.textContent = data.message || data.erreur;

        if (data.user) {
            loginForm.reset();
            updateLogin(data.user);
        }
    });
};

logout.onclick = function() {

    fetch("/api/logout", {
        method: "POST"
    })
    .then(() => {
        message.textContent = "Déconnecté";
        updateLogin(null);
    });
};


phobieForm.onsubmit = function(e) {
    e.preventDefault();

    const url = idModif ? "/api/phobies/" + idModif : "/api/phobies";
    const methode = idModif ? "PUT" : "POST";

    fetch(url, {
        method: methode,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nom: phobieNom.value,
            description: description.value,
            category: category.value,
            rarete: rarete.value
        })
    })
    .then(r => r.json())
    .then(data => {
        message.textContent = data.message || data.erreur;

        if (data.phobie) {
            cancelEdit();
            displayPhobies();
        }
    })
    .catch(() => message.textContent = "Erreur serveur");
};

annuler.onclick = cancelEdit;

precedent.onclick = function() {
    if (page > 1) {
        page--;
        displayPhobies();
    }
};

suivant.onclick = function() {
    if (page < nombreDePages) {
        page++;
        displayPhobies();
    }
};

fetch("/api/me")
    .then(r => r.json())
    .then(data => updateLogin(data.connecte ? data.user : null));
