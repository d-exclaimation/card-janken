//
//  main.go.go
//  multiple-sockets
//
//  Created by d-exclaimation on 9:50 AM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

package main

import (
	"fmt"
	"github.com/d-exclaimation/battle-cards-multi/pkg/socket"
	"log"
	"net/http"
)

func main() {
	routes()
	log.Fatalln(http.ListenAndServe(":" + getPort(), nil))
}

func routes() {
	var rooms = make(map[*socket.Pool]bool)

	http.HandleFunc("/ws", func(writer http.ResponseWriter, req *http.Request) {
		serveSocket(rooms, writer, req)
	})
}

func serveSocket(rooms map[*socket.Pool]bool, writer http.ResponseWriter, req *http.Request) {
	// Get a available room or create a new one
	var pool = availableSlot(rooms)

	// Upgrade connection from http to tcp
	var conn, err = socket.Upgrade(writer, req)
	if err != nil {
		_, _ = fmt.Fprintf(writer, "%v\n", err)
	}

	// Create a new client using conn and pool, register client to pool
	var client = socket.NewClient(conn, pool)
	pool.Register <- client

	client.Read()
}

func availableSlot(rooms map[*socket.Pool]bool) *socket.Pool {
	for pool, full := range rooms {
		if !full {
			return pool
		}
	}

	// Create a new pool, save it and notify
	var newPool = socket.NewPool(rooms)
	go newPool.Start()
	rooms[newPool] = false
	log.Println("New Pool") // Test 1
	return newPool
}
