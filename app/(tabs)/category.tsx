import { Search } from "@/assets";
import BackButton from "@/components/BackButton";
import Container from "@/components/Container";
import { categoryItems, labelItems } from "@/lib/data";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Category = () => {
  return (
    <Container>
      <View className="flex-row justify-between items-center my-5">
        <BackButton />
        <Text className="text-black text-xl font-bold">Filter & Labels</Text>
        <Search />
      </View>

      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-medium text-black">Filter your task</Text>
        <AntDesign name="plus" size={20} color="#767E8C" />
      </View>

      {categoryItems.map((item) => {
        return (
          <View key={item.id} className="my-2">
            <ProfileItem title={item.title} icon={item.icon} />
          </View>
        );
      })}

      <View className="flex-row justify-between items-center my-5">
        <Text className="text-lg font-medium text-black">Labels</Text>
        <AntDesign name="plus" size={20} color="#767E8C" />
      </View>

      {labelItems.map((item) => {
        return (
          <View key={item.id} className="my-2">
            <ProfileItem title={item.title} icon={item.icon} />
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
}

const ProfileItem = ({ title, icon }: ProfileItemProps) => {
  return (
    <TouchableOpacity className="flex-row justify-between items-center">
      <View className="flex-row gap-3 items-center">
        {icon}
        <Text className="text-base font-normal text-secondary">{title}</Text>
      </View>

      {/* {title !== "Instructions For Use" && <HeartIcon />} */}
    </TouchableOpacity>
  );
};
