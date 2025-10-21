import { AuthService } from "@/api/services/authServices";
import Button from "@/components/Button";
import Container from "@/components/Container";
import useAuthStore from "@/store/features/useAuthStore";
import Feather from "@expo/vector-icons/Feather";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  // const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: any) => AuthService.signIn(data),
    onSuccess: async (data: any) => {
      console.log(
        "Data.data from login:::::::::",
        JSON.stringify(data.data, null, 2)
      );
      console.log("token:::::::::", JSON.stringify(data.data.token, null, 2));
      // console.log("user::::::", data.data.user);
      // console.log("userId:::::::", data.data.user.userId);
      // console.log("Data from login:::::::::", JSON.stringify(data, null, 2));

      login(
        {
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          // username: data.data.username,
          email: data.data.user.email,
          gender: data.data.gender,
          image: data.data.image,
          userId: data.data.user.userId,
          token: data.data.token,
        },
        data.data.token
      );

      Toast.show({
        type: "success",
        text1: "Login successful",
        visibilityTime: 2000,
      });

      setTimeout(() => router.replace("/(main)/themeScreen"), 3000);
    },
    onError: (error: any) => {
      setError(error.message || "Error signing in");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.message || "Failed to login",
      });
      console.error("Login error:", error);
    },
  });

  const onSubmit = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    setError("");
    await mutateAsync({ email: email, password });
  };

  return (
    <Container>
      <View className="flex-1 justify-between">
        <View className="mt-5">
          <Text className="text-2xl text-center font-semibold text-black my-3">
            Welcome Back!
          </Text>
          <Text className="text-sm text-center font-normal text-secondary">
            You work faster and structured with Todyapp
          </Text>
          {/* 
          <View className="my-5">
            <Text className="text-black font-medium text-base mb-2">
              Username
            </Text>
            <TextInput
              value={userName}
              onChangeText={setUserName}
              autoCapitalize="none"
              keyboardType="email-address"
              className="bg-secondary-foreground border border-border rounded-[6px] p-3"
              placeholder="name@example.com"
              placeholderTextColor="#A9B0C5"
            />
          </View> */}
          <View className="my-5">
            <Text className="text-black font-medium text-base mb-2">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              className="bg-secondary-foreground border border-border rounded-[6px] p-3"
              placeholder="name@example.com"
              placeholderTextColor="#A9B0C5"
            />
          </View>

          <View>
            <Text className="text-black font-medium text-base mb-2">
              Password
            </Text>
            <View className="bg-secondary-foreground border border-border rounded-[6px] flex-row items-center px-3">
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                className="flex-1 py-3"
                placeholder="Enter your password"
                placeholderTextColor="#A9B0C5"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={22}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
          </View>

          {error ? (
            <Text className="text-red-500 text-center mb-3">{error}</Text>
          ) : null}

          <View className="flex-row justify-center text-base mt-5">
            <Text className="text-secondary">Don&#39;t have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
              <Text className="text-primary">Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Button loading={isPending} onPress={onSubmit}>
          Next
        </Button>
      </View>
    </Container>
  );
};

export default Login;
