/*Imports*/
import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import {
	getInteractionCommand,
	registerSlashCommands,
} from "./helpers/commandHelper.mjs";
import { __ } from "./config/strings.mjs";
// import settings from "./config/config.json" assert { type: "json" };
import { importCommands } from "./helpers/helper.mjs";
/*Imports Done*/
import * as env from "dotenv";
// import config IDs
env.config();
const TOKEN = process.env.TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
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

client.login(TOKEN);
