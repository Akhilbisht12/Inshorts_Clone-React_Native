import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, StatusBar, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import ViewShot from "react-native-view-shot";
import * as Sharing from 'expo-sharing';



const {height, width} = Dimensions.get('window');

const Item = ({ item }) => {

    const [Uri, setUri] = useState('');
    const shotref = useRef(null);
    const [thumbsup, setThumbsUp] = useState('grey')
    const [thumbsdown, setThumbsDown] = useState('grey')
    const navigation = useNavigation();

    const forVote= () => {
        if(thumbsup==='grey'){
            setThumbsUp('black');
            setThumbsDown('grey');
        }else{
            setThumbsUp('grey')
        }
    }

     const captureAndShareScreenshot = () => {
       setUri('');
          shotref.current.capture().then((uri)=>{
               setUri(uri);
               shareScreenshot();
           });
      };

      const shareScreenshot = async()=> {
        url = Uri;
        messageText = 'Text that you want to share goes here';
        const options = {
           mimeType: 'image/jpeg',
           dialogTitle: messageText,
        };
          try{
              const shareResponse = await Sharing.shareAsync(url, options);
          }catch(err){
              console.log('Error =>', err);
          }
      }

    const againstVote= () => {
        if(thumbsdown==='grey'){
            setThumbsDown('black');
            setThumbsUp('grey')
        }else{
            setThumbsDown('grey')
        }
    }

return(
    <ViewShot ref={shotref}
    options={{format:'jpg', quality : 0.9}}>
    <View style={styles.item}>
      <Image style={{height:height/3, width:width}} source={{uri:item.imageLink}}/>
      <View style={styles.text}>
        <Text style={styles.title}>{item.heading}</Text>
        <Text style={styles.summary}>{item.summary}</Text>
      </View>
      <View style={styles.reactions}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Icon style={styles.icon} name="thumbs-up" size={30} color={thumbsup} onPress={forVote}/>
          <Icon style={styles.icon} name="thumbs-down" size={30} color={thumbsdown} onPress={againstVote} />
          <Icon style={styles.icon} name="bullhorn" size={30} color="grey" onPress={captureAndShareScreenshot}/>
        </View>
        <View>
          <Icon name="book" size={30} color="grey" onPress={()=>navigation.navigate('Web', { refLink: item.refLink })}/>
        </View>
      </View>
    </View>
    </ViewShot>
)
};

  const styles = StyleSheet.create({
    
    item: {
      backgroundColor: 'white',
      height : height- StatusBar.currentHeight,
      width:width
    },
    title: {
      fontSize: 30,
    },
    text: {
      padding : 10,
      height : 2/3*height - 80
    },
    summary : {
      fontSize : 20
    },
    reactions:{
      padding : 10,
      flexDirection:'row',
      justifyContent:'space-between',
      height : 50
    },
    icon:{
      marginHorizontal: 5,
    }
  });

  export default Item;