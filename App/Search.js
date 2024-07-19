import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, FlatList } from 'react-native';
import axios from 'axios';
import img from "../assets/back.png";
import AuthContext from '../utils/Authcontex.js';
import * as ImagePicker from 'expo-image-picker';

export default function Search() {
  const { Back_uri } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');

  const addDetail = async () => {
    const formData = new FormData();
    formData.append('name', name);

    if (image) {
      formData.append('image', {
        uri: image.uri,
        type: image.type,
        name: image.filename,
      });
    }

    try {
      const response = await axios.post(`${Back_uri}/search`, formData);
      setData([...data, response.data]); // Append new data to the existing list
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const captureImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>Name: {item.name}</Text>
      <Text style={styles.listItemText}>Email: {item.email}</Text>
      <Text style={styles.listItemText}>Age: {item.age}</Text>
      <Text style={styles.listItemText}>Address: {item.address}</Text>
      {item.image && <Image source={{ uri: item.image.uri }} style={styles.listItemImage} />}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.backImage} source={img}>
        <View style={styles.overlay}></View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Image</Text>
          <View style={styles.imageContainer}>
            {image && <Image source={{ uri: image.uri }} style={styles.image} />}
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
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <TouchableOpacity onPress={addDetail}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </View>
        </TouchableOpacity>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        />
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
  list: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  listItemText: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  listItemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
});
