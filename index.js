const https = require('https');
const invite_urls = [
  /discordapp\.com\/invite\//,
  /discord\.com\/invite\//,
  /discord\.gg\/([^]*\/)*/
];
const protocol = /^(https*:\/\/)*(www\.)*/;
var getInviteCode = function (invite) {
  for (let filter of invite_urls) invite = invite.replace(new RegExp(protocol.source + filter.source), "");
  return invite.replace(/(\?|\#|\\|\/).*/,"")
}, removeSlash = function (str) {
  return str.replace(/^\//,"").replace(/\/$/,"")
}
var UTILS =  {
  extend: function(client) {
    Object.assign(client, UTILS)
  },
  getInviteInfo: function(invite) {
    let error = {message: "Proccessing Failed", code: -1}
    if (invite == null) invite = "";
    return new Promise(function(resolve, reject) {
      try {
        https.get(removeSlash(this.options.http.api)+'/v'+this.options.http.version+'/invites/'+getInviteCode(invite.toString().replace(/^(\s|\r|\n)+/,"").replace(/(\s|\r|\n)+$/,""))+"?with_counts=true", function (res) {
          res.setEncoding('utf8');
          let rawData = '';
          res.on('data', function(chunk) {rawData += chunk});
          res.on('end', function () {
            try {
              const parsedData = JSON.parse(rawData);
              if (Math.trunc(res.statusCode / 100) !== 2) reject(parsedData);
              else resolve(parsedData);
            } catch (e) {
              reject(error)
            }
          })
        }).on('error', function (e) {
          reject(error);
        })
      }
      catch(e){reject(error)}
    }.bind(this))
  }
}
module.exports = UTILS;
