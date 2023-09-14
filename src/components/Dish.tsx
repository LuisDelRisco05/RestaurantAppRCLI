import { useContext } from 'react'
import { Box, Image, Text } from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"
import { StyleSheet, TouchableOpacity } from 'react-native'
import {OrdersContext, Fields } from "../context/orders/OrdersContext";

interface Props {
    dish: Fields,
}

export const Dish = ({ dish }: Props) => {

    const { onSelectOrder } = useContext(OrdersContext)

    const navigation = useNavigation<any>()

    const { category, description, image, name, price } = dish

  return (
    <>
        <TouchableOpacity style={styles.card} onPress={() => {
            onSelectOrder(dish)
            navigation.navigate('DishDetailsScreen')
            }}>
            <Box style={styles.containerImg}>
                <Image 
                    source={{ uri: image }}
                    style={styles.img}
                />   
            </Box> 
            <Box style={styles.containerWords}>
                <Box style={styles.containerTitle}>
                    <Text isTruncated style={styles.title}>{name}</Text>
                    <Text style={styles.title}>Price ${price}</Text>
                </Box>
                <Text style={styles.category}>{category}</Text>
                <Text isTruncated style={styles.text}>{description}</Text>
            </Box>

        </TouchableOpacity>
    </>

  )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        height: 80,
        backgroundColor: '#14b8a6',
        alignItems: 'center',
        justifyContent: 'center',
        width: '98%',
        borderRadius: 10,
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
        width: '30%',
    },
    img: { 
        borderRadius: 5, 
        width: '100%',
        height: '100%'
    },
    containerWords:{
        width: '70%',
    },
    containerTitle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        color: '#fafafa',
        fontWeight: '800',
        textTransform: 'capitalize',
        paddingHorizontal: 10,
        paddingTop: 10,
        width: '45%',
    }, 
    text: {
        paddingLeft: 10,
        color: '#f5f5f5',
    },
    category: {
        paddingLeft: 10,
        fontSize: 13,
        fontStyle: 'italic',
        textTransform: 'capitalize',
        fontWeight: '500',
        color: '#84cc16'
    },
    separatorCategory: {
        marginVertical: 4,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    separatorText: {
        backgroundColor: '#84cc16',
        padding: 10,
        borderRadius: 10,
        color: '#fafafa',
        fontWeight: '700',
        textTransform: 'capitalize',
    }
    
});
