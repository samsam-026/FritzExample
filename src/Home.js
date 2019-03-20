import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, Picker } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class Home extends Component {

    // Hide the header
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);

        // initialize the picker with the first value
        this.state = {
            filter: "BICENTENNIAL_PRINT"
        }
    }

    render() {

        // Get the following parameters from navigation props, if they have a value.
        const { navigation } = this.props;
        const oldImage = navigation.getParam('oldImage');
        const newImage = navigation.getParam('newImage');

        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.innerContainer}>
                        <Text style={styles.welcome}>React Native Fritz Example!</Text>
                        <Text style={{ fontSize: 18 }}>Style Transfer</Text>
                        <Picker style={{ width: "100%" }} selectedValue={this.state.filter} mode="dropdown" onValueChange={(value) => this.setState({ filter: value })}>
                            <Picker.Item value="BICENTENNIAL_PRINT" label="Bicentennial Print" />
                            <Picker.Item value="FEMMES" label="Femmes" />
                            <Picker.Item value="HEAD_OF_CLOWN" label="Head of Clown" />
                            <Picker.Item value="HORSES_ON_SEASHORE" label="Horses on Seashore" />
                            <Picker.Item value="KALEIDOSCOPE" label="Kaleidoscope" />
                            <Picker.Item value="PINK_BLUE_RHOMBUS" label="Pink Blue Rhombus" />
                            <Picker.Item value="POPPY_FIELD" label="Poppy Field" />
                            <Picker.Item value="RITMO_PLASTICO" label="Ritmo Plastico" />
                            <Picker.Item value="STARRY_NIGHT" label="Starry Night" />
                            <Picker.Item value="THE_SCREAM" label="The Scream" />
                            <Picker.Item value="THE_TRAIL" label="The Trail" />
                        </Picker>
                        <Button title="Take Picture" onPress={() => this.props.navigation.navigate('Camera', { filter: this.state.filter })} />
                        {/* Display the images, only if the values are not undefined or empty strings */}
                        {oldImage && <Image style={styles.imageStyle} source={{ uri: 'data:image/png;base64,' + oldImage }} />}
                        {newImage && <Image style={styles.imageStyle} source={{ uri: 'data:image/png;base64,' + newImage }} />}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    imageStyle: {
        width: 250,
        height: 250,
        marginVertical: 5
    }
});

