var readline=require('readline');
var client=require('./client.js');
var chambre=require('./chambre.js');

//creation de l'interface pour la saisie utilisateur
var rl=readline.createInterface({input:process.stdin,output: process.stdout});

//UI principal
function start(){
  console.log("\n###          Menu principal           ###\n");
  var elmsMenu=[
    {libelleMenu: "Lister les clients" , fonction:client.allClient},
    {libelleMenu: "ajouter un client" , fonction:setNom},
    {libelleMenu: "Rechercher un client par nom" , fonction:search},
    {libelleMenu: "vérifier la disponibilité d'une chambre" , fonction:chambre.check},
    {libelleMenu: "Quitter" , fonction:quitter}
  ];
  elmsMenu.forEach((elm, i) => {console.log((i+1)+" - "+elm.libelleMenu)});
  rl.question("\nFaite votre choix : ", function(saisie){checkMenu(saisie, elmsMenu)});
}
exports.start = start;

// affiche la liste des client
function afficherListeClient(clients, page){
  console.log("\n###       Liste des clients       ###\n");
  clients.forEach((client, i) => {
    console.log("--> "+client.prenoms+" "+client.nom);
  });

  console.log("\n___________page "+(page+1)+"___________________\n");
  menuClientList(page, clients.length);
}
exports.afficherListeClient=afficherListeClient;
//confirmation de l'ajout en bdd
function confirmSave(data){
  console.log("\n"+data.prenoms+" "+data.nom+" a bien ete ajouter a la liste de clients\n");
  start();
}
exports.confirmSave=confirmSave;
//afficher resultat de la Rechercher
function afficherRechercheClient(data){
  console.log(data);
  if (data.length>0) {
    console.log("il y a "+data.length+" reponse(s) a votre recherche");
    data.forEach((client, i) => {
      console.log(client.nom+" "+client.prenoms);
    });
    console.log("________________");
  }
  else{
    console.log("il y a aucune reponse a votre recherche");
  }
  start();
}
exports.afficherRechercheClient=afficherRechercheClient;

function afficheErreur(err){
  console.error();("ERREUR : "+err);
  start();
}
exports.afficheErreur=afficheErreur;


//ui listClientMenu

function menuClientList(page, nbClient){
  var elmsMenu=[];
  if (nbClient>=10)elmsMenu.push({libelleMenu: "page suivante" , fonction : function(){client.allClient(page+1)}});
  if (page>0)elmsMenu.push({libelleMenu: "page precedente" , fonction : function(){client.allClient(page-1)}});
  elmsMenu.push({libelleMenu: "retour" , fonction:start});
  elmsMenu.forEach((elm, i) => {console.log((i+1)+" - "+elm.libelleMenu)});
  rl.question("Faite votre choix : ", function(saisie){checkMenu(saisie, elmsMenu)});
}
exports.menuClientList = menuClientList;

//demande le nom du client
function setNom(){
  console.log();
  console.log('###        Ajouter un clients        ###');
  rl.question("nom du client : ", (saisie)=>{setPrenom(saisie);});
}
//demande le prenom du client
function setPrenom(nom){
  rl.question("prenom du client : ", function(saisie){client.addClient(saisie, nom)});
}

function search(){
  console.log();
  console.log('###        recherche par nom        ###');
  rl.question("nom du client : ", (saisie)=>{client.searchClient(saisie);});
}

//afficher la Liste des Chambre
function afficherListeChambre(data){

  console.log("\n###   Liste des chambres   ###\n");

  if(data.length>0){
    data.forEach((chambre, i) => {
      console.log("--> chambre numero : "+chambre.numero+" hotel : "+chambre.hotel.nom);
    });
  }
  else{
    console.log("aucune chambre trouvée");
  }

  start()
}
exports.afficherListeChambre=afficherListeChambre;







//verification du menu
function checkMenu(saisie, elmsMenu){
  if(Number.isInteger(parseInt(saisie)) && parseInt(saisie)> 0 && parseInt(saisie)<=elmsMenu.length){
    elmsMenu[parseInt(saisie)-1].fonction();
  }
  else{
    console.log("###   erreur de saisie   ###");
    start();
  }
}

function quitter(){
  console.log("au revoir");
  rl.close();
}
