import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  className?: string;
  onPress?: () => void;
  loading?: boolean;
  children: React.ReactNode;
}

const Button = ({
  className = "",
  onPress,
  loading,
  children,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      className={`w-full mx-auto p-4 rounded-xl bg-primary capitalize ${className}`}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-white text-center">{children}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
