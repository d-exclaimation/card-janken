//
//  janken-data.go
//  models
//
//  Created by d-exclaimation on 9:01 PM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

package models

// Data Interface
type Data interface {
	ConformData()
}

type DataType string

const (
	NotificationData DataType = "notification"
	CardData 		 DataType = "card"
)

type JankenResult struct {
	Type DataType `json:"type"`
	Data Data `json:"data"`
}

func NewSocketCard(data *JankenCard) *JankenResult {
	return &JankenResult{
		Type: CardData,
		Data: data,
	}
}

func NewSocketNotification(data *Notification) *JankenResult {
	return &JankenResult{
		Type: NotificationData,
		Data: data,
	}
}