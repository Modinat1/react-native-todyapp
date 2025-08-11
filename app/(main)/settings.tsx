import { Search } from "@/assets";
import BackButton from "@/components/BackButton";
import Container from "@/components/Container";
import { settingOtherItems, settingsItems } from "@/lib/data";
import useAuthStore from "@/store/features/useAuthStore";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Switch, Text, View } from "react-native";

const Settings = () => {
  const { firstName, image, lastName, username } = useAuthStore();

  const getInitials = (firstName?: string | null, lastName?: string | null) => {
    if (!firstName && !lastName) return "";

    const firstInitial = firstName?.trim()?.charAt(0).toUpperCase() || "";
    const lastInitial = lastName?.trim()?.charAt(0).toUpperCase() || "";

    return `${firstInitial}${lastInitial}`;
  };

  return (
    <Container>
      <View className="flex-row justify-between items-center my-10">
        <BackButton />
        <Text className="text-black text-xl font-bold"> Settings</Text>
        <Search />
      </View>
      <View className="justify-center items-center gap-y-3">
        <View className="bg-[#E0E5ED] rounded-full w-24 h-24 overflow-hidden">
          <Image
            source={image ? { uri: image } : undefined}
            resizeMode="cover"
            className="w-full h-full"
          />
          {!image && (
            <Text className="text-lg font-bold">
              {getInitials(firstName, lastName)}
            </Text>
          )}
        </View>

        <Text className="text-black text-lg font-medium">
          {firstName} {lastName}
        </Text>
        <Text className="text-black text-base font-normal">@{username}</Text>
      </View>
      {settingsItems.map((item) => {
        return (
          <View key={item.id} className="my-2">
            <ProfileItem title={item.title} icon={item.icon} />
          </View>
        );
      })}
      <View className="border-b border-[#E0E5ED] w-full mb-2"></View>

      {settingOtherItems.map((item) => {
        return (
          <View key={item.id} className="my-2">
            <ProfileItem title={item.title} icon={item.icon} />
          </View>
        );
      })}
    </Container>
  );
};

export default Settings;

interface ProfileItemProps {
  title: string;
  icon: any;
  arrowIcon?: any;
}

const ProfileItem = ({ title, icon }: ProfileItemProps) => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-row gap-3 items-center">
        {icon}
        <Text className="text-base font-normal text-secondary">{title}</Text>
      </View>

      {title === "Change Mode" ? (
        <Switch
          value={isEnabled}
          onValueChange={setIsEnabled}
          trackColor={{ false: "#767E8C", true: "#24A19C" }}
          thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
        />
      ) : (
        <AntDesign name="right" size={18} color="#767E8C" />
      )}
    </View>
  );
};
