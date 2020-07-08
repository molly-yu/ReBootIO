import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import {Row, Col, Form, Button} from 'react-bootstrap';
// import Checkbox from "./checkbox.component";
import { Checkbox } from 'semantic-ui-react';
// import DatePicker from './datepicker.component';
import DateTimePicker from 'react-datetime-picker';

const Styles = styled.div`
  margin: 2em;
`;

function handleClick(e) {
  e.preventDefault();
  console.log('The link was clicked.');
}

export default class Setup extends Component{
    state = {
      date: new Date(),
    }
    onChange = date => this.setState({ date })
    handleChange = (e, { value }) => this.setState({ value })

    render() {
        return(
            <Styles>
            <div className="Setup" id="setup">
                <h2>Reboot:</h2>
                <Form> 
                
                  <Form.Group >
                    Selected value: <b>{this.state.value}</b>
                  </Form.Group>
                  <Form.Row>
                  <Form.Group as={Col}>
                    <Checkbox
                      radio
                      label='SRX-Pro'
                      name='checkboxRadioGroup'
                      value='SRX-Pro'
                      checked={this.state.value === 'SRX-Pro'}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Reboot Date and Time</Form.Label>
                  <DateTimePicker
                  onChange={this.onChange}
                  value={this.state.date}
                />
                 </Form.Group>

                 <Form.Group as={Col}>
                    <Form.Label>Time Interval</Form.Label>
                    <Form.Control type="interval" placeholder="hh:mm:ss" />
                  </Form.Group>


                  {/*<Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group> */}
                  </Form.Row>

                <Form.Row>
                  <Form.Group as={Col}>
                    <Checkbox
                      radio
                      label='Switch'
                      name='checkboxRadioGroup'
                      value='Switch'
                      checked={this.state.value === 'Switch'}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>IP</Form.Label>
                    <Form.Control type="ip" placeholder="192.168.0.0" />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Time Interval</Form.Label>
                    <Form.Control type="interval" placeholder="hh:mm:ss" />
                  </Form.Group>

                </Form.Row>

                  <Form.Row>
                  <Form.Group as={Col}>
                    <Checkbox
                      radio
                      label='UIO8'
                      name='checkboxRadioGroup'
                      value='UIO8'
                      checked={this.state.value === 'UIO8'}
                      onChange={this.handleChange}
                    />
                  </Form.Group>


                  <Form.Group as={Col} >
                    <Form.Label>IP</Form.Label>
                    <Form.Control type="ip" placeholder="192.168.0.0" />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>ON Time</Form.Label>
                    <Form.Control type="ontime" placeholder="hh:mm:ss" />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>OFF Time</Form.Label>
                    <Form.Control type="offtime" placeholder="hh:mm:ss" />
                  </Form.Group>

                  </Form.Row>
            </Form>
            <Button variant="primary" onClick={handleClick}>
              Start
            </Button>
            <Button variant="outline-primary" onClick={handleClick}>
              Cancel
            </Button>

            </div>
            </Styles>
        );
    }
}