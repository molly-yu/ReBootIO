// Molly Yu
// Setup.go
// Get & Put functions for setup


package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"
)

// _____________________________________________________________________________setup__________________________________________________________________
type setup struct { // struct defining state of setup
	Status         string `json:"status"` // must be upper case to be exported
	Date           string `json:"date"`
	CurrentReboots int    `json:"currentReboots"`
	MaxReboots     int    `json:"maxReboots"`
	SwitchIP       string `json:"switchIP"`
	User           string `json:"user"`
	Pass           string `json:"pass"`
	UIO8IP         string `json:"UIO8IP"`
	OnTime         int    `json:"onTime"`
	OffTime        int    `json:"offTime"`
	Email          string `json:"email"`
	IsPassed       bool   `json:"isPassed"`
}

// _______________________________________________________________________getInfo_______________________________________________________________________
func getInfo() setup { // retrieves setup info from server and returns setup
	url := "http://localhost:3000/setup"
	//fmt.Println("URL:>", url)

	client := http.Client{
		Timeout: time.Second * 3, // Timeout after 3 seconds
	}

	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		log.Fatal(err)
	}

	req.Header.Set("Setup", "Getting Setup")

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

	setup1 := setup{}
	jsonErr := json.Unmarshal([]byte(body), &setup1)
	if jsonErr != nil {
		log.Fatal(jsonErr)
	}

	return setup1
}

// ____________________________________________________________________postInfo____________________________________________________________________
func postInfo(Setup setup) {
	url := "http://localhost:3000/setup"
	//fmt.Println("URL:>", url)

	client := http.Client{
		Timeout: time.Second * 3, // Timeout after 3 seconds
	}

	jsonStr, _ := json.MarshalIndent(&Setup, "", "	")

	// var buffer bytes.Buffer
	// json.NewEncoder(&buffer).Encode(&Setup)

	// var jsonStr = []byte(`{"title":"Buy cheese and bread for breakfast."}`)
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
