import { useContext, useEffect, useState } from "react"
import { StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native"
import { Box, Text, Spinner } from "@gluestack-ui/themed"
import { OrdersContext } from "../context/orders/OrdersContext"
import { useNavigation } from "@react-navigation/native"
import { SummaryItem } from "../components/SummaryItem"
import Icon from 'react-native-vector-icons/FontAwesome6'
import { firebase } from "../firebase"


export const SummaryOrderScreen = () => {

  const [ totalOrder, setTotalOrder] = useState(0)

  const { goBack, navigate } = useNavigation<any>()

  const { orders, orderPlaced, onOrderPlaced } = useContext(OrdersContext)

  useEffect(() => {
    if(orders.length > 0){
      const TotalDishs = orders.reduce( (total, order) => order.subtotal! + total, 0)
  
      setTotalOrder(TotalDishs)
      
    } else {
      navigate('MenuScreen')
    }

  }, [orders])

  const OrderProgress = () => {
    Alert.alert(
      'Are you sure you want to continue?',
      'Confirmed order cannot be modified',
      [
        {
          text: 'Confirm',
          onPress: async() => {
            const orderObj = {
              deliveryTime: 0,
              completed: false,
              total: totalOrder,
              order: orders,
              create: Date.now()
            }

            try {
              const order = await firebase.db.collection('orders').add(orderObj)
              onOrderPlaced(order.id)

            } catch (error) {
              console.log("🚀 ~ file: SummaryOrderScreen.tsx:51 ~ onPress:async ~ error:", error)
              
            }
            
            navigate('OrderProgressScreen')
          }
        },
        {
          text: 'Review',
          style: 'cancel'
        }
      ]
    )
  }

  return (
    <Box style={styles.container}>
      <Box style={styles.containerCard}>
        {
          orders.length > 0 ?
          (
            <FlatList
              data={orders}
              keyExtractor={(item, i) => item.id.toString() + i}
              renderItem={({ item }) => (
                <SummaryItem dish={item} />
              )
              }
              ListHeaderComponent={() => (
                <Box style={styles.containerHeader}>
                  <TouchableOpacity style={styles.iconBack} onPress={() => goBack()}>
                    <Icon
                      name="angle-left"
                      size={25}
                      color="#1e293b"
                    />
                  </TouchableOpacity>
                  <Text style={styles.title}>Summary Order</Text>
                </Box>
              )
              }
              ListFooterComponent={() => (
                <Box style={styles.containerTotal}></Box>
              )}
              showsVerticalScrollIndicator={orders.length > 4 ? true : false}
              contentContainerStyle={{ paddingBottom: 20 }}
              ItemSeparatorComponent={() => <Box style={styles.separator} />}
            />

          )
          : <Spinner color="#84cc16" size="large" />      
        }
      </Box>

      <Box style={styles.containerTotal}>
        <Text style={styles.total}>Total: ${totalOrder}</Text>
      </Box>

      <TouchableOpacity style={styles.btnContinue} onPress={ () => navigate('MenuScreen')}>
        <Text style={styles.btnText}>Continue ordering</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnOrder} onPress={ () => OrderProgress()}>
        <Text style={styles.btnText}>Continue order</Text>
      </TouchableOpacity>

    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  containerHeader:{
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 10,
  },
  iconBack:{
    position: 'absolute',
    left: 0,
    width: 30,
    height: 30
  },
  title: {
    color: '#1e293b',
    fontWeight: '800',
    fontSize: 25,
    textAlign: 'center',
    paddingVertical: 10,
  },
  containerCard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '96%',
    paddingHorizontal: 6,
    height: '70%',
  },
  separator: {
    backgroundColor: '#E2E2E3',
    height: 1,
    opacity: 0.9,
    marginVertical: 15,
  },
  space: {
    height: 25
  },
  containerTotal: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  total: {
    color: '#1e293b',
    fontWeight: '800',
    fontSize: 25,
    paddingVertical: 10
  },
  btnContinue: {
    backgroundColor: '#84cc16',
    width: '96%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.27,
    shadowRadius: 15.65,

    elevation: 6,
  },
  btnOrder:{
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
  },
})
