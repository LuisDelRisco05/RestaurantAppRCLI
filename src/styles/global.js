import { StyleSheet } from 'react-native'


export const globalStyles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    box: {
        height: 200,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        borderRadius: 100,
        height: 170,
        width: 170,
        padding: 10,
        borderRadius: 200,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
        backgroundColor: '#3730a3',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontWeight: 600,
        textTransform: 'uppercase',
        fontSize: 14
    }
})
