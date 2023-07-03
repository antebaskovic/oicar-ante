import { Component } from "react";
import { View, TextInput, Text, Pressable } from 'react-native';
import { Api } from "./api";
import { styles } from "./style";
import { locale } from "./lang/hr";

export class UserScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: 0,
            firstName: "",
            lastName: "",
            height: 0,
            weight: 0,
            age: 0,
            gender: "",
            miscellaneousLimits: "None",
        }
        this.api = new Api()
    }

    componentDidMount() {
        const token = this.props.route.params.token
        console.log("Test", token)
        this.api.getAccount(token, result => {
            if (result.UserID) {
                console.log(result)
                this.setState(
                    {
                        userId: result.UserID,
                        email: result.Email,
                        firstName: result.FirstName,
                        lastName: result.LastName
                    })
            }
        })
    }

    onEditButtonPress() {
        const token = this.props.route.params.token
        this.api.updateAccount(token, this.state, result => {
            if (result.UserID) {
                console.log(result)
            } else{
                console.log(result)
            }
        })

    }

    render() {
        return (
            <View style={styles.containerLeft}>
                <Text style={styles.title}>{locale.titleUserAccountEdit}</Text>
                <View style={styles.inputViewEdit} >
                    <TextInput
                        style={styles.inputText}
                        placeholder={locale.inputTextFirstName}
                        placeholderTextColor="#003f5c"
                        value={this.state.firstName}
                        onChangeText={text => this.setState({ firstName: text })}
                    />
                </View>
                <View style={styles.inputViewEdit} >
                    <TextInput
                        style={styles.inputText}
                        placeholder={locale.inputTextLastName}
                        placeholderTextColor="#003f5c"
                        value={this.state.lastName}
                        onChangeText={text => this.setState({ lastName: text })}
                    />
                </View>
                <View style={styles.inputViewEdit} >
                    <TextInput
                        style={styles.inputText}
                        keyboardType="numeric"
                        maxLength={3}
                        placeholder={locale.inputTextHeight}
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ height: Number.parseInt(text) })}
                    />
                </View>
                <View style={styles.inputViewEdit} >
                    <TextInput
                        style={styles.inputText}
                        keyboardType="numeric"
                        maxLength={3}
                        placeholder={locale.inputTextWeight}
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ weight: Number.parseInt(text) })}
                    />
                </View>
                <View style={styles.inputViewEdit} >
                    <TextInput
                        style={styles.inputText}
                        keyboardType="numeric"
                        maxLength={3}
                        placeholder={locale.inputTextAge}
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ age: Number.parseInt(text) })}
                    />
                </View>
                <View style={styles.inputViewEdit} >
                    <TextInput
                        style={styles.inputText}
                        placeholder={locale.inputTextGender}
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ gender: text })}
                    />
                </View>
                <Pressable style={styles.buttonEdit} onPress={() => this.onEditButtonPress()}>
                    <Text style={styles.text}>{locale.buttonEdit}</Text>
                </Pressable>
            </View>
        )
    }
}