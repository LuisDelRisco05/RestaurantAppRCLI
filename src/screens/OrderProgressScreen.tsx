import { useContext, useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { Box, Spinner, Text } from "@gluestack-ui/themed"
import { OrdersContext } from "../context/orders/OrdersContext"
import { FirebaseContext } from "../context/firebase/FirebaseContext"
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import Icon from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native"


export const OrderProgressScreen = () => {

  const [ time, setTime ] = useState(0)
  const [ completed, setCompleted ] = useState(false)

  const { orderPlaced, onReset } = useContext(OrdersContext)
  const { firebase } = useContext(FirebaseContext)

  const navigation = useNavigation<any>()
  const { navigate } = navigation

  useEffect(() => {

    const getOrderStatus = () => {
      firebase.db.collection('orders')
                .doc(orderPlaced)
                .onSnapshot(handleSnapshot)
    }
    getOrderStatus()
  }, [])

  function handleSnapshot(snapshot: any) {
    setTime(snapshot.data().deliveryTime)
    setCompleted(snapshot.data().completed)
  }

  return (
    <>
      {
        !completed 
          ? (
              <Box style={styles.container}>
                {
                  time === 0
                    ? (
                        <Box style={styles.box}>
                            <Text style={{...styles.text, height: 80}}>We have received your order, we are calculating the time, please wait..</Text>
                            <Spinner style={styles.spinner} size="large" />
                        </Box>
                      )
                    : (
                        <Box style={styles.box}>
                          <Text style={{...styles.text, marginBottom: 10}}>Your order will be ready in:</Text>
                          <CountdownCircleTimer
                            isPlaying
                            duration={time * 60}
                            colors={['#84cc16', '#facc15', '#dc2626']}
                            colorsTime={[120, 60, 0]}
                            isSmoothColorTransition
                          >
                            {({ remainingTime }) => {
                              const minutes = Math.floor(remainingTime / 60);
                              const seconds = remainingTime % 60;
                              return (
                                <Text style={styles.text}>
                                  {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                                </Text>
                              )
                            }}
                          </CountdownCircleTimer>
                        </Box>
                      )
                }
              </Box>
            )
          : (
            <Box style={styles.container}>
              <Text style={styles.text}>All Done!</Text>
              <Text style={styles.text}>You can now pick up your order</Text>
              <Icon 
                name="rocket-sharp"
                size={45}
                color="#84cc16"
              />
              <TouchableOpacity 
                style={styles.btnInit}
                onPress={ () => {
                  onReset()
                  navigate('CategoryScreen')
                }}
              >
                <Text style={styles.btnText}>New Order</Text>
              </TouchableOpacity>
            </Box>
            )
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    width: '96%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    width: '90%',
    fontWeight: '800',
    color: '#1e293b',
  },
  spinner: {
    marginTop: 10
  },
  btnInit: {
    marginTop: 20,
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
  btnText: {
    color: '#fafafa',
    fontWeight: '800',
    fontSize: 20
  },
})
