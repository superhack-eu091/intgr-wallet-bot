import { CallbackQueryContext, CommandContext, Context } from "grammy";
import { Callback, Command } from "../../../config/types";
import {
	handleBrowseBase,
	handleBrowseOpt,
	handleBrowseZora,
	handleMintNft,
	handleMoreInfo,
	handleSkip,
	handleTimeline1h,
	handleTimeline24h,
	handleTimeline6h,
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
		BROWSE_BASE: handleBrowseBase,
		BROWSE_ZORA: handleBrowseZora,
		BROWSE_OPT: handleBrowseOpt,
		TIMELINE_1h: handleTimeline1h,
		TIMELINE_6h: handleTimeline6h,
		TIMELINE_24h: handleTimeline24h,
		MINT_NFT: handleMintNft,
		MORE_INFO: handleMoreInfo,
		SKIP_NFT: handleSkip,
	},
};

export default botConfig;
