import { Context, InlineKeyboard } from "grammy";
import _ from "lodash";

import content from "./content.json";

export const handleMessages = async (ctx: Context) => {
	const messageText = ctx.message?.text;

	if (!messageText) {
		ctx.reply("Only text messages are supported as of now");
		return;
	}

	const trimmedMessage = _.replace(
		_.replace(_.trim(messageText), / /g, ""),
		/\n/g,
		""
	);

	if (/\(.,.\)[,]*/.test(trimmedMessage)) {
		handleNftChoiceSelection(ctx, trimmedMessage);
		return;
	}

	ctx.reply("Incorrect format");
	return;
};

const handleNftChoiceSelection = (ctx: Context, trimmedMessage: string) => {
	const selectedCollections: { collectionInd: string; quantity: string }[] = [];

	const regExp = /(\(.,.\))/g;

	let data = regExp.exec(trimmedMessage);

	while (data !== null) {
		console.log(data[0]);

		const regExp1 = /\((.),(.)\)/g;

		let [, collectionInd, quantity] = regExp1.exec(data[0]) ?? [];

		if (!collectionInd || !quantity) {
			ctx.reply("Something Went Wrong!");
			return;
		}

		selectedCollections.push({ collectionInd, quantity });

		data = regExp.exec(trimmedMessage);
	}

	const inlineKeyboard = new InlineKeyboard()
		.text(content.cta.confirm_selection)
		.row()
		.text(content.cta.edit_selection);

	ctx.reply(
		content.selected_base +
			selectedCollections.map((collection) =>
				_.replace(
					_.replace(
						content.selected_review_template,
						"{collection}",
						collection.collectionInd
					),
					"{quantity}",
					collection.quantity
				)
			),
		{
			reply_markup: inlineKeyboard,
		}
	);
};
