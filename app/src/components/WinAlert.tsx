//
//  WinAlert.tsx
//  app
//
//  Created by d-exclaimation on 9:17 PM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

import React from 'react';
import {
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react';

interface Props {
    isShown: boolean,
    isWon: boolean,
    afterEffect: () => void,
}


const WinAlert: React.FC<Props> = ({isWon, isShown, afterEffect}: Props) => {
    const cancelRef = React.useRef(null);

    return (
        <AlertDialog
            isOpen={isShown}
            onClose={() => afterEffect()}
            leastDestructiveRef={cancelRef}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        { isWon ? 'You won' : 'You lost' }
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Restart?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button onClick={afterEffect} ref={cancelRef}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" onClick={() => afterEffect()} ml={3}>
                            Restart
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default WinAlert;
