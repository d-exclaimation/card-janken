//
//  Board.tsx
//  app
//
//  Created by d-exclaimation on 1:37 PM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

import React from 'react';
import {
    Box,
    HStack, VStack,
    Spacer,
    Center,
} from '@chakra-ui/react';
import { useWindowSize } from '../libs/WindowConfig';
import Card from './Card';
import TableCard from './TableCard';
import {JankenCard} from '../models/JankenCard';


interface Props {
    myHand: JankenCard[],
    otherHand: JankenCard[],
    table: [JankenCard, JankenCard],
    wonRound: boolean,
    choose: (index: number) => void,
}

const Board: React.FC<Props> = ({ myHand, otherHand, table, wonRound, choose }: Props ) => {
    const size = useWindowSize();

    return (
        <Box m={5} p={10} bg="#fafafa" borderRadius="lg">
            <VStack width={size.width * 0.6} height={size.height * 0.8}>
                <HStack>
                    <Center>
                        { otherHand.map((card, index) => {
                            return (
                                <Box key={index} m={5}>
                                    <Card isFaceUp={card.isFaceUp} power={card.power} color={card.color} element={card.element} />
                                </Box>
                            );
                        }) }
                    </Center>
                </HStack>
                <Spacer />
                <TableCard cards={table} isWon={wonRound} radius={10} pads={10}/>
                <Spacer />
                <HStack>
                    <Center>
                        { myHand.map((card, index) => {
                            return (
                                <Box as="button" key={index} m={5} onClick={() => choose(index)}>
                                    <Card isFaceUp={card.isFaceUp} power={card.power} color={card.color} element={card.element} />
                                </Box>
                            );
                        }) }
                    </Center>
                </HStack>
            </VStack>
        </Box>
    );
};

export default Board;
