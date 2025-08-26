import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Button, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpScreen() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    var result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }
  return (
    <SafeAreaView>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollcontent}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Create Account</Text>
          <Text style={styles.subTitle}>Fill in the information below to create account</Text>
        </View>

        <View style={styles.form}>
          {/* Image */}
          <View style={styles.imageContainer} >
            {/* Touch Function */}
            <Pressable onPress={pickImage} style={styles.imageUploader}>
              {image ? (
                <Image source={{ uri: image }} style={styles.profileImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imageText}>+</Text>
                  <Text style={styles.imageLabel}>Add Image</Text>
                </View>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    //flex:1,
    backgroundColor: "#fff",
  },

  scrollcontent: {
    flexGrow: 1,
    padding: 20,
  },

  header: {
    alignItems: "center",
    marginBottom: 40,
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },

  subTitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center"
  },

  form: {
    flex: 1,

  },


  imageContainer: {
    alignItems: "center",
    marginBottom: 30,
  },

  imageUploader: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#3f3e3eff",
    borderStyle: "dashed",
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  imagePlaceholder: {
    alignItems: "center",  
  },

  imageText: {
    fontSize:36,
    color:"#999999",
    marginBottom:5,
  },

  imageLabel: {
    fontSize:14,
    color:"#666666",
    
  }

});
