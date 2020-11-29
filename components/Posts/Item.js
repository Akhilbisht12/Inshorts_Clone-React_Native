import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, StatusBar, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import ViewShot from "react-native-view-shot";
import * as Sharing from 'expo-sharing';
import { TouchableOpacity } from 'react-native-gesture-handler';



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
    <View style={styles.mainContainer}>
      <Image style={{height:height/2-20, width:width}} source={{uri:item.imglink}}/>
      <View style={styles.textContainer}>
        <View style={styles.iconshare}>
          <Icon name="share" size={30} color="black" onPress={captureAndShareScreenshot}/>
        </View>
        <View style={styles.text}>
          <Text style={styles.title}>{item.heading}</Text>
          <Text style={styles.summary}>{item.summary}</Text>
        </View>
        <View style={styles.reactions}>
          <View style={{flexDirection:'row', alignItems:'center' , marginTop : 5}}>
            <Icon style={styles.icon} name="arrow-up" size={30} color={thumbsup} onPress={forVote}/>
            <Icon style={styles.icon} name="arrow-down" size={30} color={thumbsdown} onPress={againstVote} />
          </View>
          <View>
            <TouchableOpacity style={styles.readbtn} onPress={()=>navigation.navigate('Web', { refLink: item.reflink })}>
              <Text style={{color: 'white', fontSize:15}}>Read More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    </ViewShot>
)
};

  const styles = StyleSheet.create({
    mainContainer : {
      height : height-StatusBar.currentHeight,
      width : width
    },
    textContainer : {
      height : height/2 + 20,
      marginTop : -20,
      borderTopLeftRadius : 25,
      borderTopRightRadius : 25,
      padding : 20,
      backgroundColor: 'white',
      justifyContent : 'space-between',
      paddingBottom : 20
    },
    title : {
      fontWeight : 'bold',
      fontSize : 20
    },
    summary : {
      fontSize : 18,
      lineHeight : 30,
      marginTop : 10
    },
    iconshare : {
      justifyContent : 'center',
      alignItems :'center',
      position :'absolute',
      top : -25,
      right : 50,
      height : 50,
      width : 50,
      borderRadius : 50,
      padding : 5,
      backgroundColor : 'white',
      borderColor : 'black',
      borderWidth : 1 
    },
    icon : {
      marginHorizontal : 2
    },
    reactions : {
      flexDirection : 'row',
      alignItems : 'center',
      justifyContent: 'space-between'
    },
    readbtn : {
      backgroundColor : 'black',
      paddingHorizontal : 10,
      paddingVertical : 5,
      borderRadius : 20
    }
  });

  export default Item;