import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function SignUpScreen() {

  return (

    <ScrollView style={styles.container} contentContainerStyle={styles.scrollcontent}>
      <View style={styles.round}>
        <Text style={styles.roundText}>Hello</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>NoteBook </Text>
        <Text style={styles.subTitle}>Welcome Back! Please Sign In to Your Account</Text>
      </View>

      <View style={styles.form}>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput placeholder='Enter Your Email' style={styles.input} keyboardType='email-address' />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput placeholder='Enter Your Password' style={styles.input} secureTextEntry />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.createAccountButton}>
            <Text style={styles.createAccountButtonText}>Create Account</Text>
          </Pressable>
        </View>
      </View>

    </ScrollView>


  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#eee",
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

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  createAccountButton: {
    flex: 1,
    backgroundColor: "transparent",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#54a0ff",
  
  },

  createAccountButtonText: {
    color:"#54a0ff",
    fontSize: 16,
    fontWeight: "bold"
  },

  loginButton: {
    flex: 1,
    backgroundColor: "#54a0ff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#54a0ff"
  },

  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },

  round: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#069ef1ff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#069ef1ff",
    marginBottom: 20,    // space between circle and title
    alignSelf: "center", // center circle
  },

  roundText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",   // must be a string
    textAlign: "center",
  },


});
