import { Component } from "react";
import { SafeAreaView, View, FlatList, Text, RefreshControl, Modal, Pressable, ToastAndroid } from 'react-native';
import { Api } from "./api";
import { styles } from "./style";
import { locale } from "./lang/hr";

export class EnrollScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            modalItem: {},
            refreshing: false,
            modalVisible: false,
        }
        this.api = new Api()
    }

    componentDidMount() {
        const token = this.props.route.params.token
        this.api.getProgramEnroll(token, result => {
            if (result) {
                this.setState({ data: result })
            }
        })
    }

    onItemSelected(item) {
        this.setState({modalItem: item})
        this.setState({modalVisible: true})
    }

    

    onRefresh() {
        this.setState({ refreshing: true })
        const token = this.props.route.params.token
        this.api.getPrograms(token, result => {
            if (result) {
                this.setState({ data: result })
            }
            this.setState({ refreshing: false })
        })
    }

    render() {
        return (
            <SafeAreaView style={styles.containerLeft}>
                <Text style={styles.title}>{locale.titleMyPrograms}</Text>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                      
                        this.setState({ modalVisible: !this.state.modalVisible });
                    }}>
                    <View style={styles.containerLeft}>
                        <View style={styles.modalView}>
                            <Text style={styles.title}>{locale.titleProgramDetail}</Text>
                            <Text style={styles.textView}>{locale.textProgramName} {this.state.modalItem.Name}</Text>
                            <Text style={styles.textView}>{locale.textProgramDescription} {this.state.modalItem.Description}</Text>
                            <Text style={styles.textView}>{locale.textProgramCategory} {this.state.modalItem.Category}</Text>
                            <Pressable
                                style={styles.buttonEdit}
                                onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}>
                                <Text style={styles.text}>{locale.hideModalProgram}</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <FlatList
                    data={this.state.data}
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />
                    }
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.textView} onPress={() => this.onItemSelected(item)}>
                                {item.Name}
                            </Text>
                        </View>
                    )}
                />
            </SafeAreaView>
        )
    }
}