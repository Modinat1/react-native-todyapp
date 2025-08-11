import { HeartIcon, Search } from "@/assets";
import BackButton from "@/components/BackButton";
import Container from "@/components/Container";
import { projectItems } from "@/lib/data";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Category = () => {
  return (
    <Container>
      <View className="flex-row justify-between items-center my-5">
        <BackButton />
        <Text className="text-black text-xl font-bold">Projects</Text>
        <Search />
      </View>

      <View className="flex-row justify-between items-center mt-3">
        <Text className="text-lg font-medium text-black">Filter your task</Text>
        <AntDesign name="plus" size={20} color="#767E8C" />
      </View>

      {projectItems.map((item) => {
        return (
          <View key={item.id} className="my-3">
            <ProfileItem
              route={item.route}
              title={item.title}
              icon={item.icon}
            />
          </View>
        );
      })}
    </Container>
  );
};

export default Category;

interface ProfileItemProps {
  title: string;
  icon: any;
  arrowIcon?: any;
  route?: string;
}

const ProfileItem = ({ title, icon, route }: ProfileItemProps) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => route && router.push(route as any)}
      className="flex-row justify-between items-center"
    >
      <View className="flex-row gap-3 items-center">
        {icon}
        <Text className="text-base font-normal text-secondary">{title}</Text>
      </View>

      {title !== "Instructions For Use" && <HeartIcon />}
    </TouchableOpacity>
  );
};
