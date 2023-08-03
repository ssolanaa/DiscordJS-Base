const { InteractionType } = require('discord.js');

module.exports = {
	name: "interactionCreate",
	async execute(interaction, client) {
	  if (interaction.isChatInputCommand()) {
		const { commands } = client;
		const { commandName } = interaction;
		const command = commands.get(commandName);
  
		if (!command) return new Error('❌ A command is missing code.');
  
		try {
		  await command.execute(interaction, client);
		} catch (error) {
		  console.error("❌ Fatal error!");
		  console.error(error);
		  await interaction.reply({
			content: `Something went wrong while executing this command...`,
			ephemeral: true,
		  });
		}
	  } else if (interaction.isButton()) {
		const { buttons } = client;
		const { customId } = interaction;
		const button = buttons.get(customId);
		if (!button) return new Error('❌ A button is missing code.')

	  } else if (interaction.isSelectMenu()) {
		const { selectMenus } = client;
		const selectMenu = selectMenus.get(customId);
		if (!menu) return new Error("❌ A select menu is missing code.");

		try {
			await selectMenu.execute(interaction, client);
		} catch (error) {
			console.error(error)
		}
	  } else if (interaction.type == InteractionType.ModalSubmit) {
		const { modals } = client;
		const { customId } = interaction;
		const modal = modals.get(customId);
		if (!modal) return new Error("❌ A modal is missing code.");

		try {
			await modal.execute(interaction, client);
		} catch (error) {
			console.error(error);
		}
	  } else if (interaction.isContextMenuCommand()) {
		const { commands } = client;
		const { commandName } = interaction;
		const contextCommand = commands.get(commandName);
		if (!contextCommand) return new Error("❌ A contextCommand is missing code.");

		try {
			await contextCommand.execute(interaction, client);
		} catch (error) {
			console.error(error);		
	    }
	  }
	},
};
  