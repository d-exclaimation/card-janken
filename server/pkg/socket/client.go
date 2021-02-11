//
//  client.go
//  socket
//
//  Created by d-exclaimation on 11:48 AM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

package socket

import (
	randomkey "github.com/d-exclaimation/battle-cards-multi/pkg/key"
	"github.com/d-exclaimation/battle-cards-multi/pkg/models"
	"github.com/gorilla/websocket"
	"log"
)

type Client struct {
	ID string
	Conn *websocket.Conn
	Pool *Pool
}

func NewClient(conn *websocket.Conn, pool *Pool) *Client {
	return &Client{
		ID:   randomkey.RandomKey(40, false, true),
		Conn: conn,
		Pool: pool,
	}
}

func (client *Client) Read() {
	defer func() {
		// Unregister client and close connection
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

		// Send changes and broadcast to channel
		var changes = &models.JankenChanges{
			ID:   client.ID,
			Card: &card,
		}
		client.Pool.Broadcast <- changes
	}
}
