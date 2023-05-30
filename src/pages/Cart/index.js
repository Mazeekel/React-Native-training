import { View, Text, StyleSheet} from 'react-native'

export default function Cart(){
  return(
    <View style={stlyes.container}>
      <Text>Pagina Carrinho</Text>
    </View>
  )
}

const stlyes = StyleSheet.create({
  container:{
    flex:1
  }
})