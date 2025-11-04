import { useGetUser } from "@/api/hooks/user";
import { Search } from "@/assets";
import BackButton from "@/components/BackButton";
import Container from "@/components/Container";
import Loader from "@/components/Loader";
import { settingOtherItems, settingsItems } from "@/lib/data";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Switch, Text, View } from "react-native";

const Settings = () => {
  const { data: userProfile, isLoading, isError } = useGetUser();

  if (isLoading) {
    return <Loader />;
  }
  if (isError)
    return (
      <Text className="text-center text-lg text-destructive font-medium">
        Error loading user data
      </Text>
    );

  const getInitials = (name?: string) => {
    if (!name) return "NA";
    const parts = name.trim().split(" ");
    return parts.length === 1
      ? parts[0][0].toUpperCase()
      : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const capitalizeName = (name?: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <Container>
      <View className="flex-row justify-between items-center my-10">
        <BackButton />
        <Text className="text-black text-xl font-bold"> Settings</Text>
        <Search />
      </View>
      <View className="justify-center items-center gap-y-3">
        {/* <View className="bg-[#E0E5ED] rounded-full w-24 h-24 overflow-hidden">
          <Image
            source={image ? { uri: image } : undefined}
            resizeMode="cover"
            className="w-full h-full"
          />
          {!image && (
            <Text className="text-3xl text-black font-bold capitalize">
              {getInitials(userProfile?.user?.userName)}
            </Text>
          )}
        </View>  */}

        <View className="bg-[#E0E5ED] rounded-full w-24 h-24 justify-center items-center">
          <Text className="text-3xl text-black font-bold capitalize">
            {getInitials(userProfile?.user?.userName)}
          </Text>
        </View>

        <Text className="text-black text-lg font-medium">
          {capitalizeName(userProfile?.user?.userName)}
        </Text>
        <Text className="text-black text-sm font-normal">
          {userProfile?.user?.email}
        </Text>
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
