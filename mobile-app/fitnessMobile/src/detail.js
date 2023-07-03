import { Component } from "react";
import { SafeAreaView, View, FlatList, Text} from 'react-native';
import { Api } from "./api";
import { styles } from "./style";
import { locale } from "./lang/hr";

export class DetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        const token = this.props.route.params.token
        this.api.getPrograms(token, result => {
            if (result) {
                this.setState({ data: result })
            }
        })
    }

    onProgramSelected(item) {
        const token = this.props.route.params.token
        this.api.getProgramEnroll(token, item.ProgramID, result => {
            console.log(result)
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.containerLeft}>
                <Text style={styles.title}>{locale.tileUserPrograms}</Text>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.textView} onPress={() => this.onProgramSelected(item)}>
                                {item.Name}
                            </Text>
                        </View>
                    )}
                />
            </SafeAreaView>
        )
    }
}