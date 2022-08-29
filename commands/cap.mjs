import { SlashCommandBuilder } from "discord.js";
export const data = new SlashCommandBuilder()
    .setName("cap")
    .setDescription("Greetings!");
export const permissions = [];

export function execute(interaction) {
    interaction.reply("Captain Teemo on duty.");
}
