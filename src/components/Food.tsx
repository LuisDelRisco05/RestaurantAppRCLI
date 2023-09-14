import { StyleSheet, TouchableOpacity } from 'react-native'
import { useContext } from 'react'
import { Box, Image, Pressable, Text } from '@gluestack-ui/themed'
import { Fields, OrdersContext } from '../context/orders/OrdersContext'
import { useNavigation } from '@react-navigation/native'


interface Props {
    item: Fields,
}

const Food = ({ item }: Props) => {

    const { onCategoryCurrent } = useContext(OrdersContext)

    const { navigate } = useNavigation<any>()

    const { category, image } = item

  return (
    <Pressable style={ styles.container } onPress={ () =>{ 
        navigate('MenuScreen')
        onCategoryCurrent(category)
    }}>
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
        width: 300,
        height: 470,
        borderRadius: 20,
        marginHorizontal: '10%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.27,
        shadowRadius: 15.65,

        elevation: 6,
        marginTop: 50
    },
    containerImg: {
        width: '100%',
        height: '85%',
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