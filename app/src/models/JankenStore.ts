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
        this.multiplayer = multi;
        this.socket = multi ? new SocketStore(this) : null;
        makeAutoObservable(this.engine);
        makeAutoObservable(this);
    }

    // Game States
    get playerHand(): JankenCard[] {
        return this.engine.myHand;
    }

    get table(): [JankenCard, JankenCard] {
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
        const selected = this.engine.choose(index);

        if (selected === null) return;

        this.tempTable.push(selected);

        if (!this.multiplayer) {
            this.proceed();
        } else {
            this.socket?.send(JSON.stringify(selected));
        }
    }

    proceed(card: JankenCard | null = null): void {
        const choice = this.tempTable.shift();
        if (!choice) return;

        // Check whether given a enemy card of not
        if (card === null) {
            this.engine.setTable(choice);
        } else {
            this.engine.setTable(choice, card);
        }
    }

    restart(): void {
        this.engine = new JankenEngine(colorPalette, elementPallete);
        makeAutoObservable(this.engine);
    }
}

const colorPalette = ['#f5b642', '#f7e114', '#1485f7', '#a511f5'];
const elementPallete = ['💧', '☘️', '🔥'];


export const JankenStoreContext = createContext(new JankenStore(true));
export const makeMultiJankeStore = (): React.Context<JankenStore> => {
    return createContext(new JankenStore(true));
};
