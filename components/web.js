import React from 'react';
import WebView from 'react-native-webview';

export default function web ({navigation,route}){
  const refLink = route.params.refLink
  return <WebView source={{ uri: refLink }}/>
}
