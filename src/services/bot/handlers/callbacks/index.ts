import { CallbackQueryContext, Context, InlineKeyboard } from "grammy";

import _ from "lodash";
import { CALLBACKS } from "../../../../config/supported-commands";
import { availableNfts } from "../../../../utils/config";
import { DelegateContract } from "../../../../utils/contracts/delegate/Delegate";
import { UserService } from "../../../user";
import content from "./content.json";

export const createWalletHandler = async (
	ctx: CallbackQueryContext<Context>
) => {
	const user = await UserService.getUser(ctx.from?.id);

	if (!user) return;

	if (!user?.delegate_contract_address) {
		ctx.reply("please wait while we deploy delegation contract...");

		const delegateContract = await DelegateContract.deploy(user.selected_chain);

		user.delegate_contract_address = delegateContract.address;

		await user.save();
	}

	console.log("--delegateContract", user?.delegate_contract_address);

	ctx.reply(
		_.replace(
			content.paste_safe_wallet,
			"{delegate_addr}",
			`\`${user.delegate_contract_address}\``
		)
	);
};

export const startCallbackHandler = async (
	ctx: CallbackQueryContext<Context>
) => {
	const inlineKeyboard = new InlineKeyboard()
		.text(content.browse_chain.opt, CALLBACKS.BROWSE_OPT)
		.row()
		.text(content.browse_chain.base, CALLBACKS.BROWSE_BASE)
		.row()
		.text(content.browse_chain.zora, CALLBACKS.BROWSE_ZORA)
		.row()
		.text(content.browse_chain.eth, CALLBACKS.BROWSE_ETH);

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

export const handleBrowseEth = async (ctx: CallbackQueryContext<Context>) => {
	await handleBrowse(ctx, "eth");
};

const handleBrowse = async (
	ctx: CallbackQueryContext<Context>,
	chain: "opt" | "zora" | "base" | "eth"
) => {
	await UserService.setSelectedChain(ctx.from.id, chain);

	ctx.reply(
		content.top_nfts_description +
			Object.values(availableNfts[chain] as any)
				.map((nft: any, ind: number) =>
					_.replace(
						_.replace(
							_.replace(
								_.replace(
									content.collection_data_format,
									"{index}",
									ind.toString()
								),
								"{name}",
								nft.name
							),
							"{price}",
							nft.price
						),
						"{id}",
						`${nft.contractAddress}-${nft.tokenId}`
					)
				)
				.join("")
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
