var request=require('request');
var presentation=require("./presentation.js")


function check(){
  var uri="https://cqlv2-hotel-web-api.herokuapp.com/chambre";

  request(uri,{json:true},function(err,res,body){
    if(err){
      presentation.afficheErreur(err);
      return;
    }
    presentation.afficherListeChambre(body);
  });
}
exports.check = check;
