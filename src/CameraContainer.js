import React, { Component } from 'react';
import { RNCamera } from 'react-native-camera';
import { View, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';
import FritzStyle from "./FritzModule";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#000",
        position: 'absolute',
        height: '100%',
        width: '100%'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    cameraButton: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10
    },
});

class CameraContainer extends Component {

    // Hide the header
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);

        // Initialize below properties
        this.state = {
            oldImage: '',
            newImage: '',
            loading: false
        };
    }

    render() {

        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    captureAudio={false}
                >
                    {/* Display the button to take picture only if camera permission is given */}
                    {({ camera, status }) => {
                        if ((status !== 'NOT_AUTHORIZED')) {
                            return (
                                <View style={styles.cameraButton}>
                                    {/* Display spinner if loading, if not display button */}
                                    {this.state.loading ? <ActivityIndicator size="large" color="#FFF" /> : <Button onPress={this.takePicture.bind(this)} title={"Take Pic"} />}
                                </View>
                            );
                        }
                    }}
                </RNCamera>
            </View>

        );
    }

    takePicture = async function () {

        // set loading to true on button click, to show user and action is taking place.
        this.setState({ loading: true });

        // Get the chosen artwork filter picked byt user.
        const { navigation } = this.props;
        const filter = navigation.getParam('filter');

        // If the reference to the camera exists.
        if (this.camera) {

            // Take a base64 image with the following options.
            const options = { quality: 0.75, base64: true, maxWidth: 500, maxHeight: 500, fixOrientation: true };
            const data = await this.camera.takePictureAsync(options);

            // Set the old image as the one captured above.
            this.setState({
                oldImage: data.base64
            },
                () => {

                    // Call the native module method and pass the base64 of the original image and name of selected artwork style.
                    FritzStyle.getNewImage(data.base64, filter,
                        // Error Callback
                        (error) => {
                            // Display an alert to tell user an Arror was encountered.
                            console.log(error);
                            Alert.alert("Alert", "An Error has occured.");
                        },
                        //Success Callback
                        (newData) => {

                            // Set the new image as the one sent from the success callback.
                            this.setState({
                                newImage: newData
                            },
                                () => {

                                    // Navigate to the Home page, while passing the old and converted image.
                                    this.props.navigation.navigate("Home", {
                                        oldImage: this.state.oldImage,
                                        newImage: this.state.newImage
                                    });
                                });
                        });
                }
            );
        }
    }
}

export default CameraContainer;