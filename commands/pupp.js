const Discord = require('discord.js');
const config = require('../config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pupp')
		.setDescription('Sends a random dog related image.')
		.addStringOption(option =>
			option.setName('breed')
				.setDescription('Specify a breed to search in for, leave for a random breed.')
					.setRequired(false)),
	async execute(interaction) {
		(async () => {
			const messageEmbed = new Discord.MessageEmbed();
			var breedUrl; var breed = interaction.options.getString('breed');

			if (breed) {
				breed = breed.toLowerCase();
				breedUrl = 'breed/' + breed + '/images/random';
				messageEmbed.setFooter('Chosen doggo breed: [' + breed + ']');
			}
			else {
				breedUrl = 'breeds/image/random';
			}
			
			await fetch('https://dog.ceo/api/' + breedUrl)
				.then((response) => response.json())
				.then((data) => {
					const imageUrl = data.message;
					
					messageEmbed.setColor(config.colors.primary)
						.setTitle('🖼️ Here is a cute dog related picture for You! 🖼️')
						.setImage(imageUrl);
			
					return interaction.reply({ embeds: [messageEmbed] });
				})
				.catch((err) => { console.log(err); });
			
			return interaction.reply({ content: 'There has been an error while fetching images from the API :(', ephemeral: true });
		})();
	},
};