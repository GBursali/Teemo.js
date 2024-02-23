import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export const data = new SlashCommandBuilder()
	.setName("deletecat")
	.setDescription("Deletes the whole category with the channels inside.")
	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
export function execute(interaction) {
	interaction.deferReply();
	interaction.channel.delete().then(() => {
		for (const channel of message.channel.parent.children) {
			//channel[0] is the snowflake id. 1st index is the object itself.
			channel[1].delete();
		}
	});
	setTimeout(() => {
		message.channel.parent.delete();
	}, 5000);
}
