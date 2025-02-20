import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import axios from 'axios';
import img from "../assets/back.png";
import AuthContext from '../utils/Authcontex.js';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';

export default function Create() {
  const navigation = useNavigation();
  const { Back_uri } = useContext(AuthContext);

  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');

  const addDetail = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('age', age);
    formData.append('address', address);

    images.forEach((image, index) => {
      formData.append(`images`, {
        uri: image.uri,
        type: image.mimeType,
        name: image.fileName,
        originalname : image.fileName
      });
    });

    try {
      await axios.post(`${Back_uri}/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigation.navigate('NameSearch');
    } catch (error) {
      console.error(error);
    }


//      await fetch("http://192.168.1.16:1901/api/create",{
//     method: "POST",
//     body: formData,
//   }
  
// )
  
// .catch((err)=>{
//     console.log(err)
//   })

  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0]]);
    }
    
  };

  const captureImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0]]);
    }
    const asset = await MediaLibrary.createAssetAsync(result.assets[0].uri);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.backImage} source={img}>
        <View style={styles.overlay}></View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Images</Text>
          <View style={styles.imageContainer}>
            {images.map((img, index) => (
              <Image key={index} source={{ uri: img.uri }} style={styles.image} />
            ))}
            <TouchableOpacity onPress={selectImage} style={styles.imageButton}>
              <Text style={styles.buttonText}>Select Image</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={captureImage} style={styles.imageButton}>
              <Text style={styles.buttonText}>Capture Image</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder='Name'
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder='Email'
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            placeholder='Age'
            keyboardType='numeric'
            value={age}
            onChangeText={setAge}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder='Address'
            value={address}
            onChangeText={setAddress}
          />
        </View>
        <TouchableOpacity onPress={
          addDetail
          // ()=> navigation.navigate('Search')
          }>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backImage: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(144, 238, 144, 0.4)', 
  },
  inputGroup: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  imageButton: {
    backgroundColor: '#008CBA',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    marginLeft: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 5,
  },
  button: {
    backgroundColor: '#008CBA',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
