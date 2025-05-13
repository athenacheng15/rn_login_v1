import {
	View,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
	Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { RootStackParamList } from "../types/navigation";
import { themeColors } from "../theme";
import { storeUser } from "../utils/auth";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SignUpScreen() {
	const navigation = useNavigation<NavigationProp>();
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignUp = async () => {
		try {
			if (!fullName || !email || !password) {
				Alert.alert("Error", "Please fill in all fields");
				return;
			}

			await storeUser({ email, password });
			Alert.alert("Success", "Account created successfully", [
				{
					text: "OK",
					onPress: () => navigation.navigate("Login"),
				},
			]);
		} catch (error) {
			if (error instanceof Error && error.message === "Email already exists") {
				Alert.alert("Error", "Email already exists");
			} else {
				Alert.alert("Error", "An error occurred during sign up");
			}
		}
	};

	return (
		<View
			className="flex-1 bg-white"
			style={{ backgroundColor: themeColors.bg }}
		>
			<SafeAreaView className="flex">
				<View className="flex-row justify-start">
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
					>
						<ArrowLeftIcon size="20" color="black" />
					</TouchableOpacity>
				</View>
				<View className="flex-row justify-center">
					<Image
						source={require("../assets/images/logo.png")}
						style={{ width: 150, height: 150 }}
					/>
				</View>
			</SafeAreaView>
			<View
				style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
				className="flex-1 bg-white px-8 pt-8"
			>
				<View className="form">
					<Text className="text-gray-700 ml-4 mb-2">Full Name</Text>
					<TextInput
						className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-6"
						placeholder="Full Name"
						value={fullName}
						onChangeText={setFullName}
					/>
					<Text className="text-gray-700 ml-4 mb-2">Email Address</Text>
					<TextInput
						className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-6"
						placeholder="email"
						value={email}
						onChangeText={setEmail}
						keyboardType="email-address"
						autoCapitalize="none"
					/>
					<Text className="text-gray-700 ml-4 mb-2">Password</Text>
					<TextInput
						className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-5"
						secureTextEntry
						placeholder="password"
						value={password}
						onChangeText={setPassword}
					/>
					<TouchableOpacity
						className="py-3 bg-yellow-400 rounded-xl mt-6 mb-4"
						onPress={handleSignUp}
					>
						<Text className="text-xl font-bold text-center text-gray-700">
							Sign Up
						</Text>
					</TouchableOpacity>
				</View>
				<Text className="text-xl text-gray-700 font-bold text-center py-5 mb-2">
					Or
				</Text>
				<View className="flex-row justify-center mb-2">
					<TouchableOpacity className="p-2 bg-gray-100 rounded-2xl mr-12">
						<Image
							source={require("../assets/icons/google.png")}
							className="w-10 h-10"
						/>
					</TouchableOpacity>
					<TouchableOpacity className="p-2 bg-gray-100 rounded-2xl mr-12">
						<Image
							source={require("../assets/icons/apple.png")}
							className="w-10 h-10"
						/>
					</TouchableOpacity>
					<TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
						<Image
							source={require("../assets/icons/facebook.png")}
							className="w-10 h-10"
						/>
					</TouchableOpacity>
				</View>
				<View className="flex-row justify-center mt-7">
					<Text className="text-gray-500 font-semibold">
						Already have an account?
					</Text>
					<TouchableOpacity onPress={() => navigation.navigate("Login")}>
						<Text className="font-semibold text-yellow-500">Login</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
