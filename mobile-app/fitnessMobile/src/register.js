import React from 'react';
import { Component } from "react";
import { Text, View, TextInput, ToastAndroid, Pressable } from 'react-native';
import { Api } from './api';
import { styles } from "./style";
import { locale } from "./lang/hr";

export class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      role: "user"
    }
    this.api = new Api()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>{locale.titleRegistration}</Text>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder= {locale.inputTextFirstName}
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ firstName: text })}
          />
        </View>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder={locale.inputTextLastName}
            autoCapitalize="none"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ lastName: text })}
          />
        </View>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder={locale.inputTextEmail}
            autoCapitalize="none"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ email: text })}
          />
        </View>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder= {locale.inputTextPassword}
            secureTextEntry={true}
            autoCapitalize="none"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ password: text })}
          />
        </View>
        <Pressable style={styles.button} onPress={() => this.onRegisterButtonPress(this.state.email)}>
          <Text style={styles.text}>{locale.buttonRegistration}</Text>
        </Pressable>
      </View>
    );
  }

  onRegisterButtonPress() {
    this.api.register(this.state, result => {
      if (result.userId) {
        ToastAndroid.show(locale.toastRegisterSuccessful, ToastAndroid.SHORT);
        
        return;
      }
      ToastAndroid.show(locale.toastRegisterFailed, ToastAndroid.SHORT);
    })
  }
}
