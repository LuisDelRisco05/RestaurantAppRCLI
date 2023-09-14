import { NavigationContainer } from '@react-navigation/native'
import { StackNavigation } from './src/navigations'
import { FirebaseState } from './src/context/firebase/firebaseState'

import { themeConfig } from './theme'
import { OrdersState } from './src/context/orders/ordersState'
import { GluestackUIProvider } from '@gluestack-ui/themed'


function App(): JSX.Element {
 

  return (
    <GluestackUIProvider config={themeConfig}>
      <FirebaseState>
        <OrdersState>
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
        </OrdersState>
      </FirebaseState>
    </GluestackUIProvider>
  );
}

export default App;
