const Discord = require('discord.js');
const config = require('../config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('capybara')
		.setDescription('Sends a random capybara image.'),
	async execute(interaction) {
		return interaction.reply({ embeds: "testsstttt", ephemeral: true });
	},
};
