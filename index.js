const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Bruh, I didn't know which intents to insert so i just inserted almost all of them :>
const client = new Discord.Client({
	intents: [
		Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS,
		Discord.Intents.FLAGS.GUILD_BANS, Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
	 	Discord.Intents.FLAGS.GUILD_INTEGRATIONS, Discord.Intents.FLAGS.GUILD_WEBHOOKS,
		Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.GUILD_VOICE_STATES,
		Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_MESSAGES,
		Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
		Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
		Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
	]
});

// Create a new collection that will contain all of the commands
client.commands = new Discord.Collection();
const commands = [];

// Read the commands folder for every file that has .js format
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Require every command and insert it into client commands
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	if (!command.data) { continue; }
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}

// Let now that bot is ready
client.once('ready', async () => {
	console.log('Ready!');

	 // Registering the commands in the client
	const rest = new REST({ version: '9' }).setToken(config.token);

	// For deploying application/guild commands
	(async () => {
		try {
			console.log('Started refreshing (/) commands.');
	 
			await rest.put(
				Routes.applicationCommands(config.clientId),
				//Routes.applicationGuildCommands(config.clientId, config.guildId),
				{ body: commands },
			);
	 
			console.log('Successfully reloaded (/) commands.');
		} catch (error) {
			console.error(error);
		}
	})();

	// Show on how many servers this but is currently in
	client.user.setActivity('🦴 Currently in **${client.guilds.cache.size}** servers! 🦴', {type: 4});

	// Removing application commands
	//client.application?.commands.set([]);

	// Removing guild commands
	client.guilds.cache.get(config.guildId)?.commands.set([]);
});


// When a new interaction was created, check if it's interaction from verify button or command, if so, execute it's logic and check for any errors
client.on('interactionCreate', async interaction => {
	if (interaction.isCommand()) {
		const command = await client.commands.get(interaction.commandName);
		if (!command) return;
		try {
			await command.execute(interaction, client);
		} catch (error) { console.error(error); return; }
	}
	return;
});


// Log-in the bot
client.login(config.token);