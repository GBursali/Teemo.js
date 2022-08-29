import axios from "axios";
import { SlashCommandBuilder } from "discord.js";
import infos from "../config/outsourceinformations.json" assert { type: "json" };

export const data = new SlashCommandBuilder()
	.setName("cat")
	.setDescription("Sends a cat photo to the channel");
export function execute(interaction) {
	interaction.deferReply();
	axios.get(infos.catURL).then(response => {
		interaction.editReply(response.data.file);
	});
}
