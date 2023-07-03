import { Component } from "react";
import { View, TextInput, Text, Pressable, ToastAndroid } from "react-native";
import { Api } from './api';
import { styles } from "./style";
import { locale } from "./lang/hr";


export class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
        this.api = new Api()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>{locale.appTitle}</Text>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder={locale.inputTextEmail}
                        onChangeText={text => this.setState({ email: text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        placeholder={locale.inputTextPassword}
                        onChangeText={text => this.setState({ password: text })} />
                </View>
                <Pressable style={styles.button} onPress={() => this.onLoginButtonPress()}>
                    <Text style={styles.text}>{locale.buttonLogin}</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => this.props.navigation.navigate('Registration')}>
                    <Text style={styles.text}>{locale.buttonRegistration}</Text>
                </Pressable>
            </View>
        );
    }

    onLoginButtonPress() {
        console.log(this.state)
        this.api.login(this.state, result => {
            if (result.accessToken) {
                console.log("LOG OK", result.accessToken)
                this.props.navigation.navigate('Main',  { token: result.accessToken})
                return
            }
            ToastAndroid.show(locale.toastLoginFailed, ToastAndroid.SHORT);
        })
    }
}