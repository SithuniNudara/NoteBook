import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Button, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { ALERT_TYPE, AlertNotificationRoot, Dialog, Toast } from 'react-native-alert-notification';

const PUBLIC_URL = "https://94199826832f.ngrok-free.app";
export default function SignUpScreen() {

  const [image, setImage] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [getCities, setCites] = React.useState<{ id: number; name: string }[]>(
    []
  );
  const [getFullName, setFullName] = React.useState("");
  const [getUserName, setUserName] = React.useState("");
  const [getEmail, setEmail] = React.useState("");
  const [getPassword, setPassword] = React.useState("");
  const [getConfirmPassword, setConfirmPassword] = React.useState("");

  useEffect(() => {
    const loadCities = async () => {
      const response = await fetch(PUBLIC_URL + "/NoteBook/Cities");

      if (response.ok) {
        const json = await response.json();
        setCites(json);
      } else {
        console.error("City data loading failed!")
      }
    }

    loadCities();


  }, []);


  const pickImage = async () => {

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
    <AlertNotificationRoot>
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
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                placeholder='Enter Your Full Name'
                style={styles.input}
                onChangeText={setFullName}
                value={getFullName} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>User Name</Text>
              <TextInput
                placeholder='Enter Your User Name'
                style={styles.input}
                onChangeText={setUserName}
                value={getUserName}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder='Enter Your Email'
                style={styles.input}
                keyboardType='email-address'
                onChangeText={setEmail}
                value={getEmail} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder='Enter Your Password'
                style={styles.input}
                onChangeText={setPassword}
                value={getPassword}
                secureTextEntry />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                placeholder='Enter Your Confirm Password'
                style={styles.input}
                onChangeText={setConfirmPassword}
                value={getConfirmPassword}
                secureTextEntry />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>City</Text>
              {/* Drop Down */}
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedCity}
                  style={styles.picker}
                  onValueChange={(itemValue) => setSelectedCity(itemValue)}>
                  <Picker.Item label='Select Your City' value="" />
                  {getCities.map((city) => (
                    <Picker.Item key={city.id} label={city.name} value={city.id} />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.backButton}>
                <Text style={styles.backButtonText}>Go Back</Text>
              </Pressable>
              <Pressable style={styles.saveButton}
                onPress={async () => {
                  if (
                    !getFullName ||
                    !getUserName ||
                    !getEmail ||
                    !getPassword ||
                    !getConfirmPassword ||
                    image == null ||
                    !selectedCity
                  ) {
                    Toast.show({
                      type: ALERT_TYPE.DANGER,
                      title: 'Warning',
                      textBody: 'Please Fill requied data',
                    });
                    return;
                  }

                  let formData = new FormData();
                  formData.append("fullName", getFullName);
                  formData.append("userName", getUserName);
                  formData.append("email", getEmail);
                  formData.append("password", getPassword);
                  formData.append("confirmPassword", getConfirmPassword);
                  formData.append("city", selectedCity);

                  if (image) {
                    formData.append("profileImage", {
                      uri: image,
                      name: "profile.jpg",
                      type: "image/jpg"
                    } as any);
                  }

                  const response = await fetch(PUBLIC_URL + "/NoteBook/NewAccount", {
                    method: "POST",
                    body: formData,
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  });

                  if (response.ok) {
                    const json = await response.json();

                    if (json.status) {
                      Toast.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: 'Success',
                        textBody: 'Congrats! Account created successfully!',
                      });

                      setFullName("");
                      setUserName("");
                      setEmail("");
                      setPassword("");
                      setConfirmPassword("");
                      setSelectedCity("0");
                      setImage("");
                    }else{
                      console.log("error");
                      Toast.show({
                      type: ALERT_TYPE.DANGER,
                      title: 'Warning',
                      textBody: json.message,
                    });
                    }


                  } else {
                    Toast.show({
                      type: ALERT_TYPE.DANGER,
                      title: 'Warning',
                      textBody: 'Something went wring!Account creation Fail!',
                    });
                  }
                }}>
                <Text style={styles.saveButtonText}>Save</Text>
              </Pressable>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </AlertNotificationRoot>

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
    fontSize: 36,
    color: "#999999",
    marginBottom: 5,
  },

  imageLabel: {
    fontSize: 14,
    color: "#666666",

  },

  inputContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: 600,
    color: "#000",
    marginBottom: 8
  },

  input: {
    borderWidth: 1,
    borderColor: "#3f3e3eff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#3f3e3eff',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },

  picker: {
    height: 50,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },

  backButton: {
    flex: 0.45,
    backgroundColor: "transparent",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#3f3e3eff"
  },

  backButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold"
  },

  saveButton: {
    flex: 0.45,
    backgroundColor: "#54a0ff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#54a0ff"
  },

  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }

});
