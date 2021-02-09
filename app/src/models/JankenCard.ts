//
//  JankenCard.ts
//  app
//
//  Created by d-exclaimation on 3:15 PM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

export class JankenCard {
    readonly element: string;
    readonly power: number;
    readonly color: string;
    readonly rps: JankenRPS;
    isFaceUp: boolean;

    constructor(element: string, power: number, color: string, rps: JankenRPS) {
        this.element = element;
        this.power = power;
        this.color = color;
        this.rps = rps;
        this.isFaceUp = true;
    }

    compare(other: JankenCard): boolean {
        if (this.wonAgainst(other)) {
            return true;
        }
        if (this.lostAgainst(other)) {
            return false;
        }

        return this.power >= other.power;
    }

    wonAgainst(other: JankenCard): boolean {
        switch (this.rps) {
        case JankenRPS.paper:
            return other.rps == JankenRPS.rock;
        case JankenRPS.rock:
            return other.rps == JankenRPS.scissors;
        case JankenRPS.scissors:
            return other.rps == JankenRPS.paper;
        }
    }

    lostAgainst(other: JankenCard): boolean {
        switch (this.rps) {
        case JankenRPS.paper:
            return other.rps == JankenRPS.scissors;
        case JankenRPS.rock:
            return other.rps == JankenRPS.paper;
        case JankenRPS.scissors:
            return other.rps == JankenRPS.rock;
        }
    }
}
export enum JankenRPS {
    rock,
    paper,
    scissors,
}
