# discord.js-extended
Some utilities attached with Discord.js npm

## Installation

```
npm install discord.js-extended
```

## Getting Started

Load the package in your code:
```js
const DiscordExtended = require("discord.js-extended")
```
Then use `DiscordExtended.extend(discord_bot_object)` to extend your bot properties:
```js
const Discord = require("discord.js");
const DiscordBot = new Discord.Client({ <options> });
DiscordBot.login(" <bot token> ");
DiscordExtended.extend(DiscordBot);
```

## Commands

### `bot.getInviteInfo(invite)`
better version of [`bot.fetchInvite(invite)`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=fetchInvite)
#### Parameters
* **`invite`**: Invite link

Supported formats:

(can be used with or without protocol `https://` or `http://`, case-insensitive)
* `discord.com/invite/invitecode`
* `discordapp.com/invite/invitecodehere`
* `discord.gg/coolinvitecode`
* `discord.gg/invite/anothercode`
* `onlyinvitecode`

#### Return value
A promise:
* Fulfilled when the search is successful, including an Invite object containing invite info
* Rejected when the invite is invalid or the search failed to perform, including an error object containing error information.
```js
bot.getInviteInfo("https://discord.gg/test").then((invite) => {
  console.log(`Server name: **${invite.guild.name}**`);
  console.log(`Extracted invite code: **\`${invite.code}\`**`);
  // and many other fields
}).catch((error) => {
  console.log(`Error name: ${error.name}`);
  console.log(`Error message: ${error.message}`);
  console.log(`Error code: \`${error.code}\``); // code of the error, -1 means the search has failed
  // See `Discord.Constants.APIErrors` for error codes and messages
})
```
