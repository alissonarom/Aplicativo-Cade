import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerHome:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  flatHome: {
    marginBottom: 155
  },

  about: {
    width: "100%",
  },
    // estilos renderItem / card
    //card total
    card: {
        backgroundColor: '#fff',
        marginTop: 5
      },
      //header start
      cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
      },
      avatar: {
        height: 45,
        width: 45,
        borderRadius: 75 / 2,
        marginEnd: 10
      },
      //header end
      cardLeft: {
        flexDirection: "row",
        alignItems: 'center'
      },
      cardImage: {
        width: '100%',
        height: 250
      },
      cardTime: {
        fontSize: 12,
        color: '#A9A9A9'
      },
     
// footer
      cardFooter:{
        paddingHorizontal: 10
      },
    // footer Icons
    cardIconsCount: {
      paddingVertical: 10,
      marginHorizontal:10,
      flexDirection: "row",
    },
    textCount: {
      fontSize: 10,
      marginHorizontal: 3,
      paddingEnd: 10
    },
    cardIcons: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderTopColor: "#d1d1d1",
      borderTopWidth: 1,
    },
    // footer Icons end
      cardContent: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        justifyContent: "flex-start"
      },
// footer end

});

export default styles;