require("dotenv").config();
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers ]});
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
};

console.log("➖ Waiting to login...");

client.handleEvents();
console.log("➖ Handled events...")
client.handleCommands();
console.log("➖ Handled commands...")
client.handleComponents();
console.log("➖ Handled components...")

try {
	client.login(process.env.token);
} catch (err) {
	console.error('❌ Fatal error!');
	console.error(err);
}