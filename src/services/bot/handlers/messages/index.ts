import { Context, InlineKeyboard } from "grammy";
import _ from "lodash";

import { ethers } from "ethers";
import { userModel } from "../../../../models/user.model";
import { getBotWallet } from "../../../../utils/bot-wallet.utils";

import { availableNfts, getMockAddress } from "../../../../utils/config";
import delegateAbi from "../../../../utils/contracts/delegate/artifacts/abi.json";
import { UserService } from "../../../user";

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

	if (/.*-.*/.test(trimmedMessage)) {
		await handleNftChoiceSelection(ctx, trimmedMessage);
		return;
	}

	await handleSafeWallet(ctx, trimmedMessage);

	// ctx.reply("Incorrect format");
	return;
};

const handleSafeWallet = async (ctx: Context, trimmedMessage: string) => {
	const user = await UserService.getUser(ctx.from?.id ?? 0);

	if (!user) return;

	user.safe_wallet_address = trimmedMessage;

	await user.save();

	ctx.reply("Wallet saved successfully", {
		reply_markup: new InlineKeyboard().text(
			"Browse NFTs",
			`BROWSE_${user.selected_chain?.toUpperCase()}`
		),
	});
};

const handleNftChoiceSelection = async (
	ctx: Context,
	trimmedMessage: string
) => {
	const user = await userModel.findOne({ "telegram.id": ctx.from?.id });

	console.log(user, ctx.from?.id);

	if (!user || !user.selected_chain) return;

	if (!user.safe_wallet_address || !user.delegate_contract_address) {
		const inlineKeyboard = new InlineKeyboard().text(
			"Create Wallet",
			"CREATE_WALLET"
		);

		ctx.reply("No wallet detected", { reply_markup: inlineKeyboard });
		return;
	}

	const [address, tokenId] = trimmedMessage.split("-");

	const botSigner = getBotWallet(user.selected_chain);

	const contract = new ethers.Contract(
		user.delegate_contract_address,
		delegateAbi,
		botSigner
	);

	const purchaseArgs = [
		user.safe_wallet_address,
		address,
		tokenId,
		(availableNfts[user.selected_chain]?.[trimmedMessage] as any).price,
		getMockAddress(user.selected_chain),
	];

	console.log(purchaseArgs);

	ctx.reply("Please wait while we mint the NFT...");

	const tx = await contract.functions["buyNFT"]?.(...purchaseArgs);

	await tx.wait();

	ctx.reply(`NFT purchased in transaction ${tx.hash}`);
	ctx.reply("Mint Successful");
};
