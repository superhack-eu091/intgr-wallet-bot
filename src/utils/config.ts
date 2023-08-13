import { ethers } from "ethers";

const NETWORK_CONFIG = {
	eth: {
		rpc: "https://goerli.infura.io/v3/65de9f0218ba466880107a2edca5f5a2",
	},
	opt: {
		rpc: "https://optimism-goerli.infura.io/v3/65de9f0218ba466880107a2edca5f5a2",
	},
	base: {
		rpc: "https://goerli.base.org",
	},
	zora: {
		rpc: "https://rpc.zora.energy",
	},
};

const PROJECT_CONF = {
	eth: {
		mockMarketAddress: "0xb4f19bC25D2c31A109eb620973B693bE2029147e",
	},
	opt: {
		mockMarketAddress: "0x71efD4dD2Aa261F259041122A4249735858AFFEb",
	},
	base: {
		mockMarketAddress: "0x6e4317694661BBd113Fd3907Dd0E34A6acFcac17",
	},
	zora: {
		mockMarketAddress: "0x01550034cAEC5e97B6980294319eb6d02cc8A25D",
	},
};

export const getRpcUrl = (chain: "opt" | "base" | "zora" | "eth"): any => {
	return NETWORK_CONFIG[chain].rpc;
};

export const getMockAddress = (chain: "opt" | "base" | "zora" | "eth") => {
	return PROJECT_CONF[chain].mockMarketAddress;
};

export const availableNfts: Record<
	"opt" | "base" | "zora" | "eth",
	{
		[i: string]: {
			name: string;
			price: ethers.BigNumber;
			contractAddress: string;
			tokenId: string;
		};
	}
> = {
	eth: {
		"0x078e476F7904CAd86F349d11e643ed922B5fF470-0": {
			contractAddress: "0x078e476F7904CAd86F349d11e643ed922B5fF470",
			name: "ETH Mock NFT",
			price: ethers.utils.parseUnits("1", "wei"),
			tokenId: "0",
		},
	},
	opt: {
		"0x078e476F7904CAd86F349d11e643ed922B5fF470-0": {
			contractAddress: "0x078e476F7904CAd86F349d11e643ed922B5fF470",
			name: "ETH Mock NFT",
			price: ethers.utils.parseUnits("1", "wei"),
			tokenId: "0",
		},
	},
	base: {
		"0x078e476F7904CAd86F349d11e643ed922B5fF470-0": {
			contractAddress: "0x078e476F7904CAd86F349d11e643ed922B5fF470",
			name: "ETH Mock NFT",
			price: ethers.utils.parseUnits("1", "wei"),
			tokenId: "0",
		},
	},
	zora: {
		"0x078e476F7904CAd86F349d11e643ed922B5fF470-0": {
			contractAddress: "0x078e476F7904CAd86F349d11e643ed922B5fF470",
			name: "ETH Mock NFT",
			price: ethers.utils.parseUnits("1", "wei"),
			tokenId: "0",
		},
	},
};
