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
	Register 	chan *Client
	Unregister 	chan *Client
	Clients 	map[*Client] bool
	Broadcast 	chan *JankenChanges
	Store 		[]*JankenChanges
	Rooms       map[*Pool]bool
}

func NewPool(parent map[*Pool]bool) *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client] bool),
		Broadcast:  make(chan *JankenChanges),
		Store:		make([]*JankenChanges, 0),
		Rooms:	 	parent,
	}
}

func (pool *Pool) Start() {
	for {
		select {
			case client := <-pool.Register:
				// Add to clients, and show size
				pool.Clients[client] = true

				// Notify when room is full
				if len(pool.Clients) == 2 {
					pool.Rooms[pool] = true
					log.Println("Full") // full
					pool.Notify("User connected")
				}
				break
			case client := <-pool.Unregister:
				// Delete all clients and delete self
				pool.DisconnectAll(client)
				pool.Notify("User disconnected")
				return
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
	// Loop through each changes, emit JSON
	for _, changes := range pool.Store {
		var res = NewSocketCard(changes.Card)
		pool.EmitTo(res, func(client *Client) bool {
			return changes.ID != client.ID
		})
	}

	// Empty the store
	pool.Store = make([]*JankenChanges, 0)
}

func (pool *Pool) Notify(message string) {
	fmt.Println("Size of Connection Pool: ", len(pool.Clients))

	// Emit messages to all connected clients
	var notif = &Notification{Message: message}
	pool.EmitAll(NewSocketNotification(notif), nil)
}

func (pool *Pool) EmitTo(obj interface{}, filter func(client *Client) bool) {
	for client := range pool.Clients {

		// Filter through given the filter function
		if !filter(client) {
			continue
		}
		if err := client.Conn.WriteJSON(obj); err != nil {
			log.Println(err)
		}
	}
}

func (pool *Pool) EmitAll(obj interface{}, handleErr func(err error)) {
	for client := range pool.Clients {
		if err := client.Conn.WriteJSON(obj); err != nil {

			// Emit JSON, do err handling with given handler
			if handleErr == nil {
				log.Println(err)
				return
			}
			handleErr(err)
		}
	}
}

func (pool *Pool) DisconnectAll(disconnector *Client) {
	delete(pool.Clients, disconnector)
	for client := range pool.Clients {

		// Close connection for all clients, and remove them
		_ = client.Conn.Close()
		delete(pool.Clients, client)
	}

	// Delete self from rooms and let garbage collector remove self
	delete(pool.Rooms, pool)
}