import { readFile } from "fs/promises";
import { readdirSync } from "fs";
// import settings from "../config/config.json" assert { type: "json" };
import * as env from "dotenv";
// import config IDs
env.config();
const config = process.env;
import axios from "axios";

export async function importJSON(dir) {
	return JSON.parse(await readFile(new URL(dir, import.meta.url)));
}

export function assert(state, errormsg) {
	if (!state) throw errormsg;
}

export function handleError(err, message) {
	if (err == "") return;
	console.log(err);
	("");
	if (typeof err == "string") message.reply(err);
}

export async function importCommands(dir) {
	var files = getAllFiles(dir);
	var commands = [];
	for (const file of files) {
		let command = await import(`.${file}`);
		commands.push(command);
	}
	return commands;
}
function getAllFiles(dir) {
	var list = [];
	for (const file of readdirSync(dir, { withFileTypes: true })) {
		const filename = `${dir}/${file.name}`;
		if (file.isDirectory()) list.push(getAllFiles(filename));
		else list.push(filename);
	}
	return list;
}

export async function importEvents(client, dir) {
	var files = getAllFiles(dir);
	for (const file of files) {
		let event = await import(`.${file}`);
		client.on(event.name, (...args) => event.execute(...args));
	}
}

export function addThousandSeperators(value) {
	return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export function hasUserAbleToProcessCommand(command, guildMember) {
	for (const permission in command.permissions) {
		if (!guildMember.roles.cache.has(permission)) {
			message.reply(__("PERMISSION_ERROR"));
			return false;
		}
	}
	return true;
}

function sendData(data) {
	const options = {
		headers: {
			"X-Custom-Header": `Authorization: Bot ${config.TOKEN}`,
		},
	};
	axios
		.post(
			`https://discord.com/api/v8/applications/${config.CLIENT_ID}/commands`,
			data,
			options
		)
		.catch(error => {
			console.log(error);
		});
}
