 import readLine from 'readline'
 import {Client,findAllServ,findByName,addClient} from "./client.service";

//creation de l'interface pour la saisie utilisateur
const rl=readLine.createInterface({input:process.stdin,output: process.stdout});

//Menu principal
export function start(): void{
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
function menuClientList(page: number, nbClient:number){
  var elmsMenu:any[]=[];
  if (nbClient>=10)elmsMenu.push({libelleMenu: "page suivante" , fonction : ()=>{findAll(page+1)}});
  if (page>0)elmsMenu.push({libelleMenu: "page precedente" , fonction : ()=>{findAll(page-1)}});
  elmsMenu.push({libelleMenu: "retour" , fonction:start});
  elmsMenu.forEach((elm, i) => {console.log((i+1)+" - "+elm.libelleMenu)});
  rl.question("Faite votre choix : ", function(saisie){checkMenu(saisie, elmsMenu)});
}

// lire tout
function findAll(page:number=0){
  findAllServ(page).then((client)=>{showAll(client, page)}, (error:any)=>{console.log(error);})
}

function showAll(clients:Client[], page:number){
  console.log("\n###       Liste des clients       ###\n");
  clients.forEach((client:Client, i:number) => {
    console.log(`${client.prenom} ${client.nom}`);
  });
  console.log("\n___________page "+(page+1)+"___________________\n");
  menuClientList(page, clients.length);
}

// ajouter un client
function setNom():void{
  console.log('\n###        Ajouter un clients        ###');
  rl.question("nom du client : ", (saisie:string)=>{setPrenom(saisie);});
}
//demande le prenom du client
function setPrenom(nom:string):void{
  rl.question("prenom du client : ", (saisie:string)=>{
    addClient(nom, saisie).then((info:string)=>{confirAdd(info)}, function(error){console.log(error);})

  });
}

function confirAdd(info:string){
  console.log(info);
  start();
}

// recherche un client
function search(){
  console.log('###        recherche par nom        ###');
  rl.question("nom du client : ", (saisie)=>{
    findByName(saisie).then(function(client){afficheRecherche(client)}, function(error){console.log(error);})
  });
}

function afficheRecherche(clients:Client[]){
  if (clients.length>0) {
    clients.forEach((cl, i) => {
      console.log(`${cl.prenom} ${cl.nom}`);
    });
  }else{
    console.log("aucune correspondance");
  }
  start();
}

// //verification du menu
function checkMenu(saisie:string, elmsMenu:any){
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
