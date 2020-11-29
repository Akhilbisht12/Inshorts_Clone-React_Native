import React from 'react';
import WebView from 'react-native-webview';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function web ({navigation,route}){
  const refLink = route.params.refLink
  return (
    <View>
      <View>
        <Icon style={styles.icon} name="arrow-left" size={30} color='black' onPress={navigation.navigate(back)}/>
      </View>
      <WebView source={{ uri: refLink }}/>
    </View>
  )
}
