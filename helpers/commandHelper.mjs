import { __ } from "../config/strings.mjs";
import { assert } from "./helper.mjs";

import settings from "../config/config.json" assert { type: "json" };
import { Routes } from "discord.js";
import axios from "axios";
export function getInteractionCommand(commands, interaction) {
	return commands.find(cmd => cmd.data.name == interaction.commandName);
}

export function registerSlashCommands(commands) {
	let iterableCommands = [];
	commands
		.map(element => element.data.toJSON())
		.forEach(command => {
			iterableCommands.push(command);
		});
	axios
		.put(
			`https://discord.com/api/v10/applications/${settings.clientId}/commands`,
			iterableCommands,
			{ headers: { Authorization: `Bot ${settings.token}` } }
		)
		.catch(err => console.log(err));
	// rest.put(Routes.applicationCommands(settings.clientId), {
	//     body: iterableCommands,
	// });
}
