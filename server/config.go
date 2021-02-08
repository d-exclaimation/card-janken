//
//  config.go
//  main
//
//  Created by d-exclaimation on 11:42 AM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

package main

import "os"

func getPort() string {
	var res = os.Getenv("PORT")
	if len(res) < 4 {
		return "8080"
	}
	return res
}
