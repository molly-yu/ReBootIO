// Molly Yu
// Reboot.go
// Get & post setup from setup.go, reboot functions (all 3), checks results from results.go, admin permissions

package main

import (
	"bytes"
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"strconv"
	"strings"
	"syscall"
	"time"

	//"io/ioutil"

	"golang.org/x/sys/windows"
)

// __________________________________________________________________________reboot________________________________________________________________
func reboot() {
	fmt.Println("Getting")
	setup := getInfo() // get setup
	if setup.Status != "noReboot" { // run reboot
		cameras := getCameras() // get info for cameras
		dt := time.Now()

		setup.IsPassed = CheckCameras(cameras) // check if cameras are connected and working; if not, return
		if !setup.IsPassed {
			setup.Status = "noReboot"
			postInfo(setup)
			return
		}

		// run reboot given that cameras all passed
		for setup.CurrentReboots < setup.MaxReboots {  // while not at max reboots

			if setup.Status == "noReboot" { // return if status is no reboot (either failed cameras or testing cancelled)
				return
			}

			fmt.Println("Status: ", setup.Status)
			fmt.Println("currentReboots: ", setup.CurrentReboots)
			fmt.Println("maxReboots: ", setup.MaxReboots)
			fmt.Println("isPassed: ", setup.IsPassed)

			if setup.Status == "SRX-Pro" { // reset srx-pro through date/time change

				tm := setup.Date
				 
				// parse time interval
				interval := setup.Time1
				i := strings.Index(interval, ":") // index of ":"
				a := []rune(interval)
				min := string(a[0:i])
				sec := string(a[i+1 : len(a)])
				m, err := strconv.Atoi(min)
				if err != nil {
					fmt.Printf("Error: %s", err.Error())
				}
				s, er := strconv.Atoi(sec)
				if er != nil {
					fmt.Printf("Error: %s", er.Error())
				}

				time.Sleep(time.Duration(s) * time.Second + time.Duration(m) * time.Minute) // we can replace this with time interval later on

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
				// fmt.Println((dt).Format("01-02-2006 15:04:05.00 Mon"))

			} else if setup.Status == "Switch" { // reset switches through http request

				ip := setup.SwitchIP
				user := setup.User
				pass := setup.Pass

				// parse time interval
				interval := setup.Time2
				i := strings.Index(interval, ":") // index of ":"
				a := []rune(interval)
				min := string(a[0:i])
				sec := string(a[i+1 : len(a)])
				m, err := strconv.Atoi(min)
				if err != nil {
					fmt.Printf("Error: %s", err.Error())
				}
				s, err2 := strconv.Atoi(sec)
				if err2 != nil {
					fmt.Printf("Error: %s", err2.Error())
				}

				time.Sleep(time.Duration(s) * time.Second + time.Duration(m) * time.Minute) // sleep for time interval

				rebootSwitch(ip, user, pass)
				// err := rebootSwitch(ip, user, pass)
				// if err != nil {
				// 	fmt.Printf("Error: %s", err.Error())
				// }
			} else if setup.Status == "UIO8" {
				rebootUIO8(setup.UIO8IP, setup.OnTime, setup.OffTime)
			}
			fmt.Println("Rebooted")
			setup.CurrentReboots++
			if setup.CurrentReboots == setup.MaxReboots {
				setup.Status = "noReboot"
			}


			// wait 10 s to allow cameras to reload
			time.Sleep(10 * time.Second)

			// also call results function here and redefine isPassed, checks all cameras

			setup.IsPassed = CheckCameras(cameras)

			if !setup.IsPassed {
				setup.Status = "noReboot"
				postInfo(setup)
			} else {
				postInfo(setup)
			}
		}
	}
}

//____________________________________________________________________________CheckCameras_______________________________________________________
func CheckCameras(cameras []camera) bool {
	isPassed := true
	for i := 0; i < len(cameras); i++ { // check cameras
		ip := cameras[i].Ip
		cameras[i].Ping = pingCamera(ip)
		cameras[i].Video = videoCamera(ip)
		postCamera(cameras[i])
		if !cameras[i].Ping || !cameras[i].Video{
			isPassed = false
			fmt.Println("Camera fail")
		}
	}
	return isPassed
}

// ______________________________________________________________________setSystemDate && setSystemTime__________________________________________

func SetSystemDate(newTime time.Time) error { // Set the system date to desired reboot date
	// _, lookErr := exec.LookPath("date")
	// if lookErr != nil {
	// 	fmt.Printf("Date binary not found, cannot set system date: %s\n", lookErr.Error())
	// 	return lookErr
	// } else {
	dateString := newTime.Format("2006-01-02") // convert date to string
	fmt.Printf("Setting system date to: %s\n", dateString)
	args := []string{"/C", "date", dateString}
	cmd := exec.Command("cmd.exe", args...) // cmd
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
	timeString := newTime.Format("15:04:05.00") // convert time to string
	// converting timezone
	a := []rune(timeString)
	hour := string(a[0:2])
	rest := string(a[len(a)-9 : len(a)])
	i, err := strconv.Atoi(hour)
	if err != nil {
		fmt.Printf("Error: %s", err.Error())
	}
	if i >= 4 {
		i -= 4
	} else {
		i = i + 20
	}
	hour = strconv.Itoa(i)
	timeString = hour + rest

	fmt.Printf("Setting system time to: %s\n", timeString)
	args := []string{"/C", "time", timeString}
	cmd := exec.Command("cmd.exe", args...) // cmd
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	return cmd.Run()
}

//________________________________________________________________________rebootSwitch________________________________________________________________________________
func rebootSwitch(ip string, user string, pass string) { // Reboot switches through http
	uri := strings.Join([]string{"http://", ip, "/rb-cgi/reboot.cgi?user=", user, "&pwd=", pass}, "")
	res, err := http.Get(uri)
	if err != nil {
		fmt.Printf("Error: %s", err.Error())
	}
	// data, _ := ioutil.ReadAll(res.Body)
	res.Body.Close()
}

//_______________________________________________________________________rebootUIO8________________________________________________________________________________
func rebootUIO8(ip string, onTime int, offTime int) { 
	// turn controller ON
	onURI := strings.Join([]string{"http://", ip, "/Contl1.cgi?Setctrl=1&id=0.5887469878495948"},"")
	res1, err1 := http.Get(onURI)
	if err1 != nil {
		fmt.Printf("Error: %s", err1.Error())
	}
	// data, _ := ioutil.ReadAll(res.Body)
	res1.Body.Close()

	time.Sleep(time.Duration(onTime) * time.Second) // keep controller ON for onTime

	// turn controller OFF
	offURI := strings.Join([]string{"http://", ip, "/Contl1.cgi?Setctrl=0&id=0.3136638232170674"},"")
	res2, err2 := http.Get(offURI)
	if err2 != nil {
		fmt.Printf("Error: %s", err2.Error())
	}
	// data, _ := ioutil.ReadAll(res.Body)
	res2.Body.Close()

	time.Sleep(time.Duration(offTime) * time.Second) // keep controller OFF for offTime
}

//______________________________________________________________________admin______________________________________________________________________________________
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
