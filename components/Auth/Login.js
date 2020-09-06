import React, { useState } from 'react';
import { Text, View, TextInput, Button, AsyncStorage, ActivityIndicator } from 'react-native';

export default function Details({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] =useState('');
  const [loading, setLoading] = useState(false);

  const UserLoginFunction = () => {
    setLoading(true);
    fetch('https://www.upgrate.in/doonlocal/userLogin.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    })
      .then(response => response.json())
      .then((responseJson) => {
        setLoading(false);
        // If server response message same as Data Matched
        if (responseJson === 'Data Matched') {
          // save user to async
          // AsyncStorage.setItem('isLoggedIn', true);

          //Then open Profile activity and send user email to profile activity.
          navigation.navigate('flatlist');
        } else {
          alert(responseJson);
          console.log(responseJson)
        }
      })
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
      <Text style={styles.loginHead}>Login</Text>
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
      <Button title="Submit" onPress={UserLoginFunction} />
      <Button title="SignUp" onPress={() => navigation.navigate('SignUp')} />
      <Button title="Skip this" onPress={() => navigation.navigate('flatlist')} />
    </View>
  );
  }
}
const styles = {
  loginHead: {
    fontSize: 20,
    fontWeight: '500',
  },

  loginContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textInput: {
    height: 5 + '%',
    width: 80 + '%',
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 5,
    marginVertical: 5,
  }
};
