import { IUser, userModel } from "../../models/user.model";

export class UserService {
	static createIfDoesntExist = async (user: IUser["telegram"]) => {
		const userObj = userModel.findOne({ telegram: { id: user.id } });

		if (!userObj) userModel.create({ telegram: user });
	};
}
