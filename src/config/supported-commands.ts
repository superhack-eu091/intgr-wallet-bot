import { Callback } from "./types";

export const CALLBACKS: Record<Partial<Callback>, Partial<Callback>> = {
	GET_STARTED: "GET_STARTED",
	BROWSE_BASE: "BROWSE_BASE",
	CREATE_WALLET: "CREATE_WALLET",
	BROWSE_OPT: "BROWSE_OPT",
	BROWSE_ETH: "BROWSE_ETH",
	BROWSE_ZORA: "BROWSE_ZORA",
	MINT_NFT: "MINT_NFT",
	MORE_INFO: "MORE_INFO",
	SKIP_NFT: "SKIP_NFT",
};
