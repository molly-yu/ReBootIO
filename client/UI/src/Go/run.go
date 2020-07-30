package main

import "time"

func main() {
	// get admin permissions if not administrator
	if !amAdmin() {
		runMeElevated()
	}
	time.Sleep(10 * time.Second)

	reboot()

}
