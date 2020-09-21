"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.addClient = exports.findByName = exports.findAllServ = void 0;
var request_promise_native_1 = __importDefault(require("request-promise-native"));
//recupere la liste des client
function findAllServ(page) {
    var uri = "https://cqlv2-hotel-web-api.herokuapp.com/clients?start=" + page + "&size=10";
    return new Promise(function (resolve, reject) {
        request_promise_native_1.default(uri, { json: true }, function (err, json) {
            if (err)
                reject(err);
            else {
                var clients_1 = [];
                json.body.forEach(function (cl, i) {
                    clients_1.push(new Client(cl.nom, cl.prenoms));
                });
                resolve(clients_1);
            }
        });
    });
}
exports.findAllServ = findAllServ;
//rechercher un client
function findByName(name) {
    var uri = "https://cqlv2-hotel-web-api.herokuapp.com/clients/search?nom=" + name;
    return new Promise(function (resolve, reject) {
        request_promise_native_1.default(uri, { json: true }, function (err, json) {
            if (err)
                reject(err);
            else {
                var clients_2 = [];
                json.body.forEach(function (cl, i) {
                    clients_2.push(new Client(cl.nom, cl.prenoms));
                });
                resolve(clients_2);
            }
        });
    });
}
exports.findByName = findByName;
// ajouter un nouveau client
function addClient(prenom, nom) {
    var options = {
        uri: 'https://cqlv2-hotel-web-api.herokuapp.com/clients',
        method: 'POST',
        json: { nom: nom, prenoms: prenom }
    };
    return new Promise(function (resolve, reject) {
        request_promise_native_1.default(options, function (err, json) {
            if (err)
                reject(err);
            else
                resolve("le client a bien été ajouter !");
        });
    });
}
exports.addClient = addClient;
//class client
var Client = /** @class */ (function () {
    function Client(_nom, _prenom) {
        this._nom = _nom;
        this._prenom = _prenom;
    }
    Client.prototype.identite = function () {
        return this.prenom + " " + this.nom;
    };
    Object.defineProperty(Client.prototype, "nom", {
        get: function () { return this._nom; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "prenom", {
        get: function () { return this._prenom; },
        enumerable: false,
        configurable: true
    });
    return Client;
}());
exports.Client = Client;
