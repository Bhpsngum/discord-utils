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
get information based on the given invite
#### Parameters
* **`invite`**: Invite link

Supported formats:
* `https://discord.gg/123456`
* `http://discord.gg/invitecode`
* `discord.gg/coolinvitecode`
* `onlyinvitecode`

#### Return value
A promise:
* Fulfilled when the search is successful, including an object containing invite info
* Rejected when the invite is invalid or the search failed to perform, including and object containing error information.
```js
bot.getInviteInfo("https://discord.gg/test").then((invite) => {
  console.log(`Server name: **${invite.guild.name}**`);
  console.log(`Extracted invite code: **\`${invite.code}\`**`);
  // and many other fields
}).catch((error) => {
  console.log(`Error: ${error.message}`);
  console.log(`Error code: \`${error.code}\``); // code of the error, -1 means the search has failed
})
```
