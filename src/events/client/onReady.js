const { ActivityType } = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`✅ You have logged into ${client.user.tag}!`);
		client.user.setActivity('A new discord bot being created!', { type: ActivityType.Watching });
	},
};