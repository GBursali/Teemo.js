import axios from "axios";
import { SlashCommandBuilder } from "discord.js";
import infos from "../config/outsourceinformations.json" assert { type: "json" };

export const data = new SlashCommandBuilder()
	.setName("quack")
	.setDescription("Sends a duck photo to the channel");

export async function execute(interaction) {
	const response = await axios.get(infos.duckURL);
	interaction.reply({ content: response.data.url, fetchReply: true });
}
