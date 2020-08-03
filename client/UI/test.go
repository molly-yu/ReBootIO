package main

import (
	"log"

	"github.com/nareix/joy4/format/rtsp"
)

//"io/ioutil"

func main() {
	uri := "rtsp://10.10.1.106/stream1"
	c, err := rtsp.Dial(uri)
	if err != nil {
		log.Println("rtsp dial failed")
		return
	}
	playerr := c.Play()
	if playerr != nil {
		log.Println("play failed")
	}
}
