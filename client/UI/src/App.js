import React, { Component } from "react";
import Navbar from "./components/navbar.component";
import {Switch, BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Setup from "./components/setup.component";
import Results from "./components/results.component";
import Cameras from "./components/cameras.component";
import './App.css';

export default class App extends Component {
    render() {
        return (
            <div>
            <Navbar/>
            <Switch> {/* The Switch decides which component to show based on the current URL.*/}
                <Route exact path='/setup' component={Setup}></Route>
                <Route exact path='/results' component={Results}></Route>
                <Route exact path='/cameras' component={Cameras}></Route>
            </Switch>
            </div>
        );
    }
}