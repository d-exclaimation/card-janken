//
//  pool.go
//  socket
//
//  Created by d-exclaimation on 11:56 AM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

package socket

import (
	"fmt"
	"log"
)

type Pool struct {
	Register chan *Client
	Unregister chan *Client
	Clients map[*Client]bool
	Broadcast chan Message
}

func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan Message),
	}
}

func (pool *Pool) Start() {
	for {
		select {
			case client := <-pool.Register:
				// Add to clients, and show size
				pool.Clients[client] = true
				fmt.Println("Size of Connection Pool: ", len(pool.Clients))

				// Emit messages to all connected clients
				pool.Emit(Message{1, "New User Joined"}, nil)
				break
			case client := <-pool.Unregister:
				// Delete from clients and show the current size
				delete(pool.Clients, client)
				fmt.Println("Size of Connection Pool: ", len(pool.Clients))

				// Emit messages to all connected clients
				pool.Emit(Message{1, "A User disconnected"}, nil)
				break
			case message := <-pool.Broadcast:
				pool.Emit(message, func(err error) {
					log.Println(err)
					return
				})
		}
	}
}

func (pool *Pool) Emit(obj interface{}, handleErr func(err error)) {
	for client, _ := range pool.Clients {
		if err := client.Conn.WriteJSON(obj); err != nil {
			if handleErr == nil {
				log.Println(err)
				return
			}
			handleErr(err)
		}
	}
}