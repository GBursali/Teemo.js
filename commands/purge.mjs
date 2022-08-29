import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
	.setName("purge")
	.setDescription("Purges all channels without a category!")
	.setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels);
export function execute(interaction) {
	const channels = interaction.guild.channels.cache.array();
	for (const channel of channels) {
		if (channel.parent == null && channel.type != "category")
			channel.delete();
	}
}
