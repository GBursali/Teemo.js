import { PermissionsBitField } from "discord.js";

export function getRolePermissions() {
	return {
		ViewChannel: true,
		SendMessages: true,
		SendMessagesInThreads: true,
		CreatePrivateThreads: true,
		CreatePublicThreads: true,
		EmbedLinks: true,
		AttachFiles: true,
		UseExternalEmojis: true,
		UseApplicationCommands: true,
		Speak: true,
		Stream: true,
		Connect: true,
	};
}

export function getEveryonePerms(id) {
	return [
		{
			id: id,
			deny: [
				PermissionsBitField.Flags.ViewChannel,
				PermissionsBitField.Flags.SendMessages,
				PermissionsBitField.Flags.SendMessagesInThreads,
				PermissionsBitField.Flags.CreatePrivateThreads,
				PermissionsBitField.Flags.CreatePublicThreads,
				PermissionsBitField.Flags.EmbedLinks,
				PermissionsBitField.Flags.AttachFiles,
				PermissionsBitField.Flags.UseExternalEmojis,
				PermissionsBitField.Flags.UseApplicationCommands,
				PermissionsBitField.Flags.Speak,
				PermissionsBitField.Flags.Stream,
				PermissionsBitField.Flags.Connect,
			],
		},
	];
}
