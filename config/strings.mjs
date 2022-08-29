const strings = {
    UNKNOWN_COMMAND: "wOt?",
    ERROR: "Beynim yandı knk. Hatayı konsola verdim admine söyle çözsün.",
    NOT_ENOUGH_ARGS: "Yeterince parametre girmedin.",
    PERMISSION_ERROR:
        "Bunun için iznin yok. Şimdilik tüm komutlar @Mod lar ile sınırlı.",
};
/**
 * Laravel naming convention. Sorry for inconvenience
 * @param {string} param String identifier of the text
 * @returns Text output desired to used in UI
 */
export function __(param) {
    return strings[param];
}
