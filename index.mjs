/*Imports*/
import { Client, Events, GatewayIntentBits, Partials } from "discord.js";
import {
	getInteractionCommand,
	registerSlashCommands,
} from "./helpers/commandHelper.mjs";
import { __ } from "./config/strings.mjs";
import settings from "./config/config.json" assert { type: "json" };
import { importCommands, importEvents } from "./helpers/helper.mjs";
import { execute } from "./events/reaction.mjs";
const client = new Client({
	intents: [GatewayIntentBits.Guilds],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});
//Register Commands
let commands = await importCommands("./commands");
registerSlashCommands(commands);

client.once("ready", () => {
	console.log("Ready!");
});

client.on("interactionCreate", interaction => {
	if (!interaction.isChatInputCommand()) return;

	let command = getInteractionCommand(commands, interaction);
	if (command == undefined) throw __("UNKNOWN_COMMAND");
	command.execute(interaction);
});
client.on(Events.MessageReactionAdd, async function (reaction, user) {
	console.log("boo");
	execute(reaction, user);
});
console.log("ready to login");
client.login(settings.TOKEN);
