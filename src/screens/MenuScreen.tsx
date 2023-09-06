import { useEffect, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { useNavigation } from "@react-navigation/native"

import { FirebaseContext } from "../context/firebase/FirebaseContext"
import { Dish } from "../components/Dish"
import Skeleton from "../components/Skeleton"
import { RootStackParams } from '../navigations';

import { Box, Text } from "@gluestack-ui/themed"
import Icon from 'react-native-vector-icons/FontAwesome6'


interface Props extends StackScreenProps<RootStackParams, 'MenuScreen'>{}

export const MenuScreen = ({route}: Props) => {

  const categoryCurrent = route.params

  const { goBack } = useNavigation<any>()

  const { getProducts, menu } = useContext(FirebaseContext)

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <Box style={styles.container}>  
        {
          menu.length > 0 ? 
          (
            <Box style={styles.containerCard}>
              <FlatList 
                data={menu.filter( item => categoryCurrent === item.category && item )}
                keyExtractor={ ( item ) => item.id.toString() }
                renderItem={({ item }) => (
                    <Dish dish={item} />
                  )
                }
                ListHeaderComponent={ () => (
                  <Box style={styles.containerHeader}>
                    <TouchableOpacity style={styles.iconBack} onPress={() => goBack() }>
                      <Icon 
                        name="angle-left"
                        size={ 25 }
                        color="#1e293b"
                      />
                    </TouchableOpacity>
                    <Text style={styles.title}>Menu</Text> 
                  </Box>
                )
              }
                showsVerticalScrollIndicator={ false }
                contentContainerStyle={{ paddingBottom: 20 }}
                ItemSeparatorComponent={() => <Box style={styles.separator} />}
              />
            </Box>
          )
          : (
              <Box style={styles.containerCard}>
                <Skeleton />
                <View style={styles.space} />
                <Skeleton />
                <View style={styles.space} />
                <Skeleton />
                <View style={styles.space} />
                <Skeleton />
                <View style={styles.space} />
                <Skeleton />
                <View style={styles.space} />
                <Skeleton />
                <View style={styles.space} />
                <Skeleton />
                <View style={styles.space} />
              </Box>
            )
        }
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
    marginVertical: 10
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
  },
  separator: {
    backgroundColor: '#E2E2E3',
    height: 1,
    opacity: 0.9,
    marginVertical: 15,
  },
  space: {
    height: 25
  }
});
