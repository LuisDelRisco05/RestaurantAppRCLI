import { useContext } from 'react'
import { StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native'

import { OrdersContext } from '../context/orders/ordersContext'

import { Box, Image, Text } from '@gluestack-ui/themed'
import Icon from 'react-native-vector-icons/FontAwesome6'


export const DishDetailsScreen = () => {

  const { order } = useContext(OrdersContext)

  const { category, description, exist, image, name, price } = order

  const { goBack } = useNavigation<any>()

  return (
    <Box style={ styles.container }>
      <Box style={styles.containerImg}>
        <TouchableOpacity style={styles.iconBack} onPress={() => goBack() }>
            <Icon 
              name="angle-left"
              size={ 25 }
              color="#fafafa"
            />
          </TouchableOpacity>
          <Image 
              source={{ uri: image }}
              style={styles.img}
          />   
      </Box>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>Price: ${price}</Text>
  
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  iconBack:{
    position: 'absolute',
    top: 15,
    left: 10,
    width: 30,
    height: 30,
    zIndex: 5
  },
  containerImg: {
    width: '100%',
    height: 450,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.27,
    shadowRadius: 15.65,

    elevation: 6,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  name: {
    fontWeight: '800',
    color: '#1e293b',
    fontSize: 25,
    marginTop: 10,
    padding: 5
  },
  description: {
    fontWeight: '500',
    color: '#9ca3af',
    fontSize: 16,
    marginTop: 10,
    padding: 5,
    width: '100%'
  },
  price: {
    fontWeight: '900',
    color: '#1e293b',
    fontSize: 16,
    marginTop: 10,
    padding: 5,
    width: '100%'
  }
})
