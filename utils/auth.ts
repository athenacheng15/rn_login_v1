import * as SecureStore from "expo-secure-store";

interface User {
	email: string;
	password: string;
}

export const storeUser = async (user: User) => {
	try {
		const users = await getUsers();
		// 檢查郵箱是否已存在
		if (users.some((u) => u.email === user.email)) {
			throw new Error("Email already exists");
		}
		users.push(user);
		await SecureStore.setItemAsync("users", JSON.stringify(users));
		return true;
	} catch (error) {
		console.error("Error storing user:", error);
		throw error;
	}
};

export const getUsers = async (): Promise<User[]> => {
	try {
		const usersJson = await SecureStore.getItemAsync("users");
		return usersJson ? JSON.parse(usersJson) : [];
	} catch (error) {
		console.error("Error getting users:", error);
		return [];
	}
};

export const loginUser = async (
	email: string,
	password: string
): Promise<boolean> => {
	try {
		const users = await getUsers();
		const user = users.find(
			(u) => u.email === email && u.password === password
		);
		if (user) {
			// 存儲當前登入的用戶
			await SecureStore.setItemAsync("currentUser", JSON.stringify(user));
			return true;
		}
		return false;
	} catch (error) {
		console.error("Error logging in:", error);
		throw error;
	}
};

export const getCurrentUser = async (): Promise<User | null> => {
	try {
		const userJson = await SecureStore.getItemAsync("currentUser");
		return userJson ? JSON.parse(userJson) : null;
	} catch (error) {
		console.error("Error getting current user:", error);
		return null;
	}
};

export const logoutUser = async () => {
	try {
		await SecureStore.deleteItemAsync("currentUser");
	} catch (error) {
		console.error("Error logging out:", error);
		throw error;
	}
};
