import React, {useState, useEffect} from 'react';
import {AsyncStorage, ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './components/Auth/Login';
import FlatListItem from './components/Posts/FlatListItem';
import Web from './components/web';
import signUP from './components/Auth/signUp';

export default function App({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)
  const [ initialRouteName, setInitialRouteName] = useState('Login');
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  useEffect(()=>{
    AsyncStorage.getItem('isLoggedIn').then((value) => {
      console.log(value)
      if(value){
        setInitialRouteName('flatlist')
      }else{
        setInitialRouteName('Login')
      }
      setLoading(false);
    })
  },[]);
    
    if(loading){
      return(
        <ActivityIndicator/>
      )
    }else{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName} headerMode="none">
        <Stack.Screen name="flatlist" component={FlatListItem} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={signUP} />
        <Stack.Screen name="Web" component={Web} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
}
