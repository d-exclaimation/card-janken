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
import {Button, useDisclosure} from '@chakra-ui/react';
import Bank from './components/Bank';
import WinAlert from './components/WinAlert';

import {observer} from 'mobx-react-lite';
import {JankenStoreContext} from './models/JankenStore';
import {GameState} from './models/JankenGame';

import {drivePlayURL} from './libs/DriveSoundURL';
import {useAudio} from './libs/AudioPlayer';

const App: React.FC = observer(() => {
    const jankenStore = useContext(JankenStoreContext);
    const [toogleWin, toogleLost] = [useAudio(winSoundURL), useAudio(loseSoundURL)];

    // On View State
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ gameOver, setGameOver ] = useState<boolean>(false);
    const choose = (index: number) => {
        jankenStore.choose(index);
    };

    React.useEffect(() => {
        if (jankenStore.gameState !== GameState.onGoing) {
            setGameOver(true);
            jankenStore.gameState === GameState.won ? toogleWin() : toogleLost();
            onOpen();
        } else {
            setGameOver(false);
        }
    }, [jankenStore.gameState]);

    return (
        <div className="App">
            <header className="App-header">
                <Board
                    myHand={jankenStore.playerHand}
                    table={jankenStore.table}
                    wonRound={jankenStore.roundState}
                    choose={choose}
                />
                <>
                    <WinAlert
                        isShown={gameOver}
                        isWon={jankenStore.gameState === GameState.won}
                        onClose={() => setGameOver(false)}
                        onConfirm={() => {
                            jankenStore.restart();
                            onClose();
                            setGameOver(false);
                        }}
                    />
                    <Bank
                        isOpen={isOpen}
                        onClose={onClose}
                        loot={jankenStore.bank}
                    />
                    <Button colorScheme={isOpen ? 'red': 'green'} onClick={onOpen}>
                        Bank
                    </Button>
                </>
            </header>
        </div>
    );
});

const winSoundURL = drivePlayURL('https://drive.google.com/file/d/1m4XqTiat8kgSKzAMcdOGnjmd6QMxiT9b/view?usp=sharing');
const loseSoundURL = drivePlayURL('https://drive.google.com/file/d/1FwYBpWCa3KoI6p0gkJHRrtwS-1pB6BEt/view?usp=sharing');

export default App;
