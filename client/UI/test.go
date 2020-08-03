package main

import (
	"log"
	"net"
	"os"
)

//"io/ioutil"

func main() {
	command := ""
	ip := "192.0.0.10"
	c, err := net.Dial("tcp", ip)
	if err != nil {
		log.Println("UIO8 Dial Failed")
	}

	_, err = c.Write([]byte(command))
	if err != nil {
		println("Write to server failed:", err.Error())
		os.Exit(1)
	}
}
