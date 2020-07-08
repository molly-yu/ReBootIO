import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Form, FormControl, InputGroup, Row, Col, Button } from 'react-bootstrap';
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
                <h2>Search: </h2>
                
                <Form>
                    <Form.Row>
                        <Col>
                        <Form.Label>Camera IP Range: </Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon3">
                                192.168.0.
                            </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="basic-url" aria-describedby="basic-addon3" />
                            <InputGroup.Append>
                                <InputGroup.Text> to </InputGroup.Text>
                            </InputGroup.Append>
                            <FormControl id="basic-url" aria-describedby="basic-addon3" />
                        </InputGroup>
                        </Col>
                        <Col>
                        <Form.Group >
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="interval" placeholder="Username" />
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="interval" placeholder="Password" />
                        </Form.Group>
                        </Col>
                    </Form.Row>
                    </Form>


                    <Button variant="primary" onClick={handleClick}>
                    Search
                    </Button>

                    <h2>Testing Results: </h2>
                    <h3>IP Address </h3>
            </div>
            </Styles>
        )
    }
}