import { CallbackQueryContext, Context, InlineKeyboard } from "grammy";

import _ from "lodash";
import { CALLBACKS } from "../../../../config/supported-commands";
import { UserService } from "../../../user";
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
	await UserService.setSelectedChain(ctx.from.id, chain);

	const inlineKeyboard = new InlineKeyboard()
		.text(content.time_lines["1h"], CALLBACKS.TIMELINE_1h)
		.row()
		.text(content.time_lines["6h"], CALLBACKS.TIMELINE_6h)
		.row()
		.text(content.time_lines["24h"], CALLBACKS.TIMELINE_24h)
		.row();

	ctx.reply(_.replace(content.top_nfts_description, "{chain}", chain), {
		reply_markup: inlineKeyboard,
	});
};

export const handleTimeline1h = async (ctx: CallbackQueryContext<Context>) => {
	await handleTimeline(ctx, "1h");
};

export const handleTimeline6h = async (ctx: CallbackQueryContext<Context>) => {
	await handleTimeline(ctx, "6h");
};

export const handleTimeline24h = async (ctx: CallbackQueryContext<Context>) => {
	await handleTimeline(ctx, "24h");
};

const handleTimeline = async (
	ctx: CallbackQueryContext<Context>,
	timeline: "1h" | "6h" | "24h"
) => {
	await UserService.setSelectedTimeline(ctx.from.id, timeline);

	const getCollectionDescription = (
		_collectionData: {},
		index: number
	): string => {
		return _.replace(
			_.replace(
				content.collection_data_format,
				"{index}",
				(index + 1).toString()
			),
			"{timeline}",
			timeline
		);
	};

	const inlineKeyboard = new InlineKeyboard()
		.text(content.mint_nfts_cta, CALLBACKS.MINT_NFT)
		.row()
		.text(content.more_info_cta, CALLBACKS.MORE_INFO)
		.row()
		.text(content.skip_cta, CALLBACKS.SKIP_NFT);

	// TODO
	const trendingNfts = [{}, {}, {}, {}, {}];

	ctx.reply(
		_.replace(
			content.trending_description +
				trendingNfts.map(getCollectionDescription).join("\n\n"),
			"{timeline}",
			timeline
		),
		{
			reply_markup: inlineKeyboard,
		}
	);
};

export const handleMintNft = async (ctx: CallbackQueryContext<Context>) => {
	ctx.reply(content.mint_nft_message);
};

export const handleMoreInfo = async (ctx: CallbackQueryContext<Context>) => {
	ctx.reply("// Should display more info");
};

export const handleSkip = async (ctx: CallbackQueryContext<Context>) => {
	ctx.reply("// Should skip");
};

export const handleConfirmSelection = async (
	ctx: CallbackQueryContext<Context>
) => {
	console.log("--confirm selection", ctx.from.username);
};

export const handleEditSelection = async (
	ctx: CallbackQueryContext<Context>
) => {
	ctx.reply(content.edit_selection_text);
};
