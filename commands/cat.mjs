import axios from "axios";
import { SlashCommandBuilder } from "discord.js";
import infos from "../config/outsourceinformations.json" assert { type: "json" };

export const data = new SlashCommandBuilder()
    .setName("cat")
    .setDescription("Kedi fotisi!");
export const permissions = [];
export function execute(interaction) {
    axios.get(infos.catURL).then((response) => {
        interaction.channel.send(response.data.file, {
            files: [response.data.file],
        });
    });
}
