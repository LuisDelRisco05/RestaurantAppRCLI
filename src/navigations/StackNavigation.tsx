import { createStackNavigator } from '@react-navigation/stack'
import { DishDetailsScreen, DishFormScreen, MenuScreen, NewOrderScreen, OrderProgressScreen, CategoryScreen } from '../screens'
import { ImageSourcePropType } from 'react-native'

type Dishs = {
  category: string,
  description: string,
  exist: boolean,
  image: ImageSourcePropType,
  name: string,
  price: number,
  id: string
}

export type RootStackParams = {
  CategoryScreen: undefined,
  MenuScreen: undefined,
  DishFormScreen: undefined,
  DishDetailsScreen: undefined,
  NewOrderScreen: undefined,
  OrderProgressScreen: undefined
}

const Stack = createStackNavigator<RootStackParams>()

export const StackNavigation = () => {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
        cardStyle: { 
          backgroundColor: '#fefefe'
        },
      }}
      // initialRouteName='NewOrderScreen'
    >
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
      <Stack.Screen name="MenuScreen" component={MenuScreen} />
      <Stack.Screen name="DishFormScreen" component={DishFormScreen} />
      <Stack.Screen name="DishDetailsScreen" component={DishDetailsScreen} />
      <Stack.Screen name="NewOrderScreen" component={NewOrderScreen} />
      <Stack.Screen name="OrderProgressScreen" component={OrderProgressScreen} />

    </Stack.Navigator>
  )
}
