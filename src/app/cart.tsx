import { useState } from "react";
import { View, Text, ScrollView, Alert, Linking } from "react-native";
import { useNavigation } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { ProductCartProps, useCartStore } from "@/stores/cart-store";

import { formatCurrency } from "@/utils/functions/format-currency";

import { Header } from "@/components/header";
import { Product } from "@/components/product";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";

const PHONE_NUMBER = "5521991891624"

export default function Cart() {
  const [adress, setAdress] = useState("")
  const cartStore = useCartStore();
  const navigation = useNavigation()

  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  );

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert("Remover", `Deseja remover ${product.title}?`, [
      { text: "cancelar" },
      {
        text: "Remover",
        onPress: () => cartStore.remove(product.id),
      },
    ]);
  }

  function handleOrder(){
    if(adress.trim().length === 0){
      return Alert.alert('Pedido', 'informe os dados do endereço')
    }else{
      const products = cartStore.products.map((product) => 
      `\n ${product.quantity} - ${product.title}`)
      .join("")

      const message = `🍽 NOVO PEDIDO
    \n Entregar em: ${adress}
    \n ${products}
    \n Valor total: ${total}
      `

      Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)
  
      cartStore.clear()

      Alert.alert('pedido', 'Pedido feito com sucesso!')
      navigation.goBack()
    }
  }

  return (
    <View className="flex-1 py-8">
      <Header title="Seu carrinho" />

      <KeyboardAwareScrollView>
        <ScrollView>
          {cartStore.products.length > 0 ? (
            <View className="flex-1 m-5 border-b border-slate-700">
              {cartStore.products.map((product) => (
                <Product
                  key={product.id}
                  data={product}
                  onPress={() => handleProductRemove(product)}
                />
              ))}
            </View>
          ) : (
            <Text className="text-slate-400 text-center my-8 font-heading">
              Seu carrinho está vazio
            </Text>
          )}

          <View className="flex-1 flex-row px-5 mb-5 text-center gap-2">
            <Text className="text-slate-100 text-2xl font-subtitle">
              Total:{" "}
            </Text>
            <Text className="text-lime-400 text-3xl font-subtitle">
              {total}
            </Text>
          </View>

          <Input
            className="mx-5"
            onChangeText={setAdress}
            onSubmitEditing={handleOrder}
            blurOnSubmit={true}
            returnKeyType="next"
            placeholder="Informe o endereço de entrega com rua, bairro, CEP, numero e complemento"
          />
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
}
