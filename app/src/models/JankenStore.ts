//
//  JankenStore.ts
//  app
//
//  Created by d-exclaimation on 8:07 PM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import {JankenEngine} from './JankenGame';
import {JankenCard} from './JankenCard';

export class JankenStore {
    engine: JankenEngine = new JankenEngine(colorPalette, elementPallete);

    constructor() {
        makeAutoObservable(this.engine);
        makeAutoObservable(this);
    }

    get playerHand(): JankenCard[] {
        console.log(this.engine.myHand);
        return this.engine.myHand;
    }

    get otherHand(): JankenCard[] {
        return this.engine.otherHand;
    }

    get table(): [JankenCard, JankenCard] {
        return this.engine.table;
    }

    choose(index: number): void {
        this.engine.choose(index);
    }
}

const colorPalette = ['#f5b642', '#f7e114', '#1485f7', '#a511f5'];
const elementPallete = ['💧', '☘️', '🔥'];


export const JankenStoreContext = createContext(new JankenStore());
