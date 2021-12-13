const Discord = require('discord.js');
const config = require('../config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

var Scraper = require('images-scraper');

const google = new Scraper({
	userAgent: 'Mozilla/5.0 (X11; Linux i686; rv:64.0) Gecko/20100101 Firefox/64.0',
	puppeteer: {
		headless: true,
	},
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('capybara')
		.setDescription('Sends a random capybara image.'),
	async execute(interaction) {
		(async () => {
			const results = await google.scrape('capybara', 200);
			console.log('results', results);
		})();
	},
};
