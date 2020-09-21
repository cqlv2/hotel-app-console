"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
var readline_1 = __importDefault(require("readline"));
var client_service_1 = require("./client.service");
//creation de l'interface pour la saisie utilisateur
var rl = readline_1.default.createInterface({ input: process.stdin, output: process.stdout });
//Menu principal
function start() {
    console.log("\n###          Menu principal           ###\n");
    var elmsMenu = [
        { libelleMenu: "Lister les clients", fonction: findAll },
        { libelleMenu: "ajouter un client", fonction: setNom },
        { libelleMenu: "Rechercher un client par nom", fonction: search },
        // {libelleMenu: "vérifier la disponibilité d'une chambre" , fonction:chambre.check},
        { libelleMenu: "Quitter", fonction: quitter }
    ];
    elmsMenu.forEach(function (elm, i) { console.log((i + 1) + " - " + elm.libelleMenu); });
    rl.question("\nFaite votre choix : ", function (saisie) { checkMenu(saisie, elmsMenu); });
}
exports.start = start;
exports.start = start;
// Menu client liste
function menuClientList(page, nbClient) {
    var elmsMenu = [];
    if (nbClient >= 10)
        elmsMenu.push({ libelleMenu: "page suivante", fonction: function () { findAll(page + 1); } });
    if (page > 0)
        elmsMenu.push({ libelleMenu: "page precedente", fonction: function () { findAll(page - 1); } });
    elmsMenu.push({ libelleMenu: "retour", fonction: start });
    elmsMenu.forEach(function (elm, i) { console.log((i + 1) + " - " + elm.libelleMenu); });
    rl.question("Faite votre choix : ", function (saisie) { checkMenu(saisie, elmsMenu); });
}
// lire tout
function findAll(page) {
    if (page === void 0) { page = 0; }
    client_service_1.findAllServ(page).then(function (client) { showAll(client, page); }, function (error) { console.log(error); });
}
function showAll(clients, page) {
    console.log("\n###       Liste des clients       ###\n");
    clients.forEach(function (client, i) {
        console.log(client.prenom + " " + client.nom);
    });
    console.log("\n___________page " + (page + 1) + "___________________\n");
    menuClientList(page, clients.length);
}
// ajouter un client
function setNom() {
    console.log('\n###        Ajouter un clients        ###');
    rl.question("nom du client : ", function (saisie) { setPrenom(saisie); });
}
//demande le prenom du client
function setPrenom(nom) {
    rl.question("prenom du client : ", function (saisie) {
        client_service_1.addClient(nom, saisie).then(function (info) { confirAdd(info); }, function (error) { console.log(error); });
    });
}
function confirAdd(info) {
    console.log(info);
    start();
}
// recherche un client
function search() {
    console.log('###        recherche par nom        ###');
    rl.question("nom du client : ", function (saisie) {
        client_service_1.findByName(saisie).then(function (client) { afficheRecherche(client); }, function (error) { console.log(error); });
    });
}
function afficheRecherche(clients) {
    if (clients.length > 0) {
        clients.forEach(function (cl, i) {
            console.log(cl.prenom + " " + cl.nom);
        });
    }
    else {
        console.log("aucune correspondance");
    }
    start();
}
// //verification du menu
function checkMenu(saisie, elmsMenu) {
    if (Number.isInteger(parseInt(saisie)) && parseInt(saisie) > 0 && parseInt(saisie) <= elmsMenu.length) {
        elmsMenu[parseInt(saisie) - 1].fonction();
    }
    else {
        console.log("###   erreur de saisie   ###");
        start();
    }
}
function quitter() {
    console.log("au revoir");
    rl.close();
}
