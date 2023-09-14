import { StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Box, Image, Text } from "@gluestack-ui/themed"
import { Fields, OrdersContext } from "../context/orders/OrdersContext"
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useContext } from 'react'


interface Props {
    dish: Fields,
}

export const SummaryItem = ({ dish }: Props) => {

    const { onDeleteItem } = useContext(OrdersContext)


    const { quantity, image, name, price, id } = dish


    const deleteAlert = () => {
        Alert.alert(
            'Do you wish to delete the dish?',
            'After deleting it, you will have to add it again',
            [
              {
                text: 'Confirm',
                onPress: () => {
                    onDeleteItem(id)
                }
              },
              {
                text: 'Cancel',
                style: 'cancel'
              }
            ]
        )
    }

  return (
    <>
        <Box style={styles.card}>
            <Box style={styles.containerImg}>
                <Image 
                    source={{ uri: image }}
                    style={styles.img}
                />   
            </Box> 
            <Box style={styles.containerWords}>
                <Text isTruncated style={styles.title}>{name}</Text>
                <Text style={styles.title}>quantity: {quantity}</Text>
                <Text style={styles.title}>Price: ${price}</Text>
            </Box>
            <TouchableOpacity style={styles.containerTrash} onPress={ () => deleteAlert()}>
                <Icon 
                    name="trash-alt"
                    size={25}
                    style={styles.iconTrash}   
                />
            </TouchableOpacity>
        </Box>
    </>

  )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: '98%',
    },
    containerImg: {
        width: '30%',
        height: 100
    },
    img: { 
        borderRadius: 5, 
        width: '100%',
        height: '100%'
    },
    containerWords:{
        width: '60%',
    },
    containerTitle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        color: '#1e293b',
        fontWeight: '800',
        textTransform: 'capitalize',
        paddingHorizontal: 10,
        width: '100%',
        fontStyle: 'italic'
    }, 
    text: {
        paddingLeft: 10,
        color: '#1e293b',
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
        color: '#1e293b',
        fontWeight: '700',
        textTransform: 'capitalize',
    },
    containerTrash: {
        height: 30,
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconTrash: {
        color: '#9ca3af'
    }
    
});
