import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
} from "react-native";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

const PUBLIC_URL = "https://94199826832f.ngrok-free.app";

export default function SignInScreen() {
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");

  const handleLogin = async () => {
    const loginDetails = {
      email: getEmail,
      password: getPassword,
    };

    try {
      const response = await fetch(PUBLIC_URL + "/NoteBook/SignIn", {
        method: "POST",
        body: JSON.stringify(loginDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const json = await response.json();
        if (json.status) {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: "Welcome!",
          });
          setEmail("");
          setPassword("");
        } else {
          Toast.show({
            type: ALERT_TYPE.WARNING,
            title: "Warning",
            textBody: json.message,
          });
        }
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: "Server Side Error!",
        });
      }
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Network Error!",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      keyboardVerticalOffset={40}
      style={styles.container}
    >
      <AlertNotificationRoot>
        <ScrollView style={styles.scrollcontent} contentContainerStyle={{ flexGrow: 1 }}>
          {/* Round Circle */}
          <View style={styles.round}>
            <Text style={styles.roundText}>Hello</Text>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.pageTitle}>NoteBook</Text>
            <Text style={styles.subTitle}>
              Welcome Back! Please Sign In to Your Account
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                placeholder="Enter Your Email"
                style={styles.input}
                keyboardType="email-address"
                onChangeText={setEmail}
                value={getEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="Enter Your Password"
                style={styles.input}
                secureTextEntry
                onChangeText={setPassword}
                value={getPassword}
              />
            </View>

            {/* Login Button */}
            <View style={styles.buttonContainer}>
              <Pressable style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
              </Pressable>
            </View>

            {/* Create Account Button */}
            <View style={styles.buttonContainer}>
              <Pressable style={styles.createAccountButton}>
                <Text style={styles.createAccountButtonText}>Create Account</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </AlertNotificationRoot>
    </KeyboardAvoidingView>
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
    textAlign: "center",
  },

  form: {
    flex: 1,
  },

  inputContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
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
    color: "#54a0ff",
    fontSize: 16,
    fontWeight: "bold",
  },

  loginButton: {
    flex: 1,
    backgroundColor: "#54a0ff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#54a0ff",
  },

  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
    marginBottom: 20,
    alignSelf: "center",
  },

  roundText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
});
