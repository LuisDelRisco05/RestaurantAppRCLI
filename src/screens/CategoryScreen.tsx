import { useEffect, useContext, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { FirebaseContext } from '../context/firebase/FirebaseContext'
import Food from '../components/Food'
import { Box } from '@gluestack-ui/themed'

const { width: screenWidth } =  Dimensions.get('window')

export const CategoryScreen = () => {

  const [ categories, setCategories ] = useState<any[]>([])

  const { getProducts, menu } = useContext(FirebaseContext)

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

  // console.log(JSON.stringify(categories, null, 3))


  return (
    <>
    <Text style={styles.title}>Categories</Text>
      <Box style={ styles.container}>
        {
          categories.length > 0 && (
            <Carousel
              data={ categories }
              renderItem={ ({ item }) => (
                <Food item={item} />
              )}
              width={ screenWidth }
              height={500}
              mode='horizontal-stack'
              modeConfig={
                { 
                  moveSize: 1000, 
                  stackInterval: 30, 
                  scaleInterval: 0.1, 
                  snapDirection: 'left', 
                  opacityInterval: 0,
                  rotateZDeg: 400
                }
              }      
            />
          )
        }
      </Box>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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