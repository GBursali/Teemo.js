import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

export const permissions = ["ADMINISTRATOR"];
export const data = new SlashCommandBuilder()
    .setName("bye")
    .setDescription("Bye bye!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export function execute(interaction) {
    interaction.reply("by").then(function () {
        process.exit();
    });
}
