const strings = {
	UNKNOWN_COMMAND: "wOt?",
	ERROR: "There is an error in your command. Command is aborted and admins are notified.",
	PERMISSION_ERROR: "You do not have permission to do that",
};
/**
 * Laravel naming convention. Sorry for inconvenience
 * @param {string} param String identifier of the text
 * @returns Text output desired to used in UI
 */
export function __(param) {
	return strings[param];
}
