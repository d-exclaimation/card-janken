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
	"github.com/gorilla/websocket"
	"log"
)

type Client struct {
	ID string
	Conn *websocket.Conn
	Pool *Pool
}

type Message struct {
	Type int  `json:"type"`
	Body string `json:"body"`
}

func (client *Client) Read() {
	defer func() {
		client.Pool.Unregister <- client
		_ = client.Conn.Close()
	}()

	for {
		messageType, data, err := client.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		var msg = Message{
			Type: messageType,
			Body: string(data),
		}

		client.Pool.Broadcast <- msg

		fmt.Printf("Received: %v+\n", msg)
	}
}
