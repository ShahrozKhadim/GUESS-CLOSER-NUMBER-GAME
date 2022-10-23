import {useState} from "react";
import {
    View,
    StyleSheet
} from 'react-native';

import * as Font from 'expo-font';

import Header from "./component/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = async () => {
    return await Font.loadAsync({
        'open-sans':
            require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold':
            require('./assets/fonts/OpenSans-Bold.ttf'),
    });
};

export default function App() {
    const [userNumber, setUserNumber] = useState()
    const [guessRounds, setGuessRounds] = useState(0)
    const [dataLoaded, setDataLoaded] = useState(false)

    fetchFonts();

    const startGameHandler = (selectedNumber) => {
        setUserNumber(selectedNumber);
    };

    const gameOverHandler = (numOfRounds) => {
        setGuessRounds(numOfRounds);
    };

    const configureNewGameHandler = () => {
        setGuessRounds(0);
        setUserNumber(null);
    };

    let content = <StartGameScreen
        onStartGame={startGameHandler}
    />;

    if (userNumber && guessRounds <= 0) {
        content = (
            <GameScreen
                userChoice={userNumber}
                onGameOver={gameOverHandler}
            />
        );
    } else if (guessRounds > 0) {
        content = (
            <GameOverScreen
                roundsNumber={guessRounds}
                userNumber={userNumber}
                onRestart={configureNewGameHandler}
            />
        );
    }

    return (
        <View style={styles.container}>
            <Header title='Guess a Number'/>
            {content}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
