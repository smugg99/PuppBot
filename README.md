<br/>
<p align="center">
  <a href="https://github.com/DudusJestem/PuppBot">
    <img src="https://i.ibb.co/cg5LSZv/ellipse1013.png" alt="Logo" width="371" height="200">
  </a>
</p>

# PuppBot
Discord bot created in the intention of sending cute dog images!

## Dependencies
- NodeJS v16.6 or higher
- Scope ```applications.commands``` has to be enabled in your bot in Developer Portal

This bot uses this API to fetch dog images: ```https://dog.ceo/api/```

### Install with ```npm install [package name]```
- node-fetch@2
- discord.js@latest
- discord-api-types/v9
- @discordjs/rest

## Installation
Use this [link](https://discord.com/api/oauth2/authorize?client_id=910856637621895168&permissions=8&scope=bot%20applications.commands) to add this bot to your server!

To install it on a server, install the dependencies above, clone this repo:
```bash
git clone https://github.com/DudusJestem/PuppBot
```
Edit the config.json file:
```json
{
	"clientId": "[your client id here]",
	"guildId": "[your test guild id here]",
	"token": "[your bot token here]",

	"colors": {
		"primary": "#E7848F"
	}
}
```

**Join our [Discord Server](https://discord.gg/Ubn8rBKjpt) to test this bot for yourself!**

![](https://i.ibb.co/s1MQHhq/Repo-Background-Draft.png)

## License
Distributed under the MIT License. See [LICENSE](https://github.com/DudusJestem/PuppBot/LICENSE.md) for more information.
