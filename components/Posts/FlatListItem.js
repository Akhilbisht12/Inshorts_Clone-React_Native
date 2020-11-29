import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Dimensions,Text, ActivityIndicator, AsyncStorage, View } from 'react-native';
// import DATA from '../../assets/DATA';
import axios from 'axios';
import Item from './Item';

const {height, width} = Dimensions.get('window');

const FlatListItem = () => {
  const [ loading, setLoading] = useState(true);
  const [ DATA, setDATA] = useState([]);

  useEffect(()=>{
    console.log(AsyncStorage.getItem('isLoggedIn'));
    fetch('https://doonlocalapi.herokuapp.com/fetchapi')
    .then((response)=>response.json())
    .then((responseJson)=>{
      setDATA(responseJson);
      setLoading(false);
      console.log(responseJson)
    })
    .catch((err)=>{
        console.log(err)
    })

    // axios.get('https://www.upgrate.in/doonlocal/fetchapi.php')
    // .then(res => {
    //   setDATA(res.data.data);
    //   setLoading(false)
    // })
    // .then(console.log(DATA))
  },[]);

  const renderItem = ({ item }) => (
    <Item item={item} />
  );

  if(loading){
    return (
    <View style={{flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',}}>
        <Text style={{textAlign : 'center', marginVertical : 20}}>Stories Are Being Loaded</Text>
      <ActivityIndicator />
    </View>
    )
  }else{
    console.log(DATA)
  return (
    <SafeAreaView style={{flex : 1}}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        pagingEnabled
        scrollEventThrottle={20}
        showsVerticalScrollIndicator = {false}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
  );
  }
}

export default FlatListItem;
