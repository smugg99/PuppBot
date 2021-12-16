const Discord = require('discord.js');
const config = require('../config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('breeds')
		.setDescription('Gets all of the breeds currently in the API.'),
	async execute(interaction) {
		(async () => {
			const messageEmbed = new Discord.MessageEmbed()
				.setColor(config.colors.primary)
				.setTitle('🧻 Here is list of all the breeds available! 🧻')
				.setDescription('')

			var breedsCombined = '';
			await fetch('https://dog.ceo/api/breeds/list/all')
			    .then((response) => response.json())
			    .then((data) => {
					const breeds = data.message;

					for (const breed in breeds) {
						breedsCombined = breedsCombined + '⇥  **' + breed + '**\n';

						for (const subBreed of breeds[breed]) {
							breedsCombined = breedsCombined + '‎ ‎ ‎ ‎ ‎↳ ' + subBreed + '\n';
						}
					}
			    })
			    .catch((err) => { console.log(err); });

			if (breedsCombined) { messageEmbed.setDescription(breedsCombined); return interaction.reply({ embeds: [messageEmbed] }); }
			return interaction.reply({ content: 'There has been an error while fetching breeds from the API :(', ephemeral: true });
		})();
	},
};