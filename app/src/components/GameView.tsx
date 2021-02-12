//
//  GameView.tsx
//  app
//
//  Created by d-exclaimation on 6:27 PM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

import React, {useContext, useState} from 'react';
import '../App.css';

import {JankenStore, JankenStoreContext} from '../models/JankenStore';
import {GameState} from '../models/JankenGame';
import {observer} from 'mobx-react-lite';

import {useAudio} from '../libs/AudioPlayer';
import {drivePlayURL} from '../libs/DriveSoundURL';

import {Button, useDisclosure} from '@chakra-ui/react';
import Board from './Board';
import WinAlert from './WinAlert';
import Bank from './Bank';
import {useWindowSize} from '../libs/WindowConfig';

const winSoundURL = drivePlayURL('https://drive.google.com/file/d/1m4XqTiat8kgSKzAMcdOGnjmd6QMxiT9b/view?usp=sharing');
const loseSoundURL = drivePlayURL('https://drive.google.com/file/d/1FwYBpWCa3KoI6p0gkJHRrtwS-1pB6BEt/view?usp=sharing');

interface Props {
    context: React.Context<JankenStore> | null,
    quit: () => void,
}

const Game: React.FC<Props> = observer(({ context, quit }: Props) => {
    const jankenStore = useContext(context === null ? JankenStoreContext : context);
    const [toogleWin, toogleLost] = [useAudio(winSoundURL), useAudio(loseSoundURL)];
    const window = useWindowSize();

    // On View State
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ refresh, setRefresh ] = useState<number>(0);
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

    React.useEffect(() => {
        setRefresh(refresh + 1);
        if (refresh < 1) return;

        if (jankenStore.roundState) {
            toogleWin();
        } else {
            toogleLost();
        }
    }, [jankenStore.roundState]);

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
                        onCancel={quit}
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
                    <Button
                        pos="absolute" top={window.height * 0.01} left={window.width * 0.01}
                        colorScheme="red" onClick={() => quit()}>
                        Exit
                    </Button>
                </>
            </header>
        </div>
    );
});

export default Game;
