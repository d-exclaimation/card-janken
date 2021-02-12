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
import { useAudio } from '../libs/AudioPlayer';
import { drivePlayURL } from '../libs/DriveSoundURL';
import Card from './Card';
import TableCard from './TableCard';
import {JankenCard} from '../models/JankenCard';


interface Props {
    myHand: JankenCard[],
    table: [JankenCard, JankenCard],
    wonRound: boolean,
    choose: (index: number) => void,
}

const Board: React.FC<Props> = ({ myHand, table, wonRound, choose }: Props ) => {
    const toggleFlip = useAudio(cardFlipURL);
    const size = useWindowSize();
    const [boardWidth, boardHeight] = [size.width * 0.6, size.height * 0.8];
    const [cardWidth, cardHeight] = ((): [number, number] => {
        const spaces = Math.round(size.width / 130);
        // boardHeight = cardHeight * 3 + 5 spaces + 30;
        // cardHeight = (boardHeight - 5 spaces - 30) / 3;

        // boardWidth = cardWidth * 5 + 8 spaces;
        // cardWidth = (boardWidth - (8 * spaces)) / 5;
        console.log(size);
        return [Math.min(40, (boardWidth - (8 * spaces)) / 20), Math.min(60, (boardHeight - (5 * spaces) - 30) / 12)];
    })();

    return (
        <Box m={5} p={10} bg="#fafafa" borderRadius="lg">
            <VStack width={boardWidth} height={boardHeight}>
                <HStack>
                    <Center>
                        { myHand.map((card, index) => {
                            return (
                                <Box key={index} m={5}>
                                    <Card
                                        size={{width: cardWidth, height: cardHeight}}
                                        isFaceUp={false} power={card.power} color={card.color} element={card.element} />
                                </Box>
                            );
                        }) }
                    </Center>
                </HStack>
                <Spacer />
                <TableCard window={size} cards={table} isWon={wonRound} radius={10} pads={10}/>
                <Spacer />
                <HStack>
                    <Center>
                        { myHand.map((card, index) => {
                            return (
                                <Box as="button" key={index} m={5} onClick={() => {
                                    toggleFlip();
                                    choose(index);
                                }}>
                                    <Card
                                        size={{width: cardWidth, height: cardHeight}}
                                        isFaceUp={card.isFaceUp} power={card.power} color={card.color} element={card.element} />
                                </Box>
                            );
                        }) }
                    </Center>
                </HStack>
            </VStack>
        </Box>
    );
};

const cardFlipURL = drivePlayURL('https://drive.google.com/file/d/1tOqQ3RR5txhzrseHatUtJ8xNsdl1Ud0f/view');

export default Board;
