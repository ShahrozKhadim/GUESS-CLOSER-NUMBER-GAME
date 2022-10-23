import React from "react";
import {
    View,
    StyleSheet,
    Image,
    Text
} from "react-native";

import BodyText from "../component/BodyText";
import TitleText from "../component/TitleText";
import MainButton from "../component/MainButton";

import colors from "../constants/colors";

const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assets/success.png')}/>
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>Your phone needed{' '}
                    <Text style={styles.highLight}>{props.roundsNumber}</Text> rounds to
                    guess the number{' '}
                    <Text style={styles.highLight}>{props.userNumber}</Text>.
                </BodyText>
            </View>
            <MainButton
                onPress={props.onRestart}>
                NEW GAME
            </MainButton>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        height: '100%',
        width: '100%',
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 15,
    },
    highLight: {
        color: colors.secondary,
        fontFamily: 'open-sans-bold',
    },
    resultText: {
        textAlign: "center",
        fontSize: 20
    }
});

export default GameOverScreen;