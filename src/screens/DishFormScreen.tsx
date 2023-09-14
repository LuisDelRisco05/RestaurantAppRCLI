import { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from "react-native"
import { Box, Text, } from "@gluestack-ui/themed";
import Icon from 'react-native-vector-icons/FontAwesome'
import { OrdersContext } from '../context/orders/OrdersContext';
import { useNavigation } from '@react-navigation/native';



export const DishFormScreen = () => {

  const [ amount, setAmount ] = useState(1)
  const [ subtotal, setSubtotal ] = useState(0)

  const { order, onConfirmOrder } = useContext(OrdersContext)
  const { price } = order


  useEffect(() => {
    updateSubtotal()
  }, [amount])
  
  const updateSubtotal = () => {
    setSubtotal(amount * price)
  }

  const { goBack, navigate } = useNavigation<any>()

  const confirmOrder = () => {
    Alert.alert(
      'Do you wish to confirm the dish?',
      'Confirmed order cannot be modified',
      [
        {
          text: 'Confirm',
          onPress: () => {
            onConfirmOrder({
              ...order,
              subtotal,
              quantity: amount
            })
            navigate('SummaryOrderScreen')
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
    <Box style={styles.container}>
      <TouchableOpacity style={styles.iconBack} onPress={() => goBack()}>
        <Icon
          name="angle-left"
          size={35}
          color="#1e293b"
        />
      </TouchableOpacity>
      <Text style={styles.title}>Amount</Text>
      <Box style={styles.containerBtns}>

        <TouchableOpacity
          style={{ ...styles.btn, ...styles.btnLeft, backgroundColor: amount === 1 ? '#d9f99d' : '#84cc16' }}
          onPress={() => setAmount(amount - 1)}
          disabled={amount === 1 ? true : false}
        >
          <Icon
            name="minus"
            size={20}
            color="#fafafa"
          />
        </TouchableOpacity>
        <Box style={styles.containerAmount}>
          <Text style={styles.amount}>{amount}</Text>
        </Box>
        <TouchableOpacity
          style={{ ...styles.btn, ...styles.btnRight, backgroundColor: '#84cc16' }}
          onPress={() => setAmount(amount + 1)}
        >
          <Icon
            name="plus"
            size={20}
            color="#fafafa"
          />
        </TouchableOpacity>

      </Box>

      <Text style={styles.subtotal}>Subtotal: ${subtotal}</Text>

      <TouchableOpacity style={styles.btnAdd} onPress={() => confirmOrder()}>
        <Text style={styles.btnText}>Confirm dish</Text>
      </TouchableOpacity>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position:'relative',
    justifyContent: 'center'
  },
  iconBack:{
    position: 'absolute',
    top: 15,
    left: 10,
    width: 30,
    height: 30,
    zIndex: 5
  },
  title:{
    fontSize: 30,
    fontWeight: '600',
    color: '#1e293b',
    paddingVertical: 30,
  },
  containerBtns: {
    flexDirection: 'row',
    width: '96%',
    justifyContent: 'space-evenly'
  },
  btn: {
    width: '30%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.27,
    shadowRadius: 15.65,

    elevation: 6,
  },
  btnLeft: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15
  },
  btnRight: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15
  },
  containerAmount: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  amount: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1e293b'
  },
  subtotal: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1e293b',
    marginTop: 20
  },
  btnAdd:{
    backgroundColor: '#14b8a6',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems:'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  btnText: {
    color: '#fafafa',
    fontWeight: '800',
    fontSize: 20
  }
});
