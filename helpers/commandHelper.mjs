import { __ } from "../config/strings.mjs";
// import settings from "../config/config.json" assert { type: "json" };
import * as env from "dotenv";
// import config IDs
env.config();
const settings = process.env;
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
			`https://discord.com/api/v10/applications/${settings.CLIENT_ID}/commands`,
			iterableCommands,
			{ headers: { Authorization: `Bot ${settings.TOKEN}` } }
		)
		.catch(err => console.log(err));
}
