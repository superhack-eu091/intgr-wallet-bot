import { CallbackQueryContext, Context, InlineKeyboard } from "grammy";

import _ from "lodash";
import { CALLBACKS } from "../../../../config/supported-commands";
import content from "./content.json";

export const startCallbackHandler = async (
	ctx: CallbackQueryContext<Context>
) => {
	const inlineKeyboard = new InlineKeyboard()
		.text(content.browse_chain.opt, CALLBACKS.BROWSE_OPT)
		.row()
		.text(content.browse_chain.base, CALLBACKS.BROWSE_BASE)
		.row()
		.text(content.browse_chain.zora, CALLBACKS.BROWSE_ZORA);

	ctx.reply(content.browse_nft, { reply_markup: inlineKeyboard });
};

export const handleBrowseOpt = async (ctx: CallbackQueryContext<Context>) => {
	await handleBrowse(ctx, "opt");
};

export const handleBrowseBase = async (ctx: CallbackQueryContext<Context>) => {
	await handleBrowse(ctx, "base");
};

export const handleBrowseZora = async (ctx: CallbackQueryContext<Context>) => {
	await handleBrowse(ctx, "zora");
};

const handleBrowse = async (
	ctx: CallbackQueryContext<Context>,
	chain: "opt" | "zora" | "base"
) => {
	ctx.reply(_.replace(content.top_nfts_description, "{chain}", chain));
};
