//
//  SocketStore.ts
//  app
//
//  Created by d-exclaimation on 4:38 PM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

import {action, makeAutoObservable} from 'mobx';
import {JankenStore} from './JankenStore';
import {JankenChanges, NotificationChanges, CardChanges, NotificationData, CardData} from './JankenChanges';
import {JankenCard} from './JankenCard';

export class SocketStore {
    socket: WebSocket;
    controller: JankenStore;

    constructor(store: JankenStore) {
        this.controller = store;
        this.controller.tempTable.push(new JankenCard('', 0, '', 0, false));
        this.socket = new WebSocket('ws://localhost:8080/ws');
        console.log('Attempting Connection...');

        this.socket.onopen = (): void => {
            console.log('Successfully Connected');
        };

        this.socket.onmessage = (msg) => {
            // Wait for incoming messages, parse it as agreed JSON Interface
            const data: JankenChanges = JSON.parse(msg.data);
            const received = data.data;

            // Check the data type given from the server
            if (data.type === NotificationData) {

                // Notification changes should start, or reset game state
                const notif = received as NotificationChanges;
                console.log(JSON.stringify(notif));
                action(() => {
                    this.controller.tempTable = [];
                })();
            }
            else if (data.type === CardData) {

                // Card changes should continue the game, by passing into the controller
                const cardChanges = received as CardChanges;
                const card = new JankenCard(cardChanges.element, cardChanges.power, cardChanges.color, cardChanges.rps);
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
