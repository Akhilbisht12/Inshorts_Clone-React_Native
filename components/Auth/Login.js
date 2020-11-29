import React, { useState } from 'react';
import { Text, View, TextInput, Button, AsyncStorage, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';

const {height, width} = Dimensions.get('window');

export default function Details({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] =useState('');
  const [loading, setLoading] = useState(false);

  const UserLoginFunction = async() => {
    setLoading(true);
    fetch('https://doonlocalapi.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      }),
    })
      .then(response => {
        setLoading(false);
        if(response.status === 201){
          AsyncStorage.setItem('isLoggedIn', 'true');
          navigation.navigate('flatlist');
        }else{
          alert('Invalid Credentials')
        }
      })
      // .then((responseJson) => {
      //   console.log(responseJson);
      //   setLoading(false);
      //   // If server response message same as Data Matched
      //   if (responseJson === 'success') {
      //     // save user to async
      //     // AsyncStorage.setItem('isLoggedIn', true);

      //     //Then open Profile activity and send user email to profile activity.
      //     navigation.navigate('flatlist');
      //   } else {
      //     alert(responseJson);
      //     console.log(responseJson)
      //   }
      // })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  if(loading){
    return(
    <ActivityIndicator style={styles.loginContainer}/>
    )
  }else{
  return (
    <View style={styles.loginContainer}>
      <View style={styles.inputContainer}>
      <Text style={styles.loginTitle}>Login</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.signbuttons}>
          <TouchableOpacity  style={styles.buttons} onPress={UserLoginFunction}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.buttons} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('flatlist')}>
            <Text style={{textAlign:'center', marginBottom: 50}}>Don't Want to login. Skip</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
  }
}
const styles = {
  loginContainer : {
    height : height,
    width : width,
  },

  inputContainer : {
    height : height*2/3,
    width : width,
    justifyContent : 'center',
    paddingHorizontal : 50,
    backgroundColor : '#1b1b1b',
    borderBottomRightRadius : 15,
    borderBottomLeftRadius : 15
  },

  loginTitle : {
    fontSize : 30,
    color : 'white',
    marginVertical : 30,
  },

  textInput : {
    height : 40,
    borderBottomWidth : 1,
    borderColor : 'white',
    color : 'white',
    marginVertical : 10
  },

  bottomContainer :{
    height : height/3,
    justifyContent : 'space-between'
  },

  signbuttons : {
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'space-between',
    paddingHorizontal : 60,
    marginTop : -20
  },

  buttons : {
    paddingHorizontal : 30,
    paddingVertical : 10,
    borderRadius : 20,
    backgroundColor : 'black',
  },

  buttonText : {
    fontSize : 20,
    color : 'white'
  }
};
