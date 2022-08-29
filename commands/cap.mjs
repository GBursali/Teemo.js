import { SlashCommandBuilder } from "discord.js";
export const data = new SlashCommandBuilder()
	.setName("cap")
	.setDescription("Greetings!");

export function execute(interaction) {
	interaction.reply("Captain Teemo on duty.");
}
