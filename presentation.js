const readline=require('readline');
const clientServ=require('./client.service.js');
const chambre=require('./chambre.js');

//creation de l'interface pour la saisie utilisateur
const rl=readline.createInterface({input:process.stdin,output: process.stdout});

//Menu principal
function start(){
  console.log("\n###          Menu principal           ###\n");
  var elmsMenu=[
    {libelleMenu: "Lister les clients" , fonction:findAll},
    {libelleMenu: "ajouter un client" , fonction:setNom},
    {libelleMenu: "Rechercher un client par nom" , fonction:search},
    // {libelleMenu: "vérifier la disponibilité d'une chambre" , fonction:chambre.check},
    {libelleMenu: "Quitter" , fonction:quitter}
  ];
  elmsMenu.forEach((elm, i) => {console.log(`${(i+1)} - ${elm.libelleMenu}`)});
  rl.question("\nFaite votre choix : ", function(saisie){checkMenu(saisie, elmsMenu)});
}
exports.start = start;

// Menu client liste
function menuClientList(page, nbClient){
  var elmsMenu=[];
  if (nbClient>=10)elmsMenu.push({libelleMenu: "page suivante" , fonction : function(){findAll(page+1)}});
  if (page>0)elmsMenu.push({libelleMenu: "page precedente" , fonction : function(){findAll(page-1)}});
  elmsMenu.push({libelleMenu: "retour" , fonction:start});
  elmsMenu.forEach((elm, i) => {console.log((i+1)+" - "+elm.libelleMenu)});
  rl.question("Faite votre choix : ", function(saisie){checkMenu(saisie, elmsMenu)});
}
exports.menuClientList = menuClientList;

// lire tout
function findAll(page=0){
  clientServ.findAll(page).then(function(client){showAll(client, page)}, function(error){console.log(error);})
}

function showAll(clients, page){
  console.log("\n###       Liste des clients       ###\n");
  clients.forEach((client, i) => {
    console.log(`${client.prenom} ${client.nom}`);
  });
  console.log("\n___________page "+(page+1)+"___________________\n");
  menuClientList(page, clients.size);
}

// ajouter un client
function setNom(){
  console.log();
  console.log('###        Ajouter un clients        ###');
  rl.question("nom du client : ", (saisie)=>{setPrenom(saisie);});
}
//demande le prenom du client
function setPrenom(nom){
  rl.question("prenom du client : ", (saisie)=>{
    clientServ.addClient(nom, saisie).then((info)=>{confirAdd(info)}, function(error){console.log(error);})

  });
}

function confirAdd(info){
  console.log(info);
  start();
}

// recherche un client
function search(){
  console.log('###        recherche par nom        ###');
  rl.question("nom du client : ", (saisie)=>{
    clientServ.findByName(saisie).then(function(client){afficheRecherche(client)}, function(error){console.log(error);})
  });
}

function afficheRecherche(clients){
  if (clients.size>0) {
    clients.forEach((cl, i) => {
      console.log(`${cl.prenom} ${cl.nom}`);
    });
  }else{
    console.log("aucune correspondance");
  }
  start();
}

// //verification du menu
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
