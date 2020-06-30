package main

import (
	"bytes"
	"fmt"
	"os"
	"os/exec"
	"strings"
	"syscall"
	"time"

	"golang.org/x/sys/windows"
)

func main() {

	// get admin permissions if not administrator
	if !amAdmin() {
		runMeElevated()
	}
	time.Sleep(10 * time.Second)

	dt := time.Now().Add(time.Hour * 24 * 5)
	err := SetSystemDate(dt)
	if err != nil {
		fmt.Printf("Error: %s", err.Error())
	}

	//With short weekday (Mon)
	fmt.Println((dt).Format("01-02-2006 15:04:05 Mon"))
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
		fmt.Println("admin no")
		return false
	}
	fmt.Println("admin yes")
	return true
}
