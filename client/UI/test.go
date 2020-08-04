package main

import (
	"encoding/hex"
	"fmt"
	"io"
	"log"
	"net"
	"os"
)

//"io/ioutil"

func main() {
	//command := "0050c2e980bc88888888878808004500003746c5400080060000c000000fc000000af54b00e6a59b649200002ec95018fb3680430000aa550f013300002201000000058469"
	//command := "aa550f013300002201000000058469"
	command := "aa550f01330000220101000005f2dd"
	//command := "aa550a01330000302990"
	ip := "192.0.0.10:80"

	c, err := net.Dial("tcp", ip) // dial uio8 ip
	if err != nil {
		log.Println("UIO8 Dial Failed")
	}

	data, err := hex.DecodeString(command) // convert command from string to hex format
	if err != nil {
		panic(err)
	}
	fmt.Printf("% x", data)

	_, err = c.Write(data) // write data through tcp
	if err != nil {
		println("Write to server failed:", err.Error())
		os.Exit(1)
	}

	reply := make([]byte, 256)
	_, err = c.Read(reply) // read response from uio8 ip
	if err != nil && err != io.EOF {
		println("Write to server failed:", err.Error())
		os.Exit(1)
	}
	fmt.Println("Reply: ", reply)
}
