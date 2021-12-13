const Discord = require('discord.js');
const config = require('../config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

var Scraper = require('images-scraper');

const google = new Scraper({
  puppeteer: {
    headless: false,
  },
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('capybara')
		.setDescription('Sends a random capybara image.'),
	async execute(interaction) {
		var fruits = ['capybara', 'cute capybara pictures', 'capybara pictures'](async () => {
			const results = await google.scrape(fruits, 200);
			console.log('results', results);
		})();
	},
};
