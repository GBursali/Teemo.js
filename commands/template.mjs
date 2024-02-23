import { ChannelType } from "discord-api-types/v10";
import * as helper from "../helpers/helper.mjs";
import {
	getEveryonePerms,
	getRolePermissions,
} from "../helpers/permissions.mjs";
import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
	.setName("template")
	.setDescription("Creates a Channel based on the template")
	.addStringOption(option =>
		option
			.setName("name")
			.setRequired(true)
			.setDescription(
				"Name of the category. Note that first 3 characters are used for prefix."
			)
	)
	.addStringOption(option =>
		option
			.setName("type")
			.setDescription("Channel Type")
			.addChoices(
				{ name: "Game", value: "game" },
				{ name: "Dnd", value: "dnd" }
			)
	)
	.setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels);

export async function execute(interaction) {
	const guild = interaction.guild;
	const categoryName = interaction.options.getString("name");
	const type = interaction.options.getString("type") || "game";
	const info = await helper.importJSON(`../templates/${type}.json`);
	const categorySettings = {
		name: getString(info.name, categoryName),
		type: ChannelType.GuildCategory,
		permissionOverwrites: getEveryonePerms(guild.roles.everyone),
	};
	const roleSettings = {
		name: categoryName,
	};
	const category = await guild.channels.create(categorySettings);
	for (const channel of info.channels) {
		const channelSettings = {
			name: `${categoryName.substring(0, 3)}-${getString(
				channel.name,
				categoryName
			)}`,
			type: getType(channel.type),
			parent: category,
		};
		awaitguild.channels.create(channelSettings);
	}
	const role = await guild.roles.create(roleSettings);
	category.permissionOverwrites.create(role, getRolePermissions());
	interaction.reply({ content: "İşlem Tamamlandı!" });
}

function getString(str, info) {
	return str === "{Category Name}" ? info : str;
}

function getType(type) {
	const typeMap = {
		text: ChannelType.GuildText,
		voice: ChannelType.GuildVoice,
	};

	if (typeMap[type]) {
		return typeMap[type];
	}

	throw new Error("channel type couldn't found.");
}
