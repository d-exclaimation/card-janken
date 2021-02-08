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
    cards: [CardProps, CardProps]
    isWon: boolean
    radius: number
    pads: number
}

export interface CardProps {
    element: string,
    power: number,
    color: string,
    isFaceUp: boolean,
}


const TableCard: React.FC<Props> = ({cards, isWon, radius, pads}: Props) => {
    const window = useWindowSize();
    const tableIndicator = (): JSX.Element => {
        return ( isWon ?
            <CheckCircleIcon w={16} h={16} color="green.500" opacity={1} /> :
            <WarningIcon w={16} h={16} color="red.500" opacity={1} />
        );
    };

    const tableCard = (num: number): JSX.Element => {
        return (
            <Card isFaceUp={cards[num].isFaceUp} power={cards[num].power} color={cards[num].color} element={cards[num].element} />
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
