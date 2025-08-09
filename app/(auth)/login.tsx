import Button from "@/components/Button";
import Container from "@/components/Container";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TextInput, View } from "react-native";

const Login = () => {
  const router = useRouter();
  return (
    <Container>
      <Text className="text-2xl text-center font-semibold text-black my-3">
        Welcome Back!
      </Text>
      <Text className="text-sm text-center font-normal text-secondary">
        You work faster and structured with Todyapp
      </Text>

      <View className="my-5">
        <Text className="text-black font-medium text-base mb-2">
          Email Address
        </Text>
        <TextInput
          className="bg-accent-foreground border border-border rounded-lg p-3"
          placeholder="name@example.com"
        />
      </View>

      <Button onPress={() => router.push("/(main)/themeScreen")}>Next</Button>
    </Container>
  );
};

export default Login;
