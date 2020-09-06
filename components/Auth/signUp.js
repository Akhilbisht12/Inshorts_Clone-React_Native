import React, { useState, useEffect } from 'react';
import {
  AppRegistry,
  Button,
  View,
  TextInput,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

export default function signUp() {
  const [UserName, setUserName] = useState('');
  const [UserEmail, setUserEmail] = useState('');
  const [UserPassword, setUserPassword] = useState('');
  const [UserMobile, setUserMobile] = useState('');
  const [loading, setLoading] = useState(false);

  const UserRegistrationFunction = () => {
    setLoading(true);
    fetch('https://upgrate.in/doonlocal/userRegistration.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: UserName,

        email: UserEmail,

        password: UserPassword,

        mobile: UserMobile,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        // Showing response message coming from server after inserting records.
        alert(responseJson);
      })
      .catch((error) => {
        alert(error);
      });
  };

  if(loading){
    return <ActivityIndicator style={styles.MainContainer}/>
  }else{
  return (
    <View style={styles.MainContainer}>
      <Text
        style={{
          fontSize: 20,
          color: '#000',
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

      <Button
        title="Register"
        onPress={UserRegistrationFunction}
        color="#2196F3"
      />
    </View>
  );
    }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
  },

  TextInputStyleClass: {
    textAlign: 'center',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    // Set border Hex Color Code Here.
    borderColor: '#2196F3',

    // Set border Radius.
    borderRadius: 5,

    // Set border Radius.
    //borderRadius: 10 ,
  },
});
AppRegistry.registerComponent('signUp', () => signUp);
