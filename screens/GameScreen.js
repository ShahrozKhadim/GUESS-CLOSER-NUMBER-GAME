import React, {useState, useRef, useEffect} from "react";
import {
    View,
    StyleSheet,
    Alert,
    FlatList
} from "react-native";

import {Ionicons} from '@expo/vector-icons';

import NumberContainer from "../component/NumberContainer";
import Card from "../component/Card";
import TitleText from "../component/TitleText";
import MainButton from "../component/MainButton";
import BodyText from "../component/BodyText";

const generateRandomNumber = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    if (randomNumber === exclude) {
        return generateRandomNumber(min, max, exclude);
    } else {
        return randomNumber;
    }
};

const GameScreen = (props) => {

    const initialGuess = generateRandomNumber(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const {userChoice, onGameOver} = props;


    useEffect(() => {
            if (currentGuess === userChoice) {
                onGameOver(pastGuesses.length);
            }
        },
    );

    const nextGuessHandler = (direction) => {
        if ((direction === "lower" && currentGuess < props.userChoice) ||
            (direction === "greater" && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie!', 'You know that is wrong...', [{
                text: 'Sorry', style: 'cancel'
            }]);
            return
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextGuess = generateRandomNumber(
            currentLow.current,
            currentHigh.current,
            currentGuess
        );
        setCurrentGuess(nextGuess);
        setPastGuesses(curPassGuess => [nextGuess.toString(), ...curPassGuess]);
    };

    const renderListItem = (listLength, itemData) => {
        return (
            <View style={styles.listItem}>
                <BodyText> #{listLength - itemData.index} </BodyText>
                <BodyText> {itemData.item} </BodyText>
            </View>)
    };

    return (
        <View style={styles.screen}>
            <TitleText> Opponent's Guess</TitleText>
            <NumberContainer> {currentGuess} </NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton
                    onPress={
                        nextGuessHandler.bind(this, 'lower')
                    }>
                    <Ionicons name="md-remove" size={24} color="white"/>
                </MainButton>
                <MainButton
                    onPress={
                        nextGuessHandler.bind(this, 'greater')
                    }>
                    <Ionicons name="md-add" size={24} color="white"/>
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <FlatList
                    keyExtractor={item => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    },
    listContainer: {
        width: "60%",
        flex: 1
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
});

export default GameScreen;