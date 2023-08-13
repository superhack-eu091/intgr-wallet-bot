import mongoose from "mongoose";

export type IUser = {
	telegram: {
		id: number;
		first_name: string;
		last_name?: string;
		is_premium?: true;
		language_code?: string;
		username?: string;
	};
	selected_chain?: "opt" | "base" | "zora" | "eth";
	safe_wallet_address?: string;
	delegate_contract_address?: string;
};

const userSchema = new mongoose.Schema<IUser>({
	telegram: {
		id: {
			type: Number,
			unique: true,
			required: true,
		},
		first_name: {
			type: String,
			required: true,
		},
		last_name: {
			type: String,
		},
		is_premium: {
			type: Boolean,
		},
		language_code: {
			type: String,
		},
		username: {
			type: String,
			unique: true,
		},
	},
	selected_chain: {
		type: String,
		enum: ["opt", "base", "zora", "eth"],
	},
	safe_wallet_address: {
		type: String,
	},
	delegate_contract_address: {
		type: String,
	},
});

export const userModel = mongoose.model<IUser>("User", userSchema);
