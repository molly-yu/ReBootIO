import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Form, FormControl, InputGroup, Row, Col, Button, Table } from 'react-bootstrap';
const Styles = styled.div`
margin: 2em;
height:100vh;
width:100%;
 border:0;
 z-index: 5;
`;

function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }
  

export default class Results extends Component{
    render(){
        return(
            <Styles>
            <div className="Results" id="results">
                    <h2>Testing Results: </h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>IP Address</th>
                            <th>Ping</th>
                            <th>Video Loss</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td>192.0.1</td>
                            <td>Yes</td>
                            <td>No</td>
                            </tr>
                            <tr>
                            <td>2</td>
                            <td>192.0.2</td>
                            <td>Yes</td>
                            <td>No</td>
                            </tr>
                        </tbody>
                        </Table>
            </div>
            </Styles>
        )
    }
}