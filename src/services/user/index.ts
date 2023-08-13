import { IUser, userModel } from "../../models/user.model";

export class UserService {
	static createIfDoesntExist = async (user: IUser["telegram"]) => {
		const userObj = await userModel.findOne({ "telegram.id": user.id });

		console.log({ userObj });

		if (!userObj) await userModel.create({ telegram: user });
	};

	static getUser = async (id: IUser["telegram"]["id"]) => {
		return await userModel.findOne({ "telegram.id": id });
	};

	static setSelectedChain = async (
		tgId: number,
		selectedChain: "opt" | "base" | "zora" | "eth"
	) => {
		await userModel.findOneAndUpdate(
			{ "telegram.id": tgId },
			{ $set: { selected_chain: selectedChain } }
		);
	};
}
