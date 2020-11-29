import React, { useState, useEffect } from 'react';
import {
  AppRegistry,
  Button,
  View,
  TextInput,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('window');

export default function signUp({ navigation }) {
  const [UserName, setUserName] = useState('');
  const [UserEmail, setUserEmail] = useState('');
  const [UserPassword, setUserPassword] = useState('');
  const [UserMobile, setUserMobile] = useState('');
  const [loading, setLoading] = useState(false);

  const UserRegistrationFunction = async() => {
    setLoading(true);
    fetch('https://doonlocalapi.herokuapp.com/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": UserName,

        "email": UserEmail,

        "password": UserPassword,

        "mobile": UserMobile,
      }),
    })
      .then((response) =>{
        setLoading(false)
        if(response.status === 202){
          alert('User Created Successfully');
          AsyncStorage.setItem('isLoggedIn', 'true');
          navigation.navigate('flatlist');
        }else{
          alert('Something Went Wrong. Try Again')
        }
      } )
      .catch((error) => {
        alert(error);
      });
  };

  if(loading){
    return (
    <View style={styles.activity}>
      <ActivityIndicator/>
    </View>)
  }else{
  return (
    <View style={styles.MainContainer}>
      <View style={styles.textContainer}>
        <Text style={{fontSize:50}}>Create Account</Text>
        <View style={{flexDirection:'row'}}>
          <Text>Already Have A Account ? </Text>
          <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
            <Text style={{fontWeight : 'bold'}}>Sign In.</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.signupContainer}>
        <View>
        <Text
          style={{
            fontSize: 20,
            color: 'white',
            textAlign: 'center',
            marginBottom: 15,
          }}>
          User Registration Form
        </Text>

        <TextInput
          // Adding hint in Text Input using Place holder.
          placeholder="Enter User Name"
          onChangeText={(UserName) => setUserName(UserName)}
          // Making the Under line Transparent.
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          value={UserName}
        />

        <TextInput
          // Adding hint in Text Input using Place holder.
          placeholder="Enter User Email"
          onChangeText={(UserEmail) => setUserEmail(UserEmail)}
          // Making the Under line Transparent.
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          value={UserEmail}
        />

        <TextInput
          // Adding hint in Text Input using Place holder.
          placeholder="Enter User Password"
          onChangeText={(UserPassword) => setUserPassword(UserPassword)}
          // Making the Under line Transparent.
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          secureTextEntry={true}
          value={UserPassword}
        />

        <TextInput
          // Adding hint in Text Input using Place holder.
          placeholder="Enter Your Mobile Number"
          onChangeText={(UserMobile) => setUserMobile(UserMobile)}
          // Making the Under line Transparent.
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          value={UserMobile}
        />
        </View>

          <View style={styles.signupButtons}>
            <Text style={{color : 'white', fontSize:30}}>Sign Up</Text>
            <Icon name="chevron-circle-right" size={50} color="white" onPress={UserRegistrationFunction}/>
          </View>
      </View>
    </View>
  );
    }
}

const styles = StyleSheet.create({
  activity : {
    height : height,
    width : width,
    justifyContent : 'center'
  },
  MainContainer: {
    justifyContent: 'space-between',
    height : height,
    width : width
  },

  TextInputStyleClass: {
    paddingLeft : 10,
    marginBottom: 20,
    height: 40,
    borderBottomWidth: 1,
    borderColor: 'white',
  },

  signupContainer : {
    backgroundColor : '#1b1b1b',
    padding : 20,
    borderTopLeftRadius : 50,
    height : height*2/3,
    justifyContent : 'space-around'
  },

  signupButtons : {
    flexDirection : 'row',
    justifyContent : 'space-around',
    alignItems : 'center',
    marginVertical : 20
  },

  textContainer : {
    height : height/3,
    justifyContent : 'center',
    padding : 20
  }
});
AppRegistry.registerComponent('signUp', () => signUp);
