package main

import (
	"encoding/hex"
	"fmt"
	"net"

	"github.com/google/gopacket"
	"github.com/google/gopacket/layers"
)

//"io/ioutil"

func main() {
	command := "0050c2e980bc88888888878808004500003746c5400080060000c000000fc000000af54b00e6a59b649200002ec95018fb3680430000aa550f013300002201000000058469"
	//command := "aa550f013300002201000000058469"
	//command := "aa550f01330000220101000005f2dd"
	//command := "aa550a01330000302990"
	//command := "aa550a01330000302990" // this is the ACK to open connection, response: aa550a330f00002540b2
	//ip := "192.0.0.10:80"

	// c, err := net.Dial("tcp", ip) // dial uio8 ip
	// if err != nil {
	// 	log.Println("UIO8 Dial Failed")
	// }

	packetData, err := hex.DecodeString(command) // convert command from string to hex format

	if err != nil {
		panic(err)
	}
	// fmt.Printf("% x", packetData)

	fmt.Println("Hex dump of real IP packet taken as input:\n")
	fmt.Println(hex.Dump(packetData))

	packet := gopacket.NewPacket(packetData, layers.LayerTypeIPv4, gopacket.Default)
	if ipLayer := packet.Layer(layers.LayerTypeIPv4); ipLayer != nil {
		ip := ipLayer.(*layers.IPv4)
		dst := ip.DstIP.String()
		src := ip.SrcIP.String()

		if tcpLayer := packet.Layer(layers.LayerTypeTCP); tcpLayer != nil {
			tcp := tcpLayer.(*layers.TCP)
			dst = fmt.Sprintf("%s:%d", dst, tcp.DstPort)
			src = fmt.Sprintf("%s:%d", src, tcp.SrcPort)
			fmt.Printf("From %s to %s\n\n", src, dst)

			ip.DstIP = net.ParseIP("8.8.8.8")

			options := gopacket.SerializeOptions{
				ComputeChecksums: true,
				FixLengths:       true,
			}

			tcp.SetNetworkLayerForChecksum(ip)

			newBuffer := gopacket.NewSerializeBuffer()
			err := gopacket.SerializePacket(newBuffer, options, packet)
			if err != nil {
				panic(err)
			}
			outgoingPacket := newBuffer.Bytes()

			fmt.Println("Hex dump of go packet serialization output:\n")
			fmt.Println(hex.Dump(outgoingPacket))

		}

	}

	// _, err = c.Write(data) // write data through tcp
	// if err != nil {
	// 	println("Write to server failed:", err.Error())
	// 	os.Exit(1)
	// }

	// reply := make([]byte, 256)
	// _, err = c.Read(reply) // read response from uio8 ip
	// if err != nil && err != io.EOF {
	// 	println("Read failed:", err.Error())
	// 	os.Exit(1)
	// }
	// fmt.Println("Reply: ", reply)
}
