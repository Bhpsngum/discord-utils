const invite_urls = [
  /discordapp\.com\/invite\//,
  /discord\.com\/invite\//,
  /discord\.gg\/(invite\/)*([^#?]*\/)*/
];
const protocol = /(www\.)*/;
const code = /([^]*)/;
var getInviteCode = function (invite) {
  for (let filter of invite_urls) {
    let invitecode = new RegExp(protocol.source + filter.source + code.source, "i").exec(invite);
    if (invitecode) return (invitecode[invitecode.length - 1]||"").replace(/\./g, "%2E")
  }
  return invite
}
var UTILS =  {
  extend: function(client) {
    Object.assign(client, UTILS)
  },
  getInviteInfo: function(invite) {
    let error = {message: "Proccessing Failed", code: -1}
    if (invite == null) invite = "";
    return new Promise(function(resolve, reject) {
      try {this.fetchInvite(getInviteCode(invite.toString().trim())).then(resolve).catch(reject)}
      catch(e){reject(error)}
    }.bind(this))
  }
}
module.exports = UTILS;
