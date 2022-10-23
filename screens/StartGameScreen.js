import React, {useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Button,
    Keyboard,
    Alert
} from "react-native";

import Card from "../component/Card";
import colors from "../constants/colors";
import BodyText from '../component/BodyText';
import Input from "../component/Input";
import NumberContainer from "../component/NumberContainer";
import TitleText from "../component/TitleText";
import MainButton from "../component/MainButton";

const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()


    const numberInputHandler = (textInput) => {
        setEnteredValue(textInput.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const choseNumber = parseInt(enteredValue)
        if (isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99) {
            Alert.alert(
                "Invalid Number",
                "Number has to be a number between 1 and 99",
                [{
                    text: "okay",
                    style: "destructive",
                    onPress: resetInputHandler
                }]);
            return;
        }
        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(choseNumber)
        Keyboard.dismiss()
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = <Card style={styles.summaryContainer}>
            <BodyText> You Selected </BodyText>
            <NumberContainer>
                <Text>{selectedNumber}</Text>
            </NumberContainer>
            <MainButton
                onPress={() => props.onStartGame(selectedNumber)}>
                START GAME
            </MainButton>
        </Card>;
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <TitleText
                >Start a new Game!</TitleText>
                <Card style={styles.inputContainer}>
                    <BodyText>Select a Number</BodyText>
                    <Input
                        style={styles.input}
                        blurOnSubmit
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title='Reset' onPress={resetInputHandler}
                                    color={colors.secondary}/>
                        </View>
                        <View style={styles.button}>
                            <Button title="Confirm" onPress={confirmInputHandler}
                                    color={colors.primary}/>
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    inputContainer: {
        width: 300,
        maxWidth: "80%",
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15
    },
    button: {
        width: 95,
    },
    input: {
        width: 50,
        textAlign: "center"
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: "center",
    },
});

export default StartGameScreen;