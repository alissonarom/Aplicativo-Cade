import React, {useState, useEffect} from 'react';
import { Avatar, IconButton, useTheme } from 'react-native-paper';
import Fire from '../config/Fire';
import { View } from "react-native";

const AvatarComponent = () => {
    const [infos, setInfos] = useState({});
    const { colors } = useTheme();

    useEffect(() => {
        Fire.shared.userInfos
              .get()
              .then(function (doc) {
                setInfos(doc.data());
              })
              .catch(function (error) {
                console.log("Error getting document:", error);
              });
        }, []);
    return(
    <View>
        { infos.avatar ? (<Avatar.Image size={40} source={{uri:infos.avatar}} />) :
            (<IconButton  icon="account" color={colors.h2} size={30} animated={true} style={{margin: 0, backgroundColor: "#cfcfcf"}} />)
        }
    </View>
    
);}
export default AvatarComponent;