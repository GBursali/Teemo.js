import axios from "axios";
import { addThousandSeperators } from "../helpers/helper.mjs";
import { SlashCommandBuilder } from "discord.js";
import infos from "../config/outsourceinformations.json" assert { type: "json" };

export const data = new SlashCommandBuilder()
    .setName("coin")
    .setDescription("Gives coin prices with specified conversion rate!")
    .addStringOption((option) =>
        option
            .setName("source")
            .setDescription("1 unit of this for exchange")
            .setRequired(true)
    )
    .addStringOption((option) =>
        option
            .setName("result")
            .setDescription("X unit in result of this exchange")
            .setRequired(true)
    );
export const permissions = [];

/**
 * Searches 2 objects inside the json.symbol and returns filtered results
 * @param {Json object} jsonBody Data to read
 * @param {string} source to be exchanged coin name, calculations are made for: 1 of these unit
 * @param {string} converter exchange coin name, exchange results in x units of this price
 * @returns All of the outputs containing the parameters given above
 */
function getRequestedAssets(jsonBody, source, converter) {
    return jsonBody.filter(
        (asset) =>
            asset.symbol.includes(source) && asset.symbol.includes(converter)
    );
}

/**
 * Adds Thousand seperators to the given price value
 * @param {string} price value to be seperated
 * @returns price with integer value seperated and floating point intact
 */
function normalizePrice(price) {
    //price without the floating point. Seperated because this number needs thousand seperators
    let mainPrice = /\d+/g.exec(price)[0];
    //decimal point (floating point) of the price. Integerified for further developments
    let floatingPrice = /\.\d{2}/g.exec(price)[0].substring(1);
    //Combined and normalized price
    return addThousandSeperators(mainPrice) + "." + floatingPrice;
}
export function execute(interaction) {
    interaction.deferReply();
    //formating the inputs for API calls
    let source = interaction.options.getString("source");
    let converter = interaction.options.getString("result");

    axios.get(infos.binanceURL).then((response) => {
        let requestedAssets = getRequestedAssets(
            response.data,
            source,
            converter
        );

        let outputBuilder = "Requested assets can be these:\n";
        requestedAssets.forEach((asset) => {
            let price = normalizePrice(asset.bidPrice);
            //MAYBE: this can be applied as a list?
            outputBuilder += `${asset.symbol} -> ${price} ${converter}\n`;
        });
        outputBuilder +=
            "Try some different keywords if these are not those which you are looking for.";

        interaction.editReply(outputBody);
    });
}
