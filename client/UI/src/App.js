import React, { Component } from "react";
import Navbar from "./components/navbar.component";
import {BrowserRouter as Router, Route} from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import Setup from "./components/setup.component";
import Results from "./components/results.component";
import './App.css';

export default class App extends Component {
    render() {
        return (
            <div>
            <Navbar/>
            <h1>Hello</h1>
            </div>
        );
    }
}