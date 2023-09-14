import { useEffect, useContext, useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Box } from '@gluestack-ui/themed'
import Carousel from 'react-native-reanimated-carousel'
import { FirebaseContext } from '../context/firebase/FirebaseContext'
import { OrdersContext } from '../context/orders/OrdersContext'
import Food from '../components/Food'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'


const { width: screenWidth } =  Dimensions.get('window')

export const CategoryScreen = () => {

  const [ categories, setCategories ] = useState<any[]>([])

  const { getProducts, menu } = useContext(FirebaseContext)
  const { orders } = useContext(OrdersContext)

  const { navigate } = useNavigation<any>()

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    const updateState = () => {
      if(menu.length > 0){
  
        const getCategories = menu.filter( (item, i) => {
          const categoryBefore = i > 0 && menu[i -1].category   
          if(item.category !== categoryBefore) return item    
        })
    
        if(getCategories) setCategories(getCategories)
      }

    }
    updateState()
  }, [menu])


  return (
    <Box style={{ flex: 1, position: 'relative'}}>
      <Box style={styles.boxTop}>
        <Text style={styles.title}>RESTAURANTAPP</Text> 
        {
          orders.length > 0 && (
            <TouchableOpacity 
              style={styles.btnCart}
              onPress={() => navigate('SummaryOrderScreen')}
            >
              <Icon 
                name="shopping-basket"
                size={25}
                color="#fafafa"
              />
            </TouchableOpacity>
          )
        }        
      </Box>
      <Box style={ styles.container}>
        {
          categories.length > 0 && (
            <Carousel
              data={ categories }
              renderItem={ ({ item }) => (
                <Food item={item} />
              )}
              width={ screenWidth }
              height={600}
              mode='horizontal-stack'
              modeConfig={
                { 
                  moveSize: 1000, 
                  stackInterval: 30, 
                  scaleInterval: 0.12, 
                  snapDirection: 'left', 
                  opacityInterval: 0,
                  rotateZDeg: 400
                }
              }   
              style={{ marginBottom: 30 }}   
            />
          )
        }
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  boxTop: { 
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#14b8a6'
  },
  btnCart:{ 
    position: 'absolute', 
    right: 30, 
    top: 10, 
    width: 50, 
    height: 30,
    justifyContent: 'center',
    alignItems: 'center' 
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    color: '#fafafa',
    fontWeight: '800',
    fontSize: 25,
    textAlign: 'center',
    paddingVertical: 10,
    backgroundColor: '#14b8a6'
  },
})