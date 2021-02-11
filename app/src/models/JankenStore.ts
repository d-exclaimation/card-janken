//
//  JankenStore.ts
//  app
//
//  Created by d-exclaimation on 8:07 PM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

import {makeAutoObservable} from 'mobx';
import React, {createContext} from 'react';
import {GameState, JankenEngine} from './JankenGame';
import {JankenCard} from './JankenCard';
import {SocketStore} from './SocketStore';

export class JankenStore {
    engine: JankenEngine = new JankenEngine(colorPalette, elementPallete);
    multiplayer: boolean;
    socket: SocketStore | null;
    tempTable: JankenCard[] = [];

    constructor(multi = false) {
        // Set multiplayer and socket if multiplayer
        this.multiplayer = multi;
        this.socket = multi ? new SocketStore(this) : null;

        // Make all class observable using Mobx AutoObservable (not perfect since my class are highly nested)
        makeAutoObservable(this.engine);
        makeAutoObservable(this);
    }

    // Game States
    get playerHand(): JankenCard[] {
        // If a player in multiplayer chooses a card, hid all his/her other card to prevent spam choosing
        if (this.tempTable.length && this.multiplayer)
            return this.engine.myHand.map(card => new JankenCard(card.element, card.power, card.color, card.rps, false));
        return this.engine.myHand;
    }

    get table(): [JankenCard, JankenCard] {
        // If a player in multiplayer chooses a card, hid his/her table to notify that he/she need to wait for opponent
        if (this.tempTable.length && this.multiplayer)
            return [
                new JankenCard('', 0, '', 0, false), 
                new JankenCard('', 0, '', 0, false)
            ];
        return this.engine.table;
    }

    get bank(): JankenCard[] {
        return this.engine.myBank;
    }

    // Game Computer Properties
    get gameState(): GameState {
        return this.engine.gameEnded;
    }

    get roundState(): boolean {
        return this.engine.wonRound;
    }

    choose(index: number): void {
        // Prevent spam clicking in multiplayer
        if (this.tempTable.length && this.multiplayer)
            return;

        // Grab the selected card, if did not exist quit early
        const selected = this.engine.choose(index);

        if (selected === null)
            return;

        // Push the waiting queue
        this.tempTable.push(selected);

        // If multiplayer notify server, otherwise proceed
        if (!this.multiplayer) {
            this.proceed();
        } else {
            this.socket?.send(JSON.stringify(selected));
        }
    }

    proceed(card: JankenCard | null = null): void {
        // Grab the queued card if exist
        const choice = this.tempTable.shift();
        if (!choice) return;

        // Check whether given a enemy card of not, proceed with either case
        if (card === null) {
            this.engine.setTable(choice);
        } else {
            this.engine.setTable(choice, card);
        }
    }

    restart(): void {
        // Change the engine to a new one, and re-make into observable
        this.engine = new JankenEngine(colorPalette, elementPallete);
        this.socket = this.multiplayer ? new SocketStore(this) : null;
        makeAutoObservable(this.engine);
    }
}

const colorPalette = ['#f5b642', '#f7e114', '#1485f7', '#a511f5'];
const elementPallete = ['💧', '☘️', '🔥'];


export const JankenStoreContext = createContext(new JankenStore(false));
export const makeJankenStore = (multi: boolean): React.Context<JankenStore> => {
    return createContext(new JankenStore(multi));
};
