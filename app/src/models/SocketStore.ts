//
//  SocketStore.ts
//  app
//
//  Created by d-exclaimation on 4:38 PM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

import {makeAutoObservable} from 'mobx';
import {JankenStore} from './JankenStore';
import {JankenChanges, NotificationChanges, CardChanges, NotificationData, CardData} from './JankenChanges';
import {JankenCard} from './JankenCard';

export class SocketStore {
    socket: WebSocket;
    controller: JankenStore;

    constructor(store: JankenStore) {
        this.controller = store;
        this.socket = new WebSocket('ws://localhost:8080/ws');
        console.log('Attempting Connection...');

        this.socket.onopen = (): void => {
            console.log('Successfully Connected');
        };

        this.socket.onmessage = (msg): void => {
            // TODO: Proceed with the game
            const data: JankenChanges = JSON.parse(msg.data);
            const received = data.data;

            if (data.type === NotificationData) {
                // TODO: Start the game
            }

            if (data.type === CardData) {
                const cardChanges = received as CardChanges;
                const card = new JankenCard(cardChanges.element, cardChanges.power, cardChanges.color, cardChanges.rps);
                console.log(card);
                this.controller.proceed(card);
            }
        };

        this.socket.onclose = (ev): void => {
            console.log('Socket Closed Connection: ', ev);
        };

        this.socket.onerror = (ev) => {
            this.controller.multiplayer = false;
            console.log('Socket Error: ', ev);
        };

        makeAutoObservable(this);
    }

    send(data: string): void {
        this.socket.send(data);
    }
}
