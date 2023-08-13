import { ethers } from "ethers";
import { getBotWallet } from "../../bot-wallet.utils";

import { BaseContract } from "../BaseContract";
import abi from "./artifacts/abi.json";
import bytecode from "./artifacts/bytecode.json";

export class DelegateContract extends BaseContract {
	static deploy = async (chain: any) => {
		const signer = getBotWallet(chain);

		console.log("signer", signer.address);

		const factory = new ethers.ContractFactory(abi, bytecode.bytecode, signer);

		const contract = await factory.deploy();

		await contract.deployed();

		return contract;
	};
}
