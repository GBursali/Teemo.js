import { Events } from "discord.js";
import { translate } from "@vitalets/google-translate-api";

export const name = Events.MessageReactionAdd;
export const once = false;
export async function execute(reaction, user) {
	if (reaction.partial) {
		// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
			await reaction.fetch();
		} catch (error) {
			console.error(
				"Something went wrong when fetching the message:",
				error
			);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
	const response = getReply(reaction);
	reaction.message.reply(response);
}
async function getReply(reaction) {
	var re = new RegExp("/_(w+)/");
	const emoteName = reaction.emoji.name;
	const match = emoteName.match(re);
	if (!match) return;
	const flag = match[1];
	const content = reaction.message.content;
	const { text } = await translate(content, { to: flag });
	return text;
}
