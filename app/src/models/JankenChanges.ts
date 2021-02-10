//
//  JankenChanges.ts
//  app
//
//  Created by d-exclaimation on 10:09 PM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

import {JankenRPS} from './JankenCard';

export interface JankenChanges {
    type: string,
    data: NotificationChanges | CardChanges,
}


export interface NotificationChanges {
    Message: string
}

export interface CardChanges {
    element: string;
    power: number;
    color: string;
    rps: JankenRPS;
    isFaceUp: boolean;
}

export const NotificationData = 'notification';
export const CardData = 'card';
