//
//  App.tsx
//  app
//
//  Created by d-exclaimation on 1:37 PM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//


import React, {useContext, useState} from 'react';
import './App.css';
import Board from './components/Board';
import {action} from 'mobx';
import {observer} from 'mobx-react-lite';
import {JankenStoreContext} from './models/JankenStore';
import {Button, useDisclosure} from '@chakra-ui/react';
import Bank from './components/Bank';
import WinAlert from './components/WinAlert';
import {GameState} from './models/JankenGame';

const App: React.FC = observer(() => {
    const jankenStore = useContext(JankenStoreContext);

    // On View State
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ gameOver, setGameOver ] = useState<boolean>(false);
    const choose = (index: number) => {
        jankenStore.choose(index);
        if (jankenStore.engine.gameEnded !== GameState.onGoing) {
            setGameOver(true);
            onOpen();
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <Board
                    myHand={jankenStore.playerHand}
                    otherHand={jankenStore.otherHand}
                    table={jankenStore.table}
                    wonRound={jankenStore.engine.wonRound}
                    choose={choose}
                />
                <>
                    <WinAlert
                        isShown={gameOver}
                        isWon={jankenStore.engine.gameEnded === GameState.won}
                        afterEffect={() => setGameOver(false)}
                    />
                    <Bank
                        isOpen={isOpen}
                        onClose={onClose}
                        loot={jankenStore.engine.myBank}
                    />
                    <Button colorScheme={isOpen ? 'red': 'green'} onClick={onOpen}>
                        Bank
                    </Button>
                </>
            </header>
        </div>
    );
});

export default App;
