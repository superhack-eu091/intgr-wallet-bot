import { CallbackQueryContext, CommandContext, Context } from "grammy";
import { Callback, Command } from "../../../config/types";
import {
	createWalletHandler,
	handleBrowseBase,
	handleBrowseEth,
	handleBrowseOpt,
	handleBrowseZora,
	handleMintNft,
	handleMoreInfo,
	handleSkip,
	startCallbackHandler,
} from "./callbacks";
import { startCommandHandler } from "./commands";
import { handleMessages } from "./messages";

type BotConfig = {
	messageHandler: (ctx: Context) => Promise<void>;
	commandHandlers: Record<
		Command,
		(ctx: CommandContext<Context>) => Promise<void>
	>;
	callbackHandlers: Record<
		Callback,
		(ctx: CallbackQueryContext<Context>) => Promise<void>
	>;
};

const botConfig: BotConfig = {
	messageHandler: handleMessages,
	commandHandlers: {
		start: startCommandHandler,
	},
	callbackHandlers: {
		GET_STARTED: startCallbackHandler,
		CREATE_WALLET: createWalletHandler,
		BROWSE_BASE: handleBrowseBase,
		BROWSE_ZORA: handleBrowseZora,
		BROWSE_OPT: handleBrowseOpt,
		BROWSE_ETH: handleBrowseEth,
		MINT_NFT: handleMintNft,
		MORE_INFO: handleMoreInfo,
		SKIP_NFT: handleSkip,
	},
};

export default botConfig;
