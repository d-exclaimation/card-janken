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
	. "github.com/d-exclaimation/battle-cards-multi/pkg/models"
	"log"
)

type Pool struct {
	Register chan *Client
	Unregister chan *Client
	Clients map[*Client] bool
	Broadcast chan *JankenChanges
	Store []*JankenChanges
}

func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client] bool),
		Broadcast:  make(chan *JankenChanges),
		Store:		make([]*JankenChanges, 0),
	}
}

func (pool *Pool) Start() {
	for {
		select {
			case client := <-pool.Register:
				// Add to clients, and show size
				pool.Clients[client] = true
				pool.Notify("User connected")
				break
			case client := <-pool.Unregister:
				// Delete from clients and show the current size
				delete(pool.Clients, client)
				pool.Notify("User disconnected")
				break
			case changes := <-pool.Broadcast:
				pool.Store = append(pool.Store, changes)
				if len(pool.Store) < 2 {
					break
				}
				pool.SendChanges()
		}
	}
}

func (pool *Pool) SendChanges() {
	for _, changes := range pool.Store {
		var res = NewSocketCard(changes.Card)
		pool.EmitTo(res, func(client *Client) bool {
			return changes.ID != client.ID
		})
	}

	pool.Store = make([]*JankenChanges, 0)
}

func (pool *Pool) Notify(message string) {
	fmt.Println("Size of Connection Pool: ", len(pool.Clients))

	// Emit messages to all connected clients
	var notif = &Notification{Message: message}
	pool.EmitAll(NewSocketNotification(notif), nil)
}

func (pool *Pool) EmitTo(obj interface{}, filter func(client *Client) bool) {
	for client, _ := range pool.Clients {
		if !filter(client) {
			continue
		}

		if err := client.Conn.WriteJSON(obj); err != nil {
			log.Println(err)
		}
	}
}

func (pool *Pool) EmitAll(obj interface{}, handleErr func(err error)) {
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