import React, {useState, useEffect} from 'react';
import {AsyncStorage} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './components/Auth/Login';
import FlatListItem from './components/Posts/FlatListItem';
import Web from './components/web';
import signUP from './components/Auth/signUp';

export default function App({ navigation }) {
  const [data, setData] = useState([]);
  const [ initialRouteName, setInitialRouteName] = useState('Login');
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
    AsyncStorage.getItem('isLoggedIn').then((value) => {
      if(value){
        setInitialRouteName('Posts')
      }else{
        setInitialRouteName('Login')
      }
    })

   

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' headerMode="none">
        <Stack.Screen name="flatlist" component={FlatListItem} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={signUP} />
        <Stack.Screen name="Web" component={Web} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
