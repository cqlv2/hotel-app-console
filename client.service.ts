import request from'request-promise-native';


//recupere la liste des client
export function findAllServ(page:number):Promise<Client[]>{
  const uri="https://cqlv2-hotel-web-api.herokuapp.com/clients?start="+page+"&size=10";
  return new Promise((resolve,reject)=>{
    request(uri,{json:true},(err,json)=>{
      if(err)reject(err);
      else{
        let clients:Client[]=[];
        json.body.forEach((cl:any, i:number) => {
          clients.push(new Client(cl.nom, cl.prenoms))
        });
        resolve(clients);
      }
    });
  });
}
//rechercher un client

export function findByName(name:string):Promise<Client[]>{
  const uri="https://cqlv2-hotel-web-api.herokuapp.com/clients/search?nom="+name;
  return new Promise((resolve,reject)=>{
    request(uri,{json:true},(err,json)=>{
      if(err)reject(err);
      else{
        let clients:Client[]=[];
        json.body.forEach((cl:any, i:number) => {
          clients.push(new Client(cl.nom, cl.prenoms))
        });
        resolve(clients);
      }
    });
  });
}

// ajouter un nouveau client
export function addClient(prenom: string, nom: string):Promise<string>{
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

//class client
export class Client{
  constructor(private _nom:string, private _prenom:string){
  }
  identite(): string{
    return `${this.prenom} ${this.nom}`;
  }
  get nom(){return this._nom;}
  get prenom(){return this._prenom;}
}
