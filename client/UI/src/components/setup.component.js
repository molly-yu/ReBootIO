import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Checkbox from "./checkbox.component";
const Styles = styled.div`
text-align:left;
background: white;
width:100%;
 border:0;
 height:100vh;
 position:relative;
 z-index: 5;
`;

export default class Setup extends Component{
    state = { checked: false }

    handleCheckboxChange = event => {
        this.setState({ checked: event.target.checked })
    }

    render(){
        return(
            <Styles>
            <div className="Setup" id="setup">
                <h2>Reboot:</h2>
                <label>
                <Checkbox
                checked={this.state.checked}
                onChange={this.handleCheckboxChange}/>
                <span style={{marginLeft:8}}>Label Text</span>
                </label>
            </div>
            </Styles>
        )
    }
}