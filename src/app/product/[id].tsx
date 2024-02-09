import { View, Text, Image } from "react-native";
import {Feather} from '@expo/vector-icons'
import { useLocalSearchParams, useNavigation, Redirect } from "expo-router";

import { useCartStore } from "@/stores/cart-store";

import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";

import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";

export default function Product() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation()
  const cartStore = useCartStore()

  const product = PRODUCTS.find((item) => item.id === id)


  function handleAddToCart(){
    if(product){
      cartStore.add(product)
      navigation.goBack()
    }
  }

  console.log(cartStore);

  if (!product) {
    return <Redirect href="/" />
  }
  
  return (
    <View className="flex-1">
      <Image
        source={product.cover}
        className=" w-full  h-52 mb-8"
        resizeMode="cover"
      />

      <View className="flex-1 p-5 gap-2">
        <Text className="text-slate-100 text-2xl">{product.title}</Text>

        <Text className="text-lime-400 text-3xl font-heading">
          {formatCurrency(product.price)}
        </Text>

        <Text className="text-slate-400 font-body text-base leading-6 mb-3">
          {product.description}
        </Text>

        {product.ingredients.map((ingredient) => (
          <Text key={ingredient} className="text-slate-400 font-body text-base">
            {"\u2022"} {ingredient}
          </Text>
        ))}
      </View>

      <View className="p-5 pb-8 gap-5">
            <Button onPress={handleAddToCart}>
                <Button.Icon>
                     <Feather name="plus-circle" size={20} /> 
                </Button.Icon>

                <Button.Text>Adicionar ao pedido</Button.Text>
            </Button>

            <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
}
