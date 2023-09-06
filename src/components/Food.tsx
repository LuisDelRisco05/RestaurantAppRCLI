import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Box, Image, Pressable, Text } from '@gluestack-ui/themed'
import { Fields } from '../context/orders/ordersContext'
import { useNavigation } from '@react-navigation/native'


interface Props {
    item: Fields,
}

const Food = ({ item }: Props) => {

    const { navigate } = useNavigation<any>()

    const { category, image } = item

  return (
    <Pressable style={ styles.container } onPress={ () => navigate('MenuScreen', category)}>
        <Box style={ styles.containerImg }>
            <Image 
                source={{ uri: image }}
                style={ styles.img}
                resizeMode='cover'
            />
        </Box>
        <Box style={ styles.containerCategories }>
            <Text style={styles.TextCategories}>{category}</Text>
        </Box>  
    </Pressable>
  )
}

export default Food

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fefefe',
        width: 270,
        height: 450,
        borderRadius: 20,
        marginHorizontal: '20%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.27,
        shadowRadius: 15.65,

        elevation: 6,
    },
    containerImg: {
        width: '100%',
        height: '85%',
        backgroundColor: 'red',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    img: {
        width: '100%',
        height: '100%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    containerCategories: {
        height: 50,
        justifyContent:'center',
        alignItems:'center'
    },
    TextCategories: {
        textTransform: 'uppercase',
        fontWeight: '800',
        fontSize: 20,
        color: '#1e293b',
        letterSpacing: 10
    }
})