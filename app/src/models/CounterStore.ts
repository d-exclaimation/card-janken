//
//  CounterStore.ts
//  app
//
//  Created by d-exclaimation on 1:30 PM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';

class MiniTimer {
    second: number;
    saved = 0;

    constructor(start: number) {
        this.second = start;
    }

    increment(): void {
        this.saved++;
        this.second++;

        if (this.saved > 5) {
            this.anotherMethod();
        }
    }

    anotherMethod(): void {
        this.second += this.saved;
        this.saved = 0;
    }
}

class CounterStore {
    count = 0;
    timer: MiniTimer[] = [];

    constructor() {
        makeAutoObservable(this);
        for (let i = 0; i < 5; i++) {
            this.timer.push(new MiniTimer(0));
        }
    }

    increment(): void {
        this.count++;
        for(let i = 0; i < this.timer.length; i++) {
            this.timer[i].increment();
            console.log(this.timer[i].second);
        }
    }
}

export const CounterStoreContext = createContext(new CounterStore());
