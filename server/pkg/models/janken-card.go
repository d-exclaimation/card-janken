//
//  janken-card.go
//  models
//
//  Created by d-exclaimation on 8:30 PM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

package models

import "fmt"

// Card Interface
type JankenCard struct {
	Element string  `json:"element"`
	Power int       `json:"power"`
	Color string    `json:"color"`
	Rps int			`json:"rps"`
	IsFaceUp bool   `json:"isFaceUp"`
}

func (card *JankenCard) ConformData() {}

func (card *JankenCard) ToString() string {
	return fmt.Sprintf(
		"{element: %s, power: %d, color: %s, rps: %d, isFaceUp: %t}",
		card.Element,
		card.Power,
		card.Color,
		card.Rps,
		card.IsFaceUp,
    )
}

type JankenChanges struct {
	ID string
	Card *JankenCard
}