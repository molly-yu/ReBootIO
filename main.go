package main

import (
	"bytes"
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"strings"
	"syscall"
	"time"

	//"io/ioutil"

	"golang.org/x/sys/windows"
)

func main() {

	var input string
	fmt.Println("Reset: 1 - SRX-Pro. 2 - Switches")
	fmt.Scanln(&input)

	dt := time.Now()

	if input == "1" { // reset srx-pro through date/time change
		// get admin permissions if not administrator
		if !amAdmin() {
			runMeElevated()
		}
		time.Sleep(10 * time.Second)

		var tm string
		fmt.Println("Enter restart date and time in format 2006-01-02T15:04:05Z:")
		fmt.Scanln(&tm)

		//dt := time.Date(2020, 06, 17, 20, 34, 58, 65, time.UTC) // yyyy, mm, dd, hh, min, ss, ms
		dt, _ = time.Parse("2006-01-02T15:04:05Z", tm)
		fmt.Println(dt)

		err1 := SetSystemDate(dt)
		if err1 != nil {
			fmt.Printf("Error: %s", err1.Error())
		}
		err2 := SetSystemTime(dt)
		if err2 != nil {
			fmt.Printf("Error: %s", err2.Error())
		}
		// With short weekday (Mon)
		fmt.Println((dt).Format("01-02-2006 15:04:05.00 Mon"))

	} else if input == "2" { // reset switches through http request
		var ip string
		fmt.Println("Enter switch IP address:")
		fmt.Scanln(&ip)

		var user string
		fmt.Println("Enter username:")
		fmt.Scanln(&user)

		var pass string
		fmt.Println("Enter password:")
		fmt.Scanln(&pass)

		rebootSwitch(ip, user, pass)
		// err := rebootSwitch(ip, user, pass)
		// if err != nil {
		// 	fmt.Printf("Error: %s", err.Error())
		// }
	}

}

// Set the system date to desired reboot date
func SetSystemDate(newTime time.Time) error {
	// _, lookErr := exec.LookPath("date")
	// if lookErr != nil {
	// 	fmt.Printf("Date binary not found, cannot set system date: %s\n", lookErr.Error())
	// 	return lookErr
	// } else {
	dateString := newTime.Format("2006-01-02")
	fmt.Printf("Setting system date to: %s\n", dateString)
	args := []string{"/C", "date", dateString}
	cmd := exec.Command("cmd.exe", args...)
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	return cmd.Run()
	// if err != nil {
	// 	fmt.Println(fmt.Sprint(err) + ": " + stderr.String())
	// }
	// fmt.Println("Result: " + out.String())
	// return err
}

// Set the system time to desired reboot time
func SetSystemTime(newTime time.Time) error {
	timeString := newTime.Format("15:04:05.00")
	fmt.Printf("Setting system time to: %s\n", timeString)
	args := []string{"/C", "time", timeString}
	cmd := exec.Command("cmd.exe", args...)
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	return cmd.Run()
}

// Reboot switches through http
func rebootSwitch(ip string, user string, pass string) {
	uri := strings.Join([]string{"http://", ip, "/rb-cgi/reboot.cgi?user=", user, "&pwd=", pass}, "")
	res, err := http.Get(uri)
	if err != nil {
		fmt.Printf("Error: %s", err.Error())
	}

	// data, _ := ioutil.ReadAll(res.Body)
	res.Body.Close()

}

// get admin permissions
func runMeElevated() {
	verb := "runas"
	exe, _ := os.Executable()
	cwd, _ := os.Getwd()
	args := strings.Join(os.Args[1:], " ")

	verbPtr, _ := syscall.UTF16PtrFromString(verb)
	exePtr, _ := syscall.UTF16PtrFromString(exe)
	cwdPtr, _ := syscall.UTF16PtrFromString(cwd)
	argPtr, _ := syscall.UTF16PtrFromString(args)

	var showCmd int32 = 1 //SW_NORMAL

	err := windows.ShellExecute(0, verbPtr, exePtr, argPtr, cwdPtr, showCmd)
	if err != nil {
		fmt.Println(err)
	}
}

// determines if the current user is an administrator
func amAdmin() bool {
	_, err := os.Open("\\\\.\\PHYSICALDRIVE0")
	if err != nil {
		fmt.Println("You do not have administrator permissions.")
		return false
	}
	fmt.Println("You are currently in administrator mode.")
	return true
}
