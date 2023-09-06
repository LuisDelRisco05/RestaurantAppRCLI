import { Center, Text, Button, Box } from '@gluestack-ui/themed'
import {globalStyles} from "../styles/global"
import { Pressable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StackScreenProps } from '@react-navigation/stack'

interface Props extends StackScreenProps<any, any> {
  
}

export const NewOrderScreen = ({navigation}: Props) => {


  return (
    <Center style={globalStyles.container}>
      <Box style={globalStyles.box}>
        <TouchableOpacity activeOpacity={0.5} style={globalStyles.btn} onPress={() => navigation.navigate("MenuScreen")}>
          <Text style={globalStyles.text}>Create New Order</Text>
        </TouchableOpacity>
      </Box>
    </Center>
  )
}
