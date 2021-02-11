//
//  MainMenu.tsx
//  app
//
//  Created by d-exclaimation on 3:00 PM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

import React from 'react';
import '../App.css';
import {Box, Button, HStack, VStack} from '@chakra-ui/react';

interface Props {
    multi: boolean,
    setIn: (change: boolean) => void,
    setMulti: (change: boolean) => void,
}

const MainMenu: React.FC<Props> = ({ multi, setIn, setMulti}: Props) => {
    return (
        <div className="App">
            <header className="App-header">
                <Box p={5} bg="#fafafa" borderRadius={10}>
                    <VStack>
                        <Box
                            m={3}
                            p={3}
                            bg="#303030" color="#fafafa"
                            borderRadius={20}
                        > Card-Janken: { multi ? 'Multiplayer' : 'Singleplayer' }</Box>
                        <HStack>
                            <Button
                                bg="turquoise"
                                p={5} onClick={() => setMulti(false)}> Single </Button>
                            <Button p={5} onClick={() => setMulti(true)}> Multi: </Button>
                        </HStack>
                        <Button
                            p={5} bg="black" color="white"
                            onClick={() => setIn(true)}
                        >
                            Continue
                        </Button>
                    </VStack>
                </Box>
            </header>
        </div>
    );
};

export default MainMenu;
