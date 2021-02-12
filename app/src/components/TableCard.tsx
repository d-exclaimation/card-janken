//
//  TableCard.tsx
//  app
//
//  Created by d-exclaimation on 3:48 PM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

import React from 'react';
import { HStack, Spacer } from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { useWindowSize } from '../libs/WindowConfig';
import Card from './Card';

interface Props {
    cards: [CardProps, CardProps],
    isWon: boolean,
    radius: number,
    pads: number,
    window: Size,
}

export interface CardProps {
    element: string,
    power: number,
    color: string,
    isFaceUp: boolean,
}

interface Size {
    width: number,
    height: number
}


const TableCard: React.FC<Props> = ({cards, isWon, radius, pads, window}: Props) => {
    const [boardWidth, boardHeight] = [window.width * 0.6, window.height * 0.8];
    const [cardWidth, cardHeight] = ((): [number, number] => {
        const spaces = 10;
        return [Math.min(40, (boardWidth - (8 * spaces)) / 20), Math.min(60, (boardHeight - (5 * spaces) - 30) / 12)];
    })();
    const iconSize = Math.round(cardWidth * 0.4);

    const tableIndicator = (): JSX.Element => {
        return ( isWon ?
            <CheckCircleIcon w={iconSize} h={iconSize} color="green.500" opacity={1} /> :
            <WarningIcon w={iconSize} h={iconSize} color="red.500" opacity={1} />
        );
    };

    const tableCard = (num: number): JSX.Element => {
        return (
            <Card
                size={{width: cardWidth, height: cardHeight}}
                isFaceUp={cards[num].isFaceUp} power={cards[num].power} color={cards[num].color} element={cards[num].element} />
        );
    };

    return (
        <HStack boxShadow="dark-lg" p={5} bg="#303030" borderRadius={radius} px={pads} w={window.width / 3}>
            { tableCard(0) }
            <Spacer />
            { tableIndicator() }
            <Spacer />
            { tableCard(1) }
        </HStack>
    );
};

export default TableCard;
