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
	randomkey "github.com/d-exclaimation/battle-cards-multi/pkg/key"
	"github.com/d-exclaimation/battle-cards-multi/pkg/socket"
	"log"
	"net/http"
)

func main() {
	routes()
	log.Fatalln(http.ListenAndServe(":" + getPort(), nil))
}

func routes() {
	var pool = socket.NewPool()
	go pool.Start()

	http.HandleFunc("/ws", func(writer http.ResponseWriter, req *http.Request) {
		serveSocket(pool, writer, req)
	})
}

func serveSocket(pool *socket.Pool, writer http.ResponseWriter, req *http.Request) {
	if len(pool.Clients) >= 2 {
		writer.WriteHeader(http.StatusLocked);
		return
	}

	var conn, err = socket.Upgrade(writer, req)
	if err != nil {
		_, _ = fmt.Fprintf(writer, "%+V\n", err)
	}

	var client = &socket.Client{
		ID:   randomkey.RandomKey(40, false, true),
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()
}
