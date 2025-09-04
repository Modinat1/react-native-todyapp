import { AuthService } from "@/api/services/authServices";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Feather from "@expo/vector-icons/Feather";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const Register = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: any) => AuthService.register(data),
    onSuccess: async (data: any) => {
      console.log(
        "Data from register:::::::::",
        JSON.stringify(data.data, null, 2)
      );

      router.replace("/(auth)/login");
    },
    onError: (error: any) => {
      setError(error.message || "Error signing in");
      console.error("Login error:", error);
    },
  });

  const onSubmit = async () => {
    if (!email || !password || !userName) {
      setError("Please all fields");
      return;
    }
    setError("");
    await mutateAsync({ email: email, userName: userName, password });
  };

  return (
    <Container>
      <View className="flex-1 justify-between">
        <View className="mt-5">
          <Text className="text-2xl text-center font-semibold text-black my-3">
            Create Account
          </Text>
          <Text className="text-sm text-center font-normal text-secondary">
            Create your account and feel the benefits
          </Text>

          <View className="mt-5">
            <Text className="text-black font-medium text-base mb-2">
              Username
            </Text>
            <TextInput
              value={userName}
              onChangeText={setUserName}
              autoCapitalize="none"
              keyboardType="email-address"
              className="bg-secondary-foreground border border-border rounded-[6px] p-3"
              placeholder="johndoe"
              placeholderTextColor="#A9B0C5"
            />
          </View>

          <View className="my-3">
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
            <Text className="text-secondary"> Already registered? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text className="text-primary">Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Button disabled={isPending} loading={isPending} onPress={onSubmit}>
          Sign up
        </Button>
      </View>
    </Container>
  );
};

export default Register;
