package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os/exec"
	"strconv"
	"strings"
	"time"
)

type camera struct {
	User  string `json:"user"`
	Pass  string `json:"pass"`
	Ip    string `json:"ip"`
	Ping  bool   `json:"ping"`
	Video bool   `json:"bool"`
}

var cameras = []camera{}

// _______________________________________________________________________getCameras_____________________________________________________________________________________
func getCameras() []camera {
	url := "http://localhost:3000/cameras"
	fmt.Println("URL:>", url)

	client := http.Client{
		Timeout: time.Second * 3, // Timeout after 3 seconds
	}

	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		log.Fatal(err)
	}

	req.Header.Set("Cameras", "Getting Cameras")

	res, getErr := client.Do(req)
	if getErr != nil {
		log.Fatal(getErr)
	}

	if res.Body != nil {
		defer res.Body.Close()
	}

	body, readErr := ioutil.ReadAll(res.Body)
	if readErr != nil {
		log.Fatal(readErr)
	}

	Cameras := cameras
	jsonErr := json.Unmarshal([]byte(body), &Cameras)
	if jsonErr != nil {
		log.Fatal(jsonErr)
	}

	fmt.Println()
	return Cameras
}

// ____________________________________________________________________postCameras____________________________________________________________________
func postCameras(Cameras []camera) {
	url := "http://localhost:3000/cameras"
	fmt.Println("URL:>", url)

	client := http.Client{
		Timeout: time.Second * 3, // Timeout after 3 seconds
	}

	jsonStr, _ := json.MarshalIndent(&Cameras, "", "	")

	req, err := http.NewRequest(http.MethodPut, url, bytes.NewBuffer(jsonStr))
	req.Header.Set("Header", "value")
	req.Header.Set("Content-Type", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	fmt.Println("response Status:", resp.Status)
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Println("response Body:", string(body))
}

// ______________________________________________________________________ping Camera_____________________________________________________________
func pingCamera(ip string) bool { // return true if passed
	args := []string{"/C", "ping", ip}
	cmd := exec.Command("cmd.exe", args...)
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	err := cmd.Run()
	if err != nil {
		fmt.Println(err.Error())
	}

	// finding the loss %
	res := out.String()
	i := strings.Index(res, "(")
	j := strings.Index(res, "%")
	runes := []rune(res)
	num := string(runes[(i + 1):j])
	loss, _ := strconv.Atoi(num)
	fmt.Println("% loss:", loss)
	if loss <= 50 {
		return true
	} else {
		return false
	}

}