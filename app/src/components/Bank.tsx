//
//  Bank.tsx
//  app
//
//  Created by d-exclaimation on 9:13 PM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

import React from 'react';
import {JankenCard} from '../models/JankenCard';
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    SimpleGrid
} from '@chakra-ui/react';
import Card from './Card';
import {useWindowSize} from '../libs/WindowConfig';

interface Props {
    isOpen: boolean,
    onClose: () => void,
    loot: JankenCard[]
}

const Bank: React.FC<Props> = ({isOpen, onClose, loot}: Props) => {
    const window = useWindowSize();
    const spaces = Math.round(window.width / 130);
    const [cW, cH] = [Math.min(40, ((window.width * 0.6) - (8 * spaces)) / 20), Math.min(60, ((window.height * 0.8) - (5 * spaces) - 30) / 12)];
    return (
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
                        <SimpleGrid columns={7} spacing={spaces}>
                            { loot
                                .map((card, index) => {
                                    return (
                                        <Card
                                            size={{width: cW, height: cH}}
                                            key={index}
                                            isFaceUp={card.isFaceUp}
                                            power={card.power}
                                            color={card.color}
                                            element={card.element}
                                        />
                                    );
                                })}
                        </SimpleGrid>
                    </DrawerBody>
                    <DrawerFooter>
                        To win get a winning sequence of cards
                    </DrawerFooter>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    );
};

export default Bank;
