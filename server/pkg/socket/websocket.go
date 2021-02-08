//
//  websocket.go.go
//  socket
//
//  Created by d-exclaimation on 10:13 AM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

package socket

import (
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:    1024,
	WriteBufferSize:   1024,
	CheckOrigin: func(_ *http.Request) bool {
		return true
	},
}

func Upgrade(writer http.ResponseWriter, req *http.Request) (*websocket.Conn, error) {
	var socket, err = upgrader.Upgrade(writer, req, nil)
	if err != nil {
		log.Println(err)
		return socket, err
	}

	return socket, nil
}
