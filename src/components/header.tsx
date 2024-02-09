import { Image, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { Link } from "expo-router";

//tipagem
type HeaderProps = {
  title: string;
  cartQuantityItems?: number;
};

export function Header({ title, cartQuantityItems = 0 }: HeaderProps) {
  return (
    <View className="flex-row items-center border-b border-slate-700 pb-5 mx-5">
      <View className="flex-1">
        {/* logo */}
        <Image source={require("@/assets/logo.png")} className="h-6 w-32" />
        {/* titulo da pagina de forma dinamica atraves do props*/}
        <Text className="text-white text-xl font-heading mt-2">{title}</Text>
      </View>

      {/* condição para aparecer apenas se o tiver pelo menos 1 item */}
      <Link href="/cart" asChild>
        {cartQuantityItems > 0 && (
          // deixar transparente ao tocar
          <TouchableOpacity className="relative" activeOpacity={0.7}>
            {/* bolinha com numero indicando a quantidade de itens no carrinho */}
            <View className="bg-lime-300 w-4 h-4 rounded-full items-center justify-center top-2 z-10 -right-3.5">
              <Text className="text-slate-900 font-bold text-xs">
                {cartQuantityItems}
              </Text>
            </View>

            {/* icone da sacola */}
            <Feather name="shopping-bag" color={colors.white} size={24} />
          </TouchableOpacity>
        )}
      </Link>
    </View>
  );
}
