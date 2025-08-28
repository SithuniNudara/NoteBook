import React from "react";
import { KeyboardAvoidingView, ScrollView, View, StyleSheet, TextInput, Image, Pressable, Text } from "react-native";
import { ALERT_TYPE, AlertNotificationRoot, Dialog, Toast } from 'react-native-alert-notification';
const PUBLIC_URL = "https://ba8e58ac3ef8.ngrok-free.app";
export default function SignInScreen() {

    const [getEmail, setEmail] = React.useState("");
    const [getPassword, setPassword] = React.useState("");
    return (
        <KeyboardAvoidingView
            behavior={"padding"}
            keyboardVerticalOffset={40}
            style={styles.container}>

            <AlertNotificationRoot>

                <ScrollView style={styles.Subcontainer}>
                    <View>
                        <View style={styles.profileContainer}>
                            <Image
                                style={{ height: 100, width: 100 }}
                                source={require("./assets/NoteBook.png")} />
                        </View>

                        <View>
                            <Text style={styles.headerText}>WELCOME...</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email Address</Text>
                            <TextInput
                                inputMode="email"
                                style={styles.input}
                                placeholder="Enter Email"
                                onChangeText={setEmail}
                                value={getEmail} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                inputMode="text"
                                style={styles.input}
                                placeholder="Enter Password"
                                onChangeText={setPassword}
                                value={getPassword} />
                        </View>
                        <View style={styles.btnContainer}>
                            <Pressable style={styles.button}
                                onPress={async () => {
                                    const loginDetails = {
                                        email: getEmail,
                                        password: getPassword,
                                    };

                                    const loginJSON = JSON.stringify(loginDetails);
                                   
                                    const response = await fetch(PUBLIC_URL+"/NoteBook/SignIn", {
                                        method: "POST",
                                        body: loginJSON,
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    });

                                    if (response.ok) {
                                        const json = await response.json();
                                        if (json.status) {
                                            Toast.show({
                                                type: ALERT_TYPE.SUCCESS,
                                                title: 'Success',
                                                textBody: 'Welcome!',
                                            });
                                            setEmail("");
                                            setPassword("");
                                        } else {
                                            Toast.show({
                                                type: ALERT_TYPE.WARNING,
                                                title: 'Warning',
                                                textBody: json.message,
                                            });
                                        }
                                    } else {
                                        Toast.show({
                                            type: ALERT_TYPE.WARNING,
                                            title: 'Warning',
                                            textBody: 'Server Side Error!',
                                        });
                                    }
                                }}>
                                <Text style={styles.btnText}>Sign In</Text>
                            </Pressable>
                        </View>
                        <View style={styles.btnContainer}>
                            <Pressable style={styles.createbutton}>
                                <Text style={styles.createButtonText}>Create Account</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>

            </AlertNotificationRoot>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    createbutton: {
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        borderRadius: 10,
        borderColor: "#0077b6",
        borderWidth: 2
    },

    createButtonText: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#000"
    },

    btnContainer: {
        marginVertical: 5
    },

    btnText: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#fff"
    },

    button: {
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        borderRadius: 10,
        backgroundColor: "#0077b6"
    },

    inputContainer: {
        marginVertical: 5
    },
    input: {
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 10,
        height: 45,
        paddingLeft: 10,
        fontWeight: "bold",
        fontSize: 16
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 26,
        color: "#33415c",
        textDecorationColor: "#33415c",
        textDecorationStyle: "solid",
        textDecorationLine: "underline"
    },


    profileContainer: {
        justifyContent: "center",
        alignItems: "center"
    },

    container: {
        flex: 1,
        padding: 10,
    },

    Subcontainer: {
        marginTop: 40,
    }
});
