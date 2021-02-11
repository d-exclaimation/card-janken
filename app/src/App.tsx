//
//  App.tsx
//  app
//
//  Created by d-exclaimation on 1:37 PM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

import React, {useState} from 'react';
import './App.css';

import Game from './components/GameView';
import {Box} from '@chakra-ui/react';
import MainMenu from './components/MainMenu';

import {JankenStore, makeJankenStore} from './models/JankenStore';

// Contexts
let storeContext: React.Context<JankenStore> | null = null;

// Main Menu Higher Order Component
const App: React.FC = () => {
    const [isIn, setIn] = useState<boolean>(false);
    const [multi, setMulti] = useState<boolean>(false);

    const enterGame = (state: boolean) => {
        if (!state) return;
        storeContext = makeJankenStore(multi);
        setIn(state);
    };

    return (
        <Box> { isIn ? <Game context={storeContext} /> : <MainMenu multi={multi} setIn={enterGame} setMulti={setMulti}/> } </Box>
    );
};

export default App;
