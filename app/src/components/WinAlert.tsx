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
    onClose: () => void,
    onCancel: () => void,
    onConfirm: () => void,
}


const WinAlert: React.FC<Props> = ({isWon, isShown, onClose, onCancel, onConfirm}: Props) => {
    const cancelRef = React.useRef(null);

    return (
        <AlertDialog
            isOpen={isShown}
            onClose={() => onClose()}
            leastDestructiveRef={cancelRef}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="xl" fontWeight="bold">
                        { isWon ? 'You won' : 'You lost' }
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Restart?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button onClick={() => {
                            onClose();
                            onCancel();
                        }} ref={cancelRef}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" onClick={() => {
                            onConfirm();
                            onClose();
                        }} ml={3}>
                            Restart
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default WinAlert;
