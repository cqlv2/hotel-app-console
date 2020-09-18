const request=require('request');


//recupere la liste des client
function findAll(page){
  const uri="https://cqlv2-hotel-web-api.herokuapp.com/clients?start="+page+"&size=10";
  return new Promise((resolve,reject)=>{
    request(uri,{json:true},(err,json)=>{
      if(err)reject(err);
      else{
        this.clients=new Set();
        json.body.forEach((cl, i) => {
          this.clients.add(new Client(cl.nom, cl.prenoms))
        });
        resolve(this.clients);
      }
    });
  });
}
exports.findAll=findAll;
//rechercher un client

function findByName(name){
  const uri="https://cqlv2-hotel-web-api.herokuapp.com/clients/search?nom="+name;
  return new Promise((resolve,reject)=>{
    request(uri,{json:true},(err,json)=>{
      if(err)reject(err);
      else{
        this.clients=new Set();
        json.body.forEach((cl, i) => {
          this.clients.add(new Client(cl.nom, cl.prenoms))
        });
        resolve(this.clients);
      }
    });
  });
}
exports.findByName=findByName;
// ajouter un nouveau client
function addClient(prenom, nom){
  var options = {
    uri: 'https://cqlv2-hotel-web-api.herokuapp.com/clients',
    method: 'POST',
    json: {nom:nom, prenoms:prenom}
  };
    return new Promise((resolve,reject)=>{
    request(options,(err,json)=>{
      if(err)reject(err);
      else resolve("le client a bien été ajouter !");
    });
  });
}
exports.addClient=addClient;

//class client
class Client{
  constructor(nom,prenom){
    this.nom=nom;
    this.prenom=prenom;
  }
  identite(){
    return `${this.prenom} ${this.nom}`
  }
}
