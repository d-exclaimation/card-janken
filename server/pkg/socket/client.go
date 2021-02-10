//
//  client.go
//  socket
//
//  Created by d-exclaimation on 11:48 AM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

package socket

import (
	"fmt"
	"github.com/d-exclaimation/battle-cards-multi/pkg/models"
	"github.com/gorilla/websocket"
	"log"
)

type Client struct {
	ID string
	Conn *websocket.Conn
	Pool *Pool
}


func (client *Client) Read() {
	defer func() {
		client.Pool.Unregister <- client
		_ = client.Conn.Close()
	}()

	for {
		var (
			card models.JankenCard
			err = client.Conn.ReadJSON(&card)
		)
		if err != nil {
			log.Println(err)
			return
		}

		var changes = &models.JankenChanges{
			ID:   client.ID,
			Card: &card,
		}

		client.Pool.Broadcast <- changes

		fmt.Printf("Received: %s\n", card.ToString())
	}
}
