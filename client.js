var request=require('request');
var presentation=require("./presentation.js")


//recupere la liste des client
function listerClient(page=0){
  if(page<0) page=0;
  var uri="https://cqlv2-hotel-web-api.herokuapp.com/clients?start="+page+"&size=10";
  request(uri,{json:true},function(err,res,body){
    if(err)
      presentation.afficheErreur(err);    
    presentation.afficherListeClient(body, page);
  });
}
exports.allClient = listerClient;



// ajouter un nouveau client

function addClient(prenom, nom){
  var options = {
    uri: 'https://cqlv2-hotel-web-api.herokuapp.com/clients',
    method: 'POST',
    json: {nom:nom, prenoms:prenom}
  };

  request(options, function (err, response, body) {
    if(err){
      presentation.afficheErreur(err)    }
      presentation.confirmSave(body);
    });
  }
  exports.addClient = addClient;





  function searchClient(nom){
    var uri="https://cqlv2-hotel-web-api.herokuapp.com/clients/search?nom="+nom;
    request(uri,{json:true},function(err,res,body){
      if(err){
        presentation.afficheErreur(err)
      }
      presentation.afficherRechercheClient(body);
    });
  }
  exports.searchClient = searchClient;
