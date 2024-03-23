import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export const data = new SlashCommandBuilder()
	.setName("deletecat")
	.setDescription("Deletes the whole category with the channels inside.")
	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
export function execute(interaction) {
	interaction.deferReply();
	let parent = interaction.channel.parent;
	interaction.channel.delete().then(() => {
		for (const channel of parent.children.cache) {
			//channel[0] is the snowflake id. 1st index is the object itself.
			channel[1].delete();
		}
	});
	setTimeout(() => {
		parent.delete();
	}, 5000);
}
