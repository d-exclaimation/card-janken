//
//  randomchar.go
//  main
//
//  Created by d-exclaimation on 2:31 PM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

package randomkey

import (
	"math/rand"
	"strings"
	"time"
)

func RandomChar(useSymbol bool, useNumber bool) string {
	var allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
	if useNumber {
		allChars = "0123456789" + allChars
	}

	if useSymbol {
		allChars += "!@#$%^&*()-_+={}[]|:;<,>./?~`"
	}
	rand.Seed(time.Now().UnixNano())
	var (
		chars = strings.Split(allChars, "")
		index = rand.Intn(len(allChars))
	)
	return chars[index]
}


func RandomKey(length int, useSymbol bool, useNumber bool) string {
	var key = make([]string, length)
	rand.Seed(time.Now().UnixNano())
	for i := 0; i < length; i++ {
		key[i] = RandomChar(useSymbol, useNumber)
	}
	return strings.Join(key, "")
}
