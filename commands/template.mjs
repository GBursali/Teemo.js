import * as helper from "../helpers/helper.mjs";
import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("template")
    .setDescription("Creates a Channel based on the template")
    .addStringOption((option) =>
        option
            .setName("name")
            .setDescription(
                "Name of the category. Note that first 3 characters are used for prefix."
            )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels);
export function execute(interaction) {
    const guild = interaction.guild;
    const textChannels = ["general", "lfg-lfm", "social-media", "QA"];
    const voiceChannelPrefix = "parti-";
    const categoryName = interaction.options.getString("name");
    const categoryPrefix = categoryName.substring(0, 3) + "-";
    var permissions = {};
    helper
        .importJSON("../helpers/permissions.json")
        .then((result) => (permissions = result));

    guild.channels
        .create(categoryName, { type: "category" })
        .then((category) => {
            const id = category.id;
            for (const textChannel of textChannels) {
                createChannel(guild, categoryPrefix + textChannel, "text", id);
            }
            for (var i = 1; i <= 5; i++) {
                createChannel(
                    guild,
                    categoryPrefix + `${voiceChannelPrefix}${i}`,
                    "voice",
                    id
                );
            }
            category.updateOverwrite(
                guild.roles.everyone,
                permissions.everyone
            );

            guild.roles
                .create({
                    name: categoryName,
                    color: "BLUE",
                })
                .then((newrole) => {
                    category.updateOverwrite(newrole, permissions.role);
                })
                .catch(console.log);
        });
}
function createChannel(guild, name, type, parentid) {
    guild.channels.create(name, { type: type }).then((channel) => {
        channel.setParent(parentid);
    });
}
