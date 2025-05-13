import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { themeColors } from "../theme";
import { RootStackParamList } from "../types/navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function WelcomeScreen() {
	const navigation = useNavigation<NavigationProp>();

	return (
		<SafeAreaView
			className="flex-1"
			style={{ backgroundColor: themeColors.bg }}
		>
			<View className="flex flex-1 justify-around my-4">
				<Text className="text-white font-bold text-4xl text-center">
					WelcomeScreen
				</Text>
				<View className="flex-row justify-center">
					<Image
						source={require("../assets/images/logo.png")}
						style={{ width: 350, height: 350 }}
					/>
				</View>
				<View>
					<TouchableOpacity
						onPress={() => navigation.navigate("SignUp")}
						className="py-3 bg-yellow-400 mx-7 rounded-xl"
					>
						<Text className="text-xl font-bold text-center text-gray-700">
							Sign Up
						</Text>
					</TouchableOpacity>
					<View className="flex-row justify-center mt-8">
						<Text className="text-white font-semibold">
							Already have an account?
						</Text>
						<TouchableOpacity onPress={() => navigation.navigate("Login")}>
							<Text className="font-semibold text-yellow-400"> Log In</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
}
