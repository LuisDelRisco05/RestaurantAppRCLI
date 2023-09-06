import { View, Text, Image, StyleSheet } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Skeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.card}>
        <View style={styles.containerImg} />
        <View style={styles.containerWords}>
          <View style={styles.containerTitle}>
            <View style={styles.title} />
            <View style={styles.title} />
          </View>
          <View style={styles.text} />
          <View style={styles.text} />
        </View>
      </View>
    </SkeletonPlaceholder>
  )
}

export default Skeleton


const styles = StyleSheet.create({
    card: {
      flexDirection: 'row',
      height: 80,
    },
    containerImg: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '30%',
      height: 80, // Ajusta la altura del placeholder de la imagen
      borderRadius: 5, 
    },
    containerWords: {
      width: '70%',
    },
    containerTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      backgroundColor: '#ccc', // Color del esqueleto
      width: 100,
      height: 20,
      margin: 10,
      borderRadius: 5,
    },
    text: {
      backgroundColor: '#ddd', // Color del esqueleto
      width: 200,
      height: 20,
      margin: 10,
      borderRadius: 5,
    },
  });
  