//
//  JankenGame.ts
//  app
//
//  Created by d-exclaimation on 1:45 PM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

import { JankenCard, JankenRPS } from './JankenCard';

export class JankenEngine {
    myHand: JankenCard[] = [];

    table: [JankenCard, JankenCard];

    myBank: JankenCard[] = [];
    private _otherBank: JankenCard[] = [];

    wonRound = false;
    gameEnded: GameState = GameState.onGoing;

    readonly storage: [string[], string[]];

    constructor(colors: string[], elements: string[]) {
        // Append 5 random card using factory

        for (let i = 0; i < 5; i++) {
            this.myHand.push(cardFactory(colors, elements));
        }

        // Add placeholder table card
        this.table = [
            cardFactory(colors, elements),
            cardFactory(colors, elements)
        ];

        this.table[0].isFaceUp = false;
        this.table[1].isFaceUp = false;

        // Save color and element choices basically themes
        this.storage = [colors, elements];
    }

    choose(index: number): JankenCard | null {
        // Guard if index is faulty or game is no longer on going
        if (this.myHand.length <= 0 ||  index < 0 || index >= this.myHand.length || this.gameEnded != GameState.onGoing) return null;

        // Pull a card from the hand using the index
        const chosen = this.myHand[index];
        this.myHand.splice(index, 1);


        // Push a new card to each player hand
        this.myHand.push(cardFactory(...this.storage));
        return chosen;
    }

    setTable(card: JankenCard, enemyChoice: JankenCard = cardFactory(...this.storage)): void {
        // Append to table
        this.table[0] = card;
        this.table[1] = enemyChoice;

        this.checkRound();
    }

    private checkRound(): void {
        // Compare and update round state
        this.wonRound = this.table[0].compare(this.table[1]);
        if (this.wonRound) {
            this.myBank.push(this.table[0]);
        } else {
            this._otherBank.push(this.table[1]);
        }

        this.checkWon();
    }

    private checkWon(): void {
        // Check for winning sequence in both banks, and update accordingly
        if (this.checkForElementVariety(true) || this.checkOnlyColorVariety(true)) {
            this.gameEnded = GameState.won;
            return;
        }

        if (this.checkForElementVariety(false) || this.checkOnlyColorVariety(true)) {
            this.gameEnded = GameState.lost;
            return;
        }
    }

    private checkForElementVariety(self: boolean): boolean {
        const arr = self ? this.myBank : this._otherBank;
        if (arr.length < 3) return false;

        // O(n) space to keep note of each color, reduce time complexity
        const colorSet = new Set<string>();
        const elementSet = new Set<string>();

        // O(n^2) loops since it's difficult to do it in one go
        for (let i = 0; i < arr.length; i++) {

            // have a separate counter, since map are not ordered and does not keep track of length
            let count = 1;
            colorSet.add(arr[i].color);
            elementSet.add(arr[i].element);

            // Check for other after i, and check and add to sets, increment count
            for (let j = i + 1; j < arr.length; j++) {

                if(!colorSet.has(arr[j].color) && !elementSet.has(arr[j].element)) {
                    colorSet.add(arr[j].color);
                    elementSet.add(arr[j].element);
                    count++;
                }

                // Exit early to reduce time average
                if (count >= 3) {
                    return true;
                }
            }

            // Reset sets
            colorSet.clear();
            elementSet.clear();
        }

        return false;
    }

    private checkOnlyColorVariety(self: boolean): boolean {
        const arr = self ? this.myBank : this._otherBank;
        if (arr.length < 3) return false;

        // O(n) space for color variety
        const colorSet = new Set<string>();
        let element: string;

        // Check for loop O(n^2)
        for (let i = 0; i < arr.length; i++) {

            // Have a counter
            let count = 1;
            element = arr[i].element;
            colorSet.add(arr[i].color);

            for(let j = i + 1; j < arr.length; j++) {
                if(!colorSet.has(arr[j].color) && element === arr[j].element) {
                    colorSet.add(arr[j].color);
                    count++;
                }
            }

            // Quit early
            if (count >= 3) {
                return true;
            }
            colorSet.clear();
        }

        return false;
    }
}

function cardFactory(colors: string[], elements: string[]): JankenCard {
    const randomID = Math.floor(Math.random() * elements.length);
    const element = elements[randomID];
    const rps = randomID == 0 ? JankenRPS.rock : randomID == 1 ? JankenRPS.paper : JankenRPS.scissors;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const power = Math.floor(Math.random() * 15);

    return new JankenCard(element, power > 9 ? 9 - (power - 10): power, color, rps);
}


export enum GameState {
    won,
    lost,
    onGoing,
}

