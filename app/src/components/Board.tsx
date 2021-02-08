//
//  Board.tsx
//  app
//
//  Created by d-exclaimation on 1:37 PM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

import React, { useState } from 'react';
import {
    Box,
    HStack, VStack,
    Spacer,
    Center,
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure
} from '@chakra-ui/react';
import { useWindowSize } from '../libs/WindowConfig';
import Card from './Card';
import TableCard, { CardProps } from './TableCard';

const Board: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [state, setState] = useState(false);
    const cardCount = 5;
    const size = useWindowSize();

    return (
        <Box m={5} p={10} bg="#fafafa" borderRadius="lg">
            <VStack width={size.width * 0.6} height={size.height * 0.8}>
                <HStack>
                    <Center>
                        { new Array<number>(cardCount).fill(0)
                            .map((num, index) => {
                                return (
                                    <Box key={index} m={5} onClick={() => setState(!state)}>
                                        <Card color={'#18d968'} element={'💧'} isFaceUp={state} power={num}/>
                                    </Box>
                                );
                            })}
                    </Center>
                </HStack>
                <Spacer />
                <TableCard cards={fakeData} isWon={state} radius={10} pads={10}/>
                <Spacer />
                <HStack>
                    <Center>
                        { new Array<number>(cardCount).fill(0)
                            .map((num, index) => {
                                return (
                                    <Box key={index} m={5} onClick={() => setState(!state)}>
                                        <Card color={'#e88d0e'} element={'💧'} isFaceUp={state} power={num}/>
                                    </Box>
                                );
                            })}
                    </Center>
                </HStack>


                {
                    // Bank Control and Display
                }
                <>
                    <Drawer
                        isOpen={isOpen}
                        placement="right"
                        onClose={onClose}
                        size={'xl'}
                    >
                        <DrawerOverlay>
                            <DrawerContent>
                                <DrawerCloseButton />
                                <DrawerHeader>Card Bank</DrawerHeader>
                                <DrawerBody>
                                    <HStack>
                                        { new Array<number>(5).fill(0)
                                            .map((num, index) => {
                                                return (
                                                    <Card key={index} isFaceUp={true} power={num} color={'red'} element={'☃️'}/>
                                                );
                                            })}
                                    </HStack>
                                </DrawerBody>
                                <DrawerFooter>
                                    To win get a winning sequence of cards
                                </DrawerFooter>
                            </DrawerContent>
                        </DrawerOverlay>
                    </Drawer>
                </>
            </VStack>
            <Button colorScheme={isOpen ? 'red': 'green'} onClick={onOpen}>
                Bank
            </Button>
        </Box>
    );
};

const fakeData: [CardProps, CardProps] = [
    {
        element: '☘️',
        power: 5,
        color: 'purple',
        isFaceUp: true
    }, 
    {
        element: '🔥',
        power: 6,
        color: 'orange',
        isFaceUp: true
    }
];


export default Board;
