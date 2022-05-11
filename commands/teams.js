const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('teams')
		.setDescription('Splits the people in voice channel into 2 random teams')
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('The channel players should be in')
				.setRequired(true)),
	async execute(interaction) {
		if (!interaction.options.getChannel('channel').isVoice()) {
			interaction.reply("You didn't select a voice channel!");
			return;
		}
		if (interaction.options.getChannel('channel').members.size === 0) {
			interaction.reply("No one is on the selected voice channel!");
			return;
		}


		let players = [];
		let team1 = [];
		let team2 = [];
		let msg = '';

		interaction.options.getChannel('channel').members.forEach( member => {
			players.push(member.user.username)
		});
		shuffle(players)
		players.forEach( (player, i) => {
			if (i + 1 > players.length / 2) {
				team1.push(player)
			} else {
				team2.push(player)
			}
		})

		if (team1.length > 0) {
			let x = 0;
			msg += `Team 1!\n`;
			team1.forEach( (player, i) => {
				x = i + 1;
				msg += `${x}. ${player} \n`;
			})
		}

		if (team2.length > 0) {
			let x = 0
			msg += `\n`;
			msg += `Team 2!\n`;
			team2.forEach( (player, i) => {
				x = i + 1;
				msg += `${x}. ${player} \n`;
			})
		}
		interaction.reply(msg);
	}
}


function shuffle(array) {
	let currentIndex = array.length,  randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}
	return array;
}
