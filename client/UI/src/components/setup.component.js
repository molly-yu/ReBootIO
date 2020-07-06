import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
const Styles = styled.div`
height:100vh;
text-align:center;
background: #56CCF2;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #2F80ED, #56CCF2);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #2F80ED, #56CCF2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
width:100%;
 border:0;
 margin:0;
 margin-right:0;
 .table{
     background-color:white;
     width:60%;
     margin-left:auto; 
     margin-right:auto;
 }
`;


export default class Setup extends Component{
    render(){
        return(
            <Styles>
            <div className="Setup" id="setup">
                <h2>Setup</h2>
            </div>
            </Styles>
        )
    }
}