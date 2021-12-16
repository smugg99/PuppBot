const Discord = require('discord.js');
const config = require('../config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pupp')
		.setDescription('Sends a random dog related image.'),
	async execute(interaction) {
		(async () => {
			return interaction.reply("Test");
		})();
	},
};
