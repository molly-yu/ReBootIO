import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
const Styles = styled.div`
height:100vh;
background: #56CCF2;  /* fallback for old browsers */
width:100%;
 border:0;
 z-index: 5;
`;


export default class Setup extends Component{
    render(){
        return(
            <Styles>
            <div className="Results" id="results">
                <h2>Results</h2>
            </div>
            </Styles>
        )
    }
}