import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { themeColors } from "../theme";
import { logoutUser } from "../utils/auth";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
	const navigation = useNavigation<NavigationProp>();

	const handleLogout = async () => {
		try {
			await logoutUser();
			navigation.navigate("Welcome");
		} catch (error) {
			Alert.alert("Error", "Failed to logout");
		}
	};

	return (
		<SafeAreaView
			className="flex-1"
			style={{ backgroundColor: themeColors.bg }}
		>
			<View className="flex-1 items-center justify-center">
				<Text className="font-bold text-2xl text-white mb-8">
					LOGIN SUCCESSED
				</Text>
				<TouchableOpacity
					className="py-3 px-8 bg-yellow-400 rounded-xl"
					onPress={handleLogout}
				>
					<Text className="text-xl font-bold text-gray-700">Logout</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
