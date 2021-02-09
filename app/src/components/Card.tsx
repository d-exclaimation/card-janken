//
//  Card.tsx
//  app
//
//  Created by d-exclaimation on 1:48 PM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

interface Props {
    element: string,
    power: number,
    color: string,
    isFaceUp: boolean,
    size?: CardSize,
}

interface CardSize {
    width: number,
    height: number
}

const Card: React.FC<Props> = ({element, power, color, isFaceUp, size}: Props) => {
    const scaledSize = size ? Math.min(size.width, size.height) * 0.75 : 40;
    const bgColor = isFaceUp ? color : '#808080';

    return (
        <Box bg={bgColor} p={5} borderRadius={cardPadding * 2} boxShadow="dark-lg">
            <VStack bg="#fafafa" borderRadius={cardPadding}>
                { isFaceUp ? (
                    <Box m={2}>
                        <Text userSelect="none" fontSize={scaledSize}>{ element }</Text>
                        <Text userSelect="none" fontSize={scaledSize - 10} p={cardPadding}>{ power }</Text>
                    </Box>
                ) : (
                    <Box bg={bgColor}>
                        <Text userSelect="none" m={2} bg={bgColor} fontSize={scaledSize} color={bgColor}>{ 'No' }</Text>
                        <Text userSelect="none" bg={bgColor} fontSize={scaledSize - 10} p={cardPadding} color={bgColor}>{ 'No' }</Text>
                    </Box>
                ) }
            </VStack>
        </Box>
    );
};

Card.defaultProps = {
    size: {width: 40, height: 60}
};

const cardPadding = 5;

export default Card;

