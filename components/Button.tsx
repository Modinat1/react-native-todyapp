import { cn } from "@/lib/utils";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "icon";

interface AppButtonProps {
  children?: React.ReactNode;
  onPress?: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
}

const Button: React.FC<AppButtonProps> = ({
  children,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  textClassName = "",
}) => {
  const isDisabled = disabled || loading;

  const baseStyles = "flex-row items-center justify-center rounded-xl p-4";

  const variantStyles: Record<Variant, string> = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    outline: "border border-primary bg-transparent",
    ghost: "bg-transparent",
    icon: "p-3",
  };

  // const textColor: Record<Variant, string> = {
  //   primary: "text-background",
  //   secondary: "text-background",
  //   outline: "text-primary",
  //   ghost: "text-foreground",
  //   icon: "text-foreground",
  // };

  return (
    <TouchableOpacity
      disabled={isDisabled}
      activeOpacity={0.8}
      onPress={onPress}
      className={cn(
        baseStyles,
        variantStyles[variant],
        isDisabled && "opacity-50",
        className
      )}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : typeof children === "string" ? (
        <Text
          className={cn("font-inter-medium text-white", textClassName)}
          // className={cn("font-inter-medium text-white", textColor[variant], textClassName)}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default Button;
// import React from "react";
// import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

// interface ButtonProps {
//   className?: string;
//   onPress?: () => void;
//   loading?: boolean;
//   children: React.ReactNode;
//   icon?: React.ReactNode;
//   iconPosition?: "left" | "right";
// }

// const Button = ({
//   className = "",
//   onPress,
//   loading = false,
//   children,
//   icon,
//   iconPosition = "left",
// }: ButtonProps) => {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       disabled={loading}
//       className={`w-full mx-auto p-4 rounded-xl bg-primary flex-row items-center justify-center ${className}`}
//     >
//       {loading ? (
//         <ActivityIndicator color="#fff" />
//       ) : (
//         <View className="flex-row items-center justify-center gap-3">
//           {icon && iconPosition === "left" && (
//             <View className="mr-2">{icon}</View>
//           )}
//           <Text className="text-white text-center">{children}</Text>
//           {icon && iconPosition === "right" && (
//             <View className="ml-2">{icon}</View>
//           )}
//         </View>
//       )}
//     </TouchableOpacity>
//   );
// };

// export default Button;

// import React from "react";
// import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

// interface ButtonProps {
//   className?: string;
//   onPress?: () => void;
//   loading?: boolean;
//   children: React.ReactNode;
// }

// const Button = ({
//   className = "",
//   onPress,
//   loading,
//   children,
// }: ButtonProps) => {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       disabled={loading}
//       className={`w-full mx-auto p-4 rounded-xl bg-primary capitalize ${className}`}
//     >
//       {loading ? (
//         <ActivityIndicator color="#fff" />
//       ) : (
//         <Text className="text-white text-center">{children}</Text>
//       )}
//     </TouchableOpacity>
//   );
// };

// export default Button;
