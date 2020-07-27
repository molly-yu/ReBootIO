import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
 import {fetchSetup, updateSetup} from '../actions/setupActions';
import styled from 'styled-components';
import {Row, Col, Form, Button} from 'react-bootstrap';
import { Checkbox } from 'semantic-ui-react';
import DateTimePicker from 'react-datetime-picker';


const Styles = styled.div`
  margin: 2em;

   .actions{
    padding-top: 2em;
  }

  Form.Group {

  }
`;

class Setup extends Component{
  constructor(props){
    super(props);
    this.state = {
      status: this.props.setup.status,
      date:this.props.setup.date,
      currentReboots: this.props.currentReboots,
      maxReboots: this.props.setup.maxReboots,
      switchIP: this.props.setup.switchIP,
      user : 'i3admin',
      pass : 'i3admin',
      UIO8IP: this.props.setup.UIO8IP,
      onTime:this.props.setup.onTime,
      offTime:this.props.setup.offTime,
      email:this.props.setup.email,
      isPassed:this.props.setup.isPassed
    }
    this.onChange=this.onChange.bind(this);
    this.handleChange=this.handleChange.bind(this);
     this.onSubmit= this.onSubmit.bind(this);
     this.onReset= this.onReset.bind(this);
     this.onStart= this.onStart.bind(this);
  }
  
    componentDidMount(){
      this.props.fetchSetup();
      
    }

    handleChange = date => this.setState({ date })
    onChange(e) {
      this.setState({[e.target.name]: e.target.value}); // set the state of the particular component
      // let data = {}
      // data.name = e.target.name
      // data.value = e.target.value
      // this.props.saveValue(data)
    }

    onSubmit(e){ // save form except status (no action yet)
      e.preventDefault();
      const newSetup =
        {
          status:'noReboot',
          date: this.state.date,
          currentReboots: 0,
          maxReboots: parseInt(this.state.maxReboots, 10),
          switchIP: this.state.switchIP,
          user: this.state.user,
          pass: this.state.pass,
          UIO8IP: this.state.UIO8IP,
          onTime:this.state.onTime,
          offTime:this.state.offTime,
          email:this.state.email,
          isPassed: true,
      };
      this.props.updateSetup(newSetup); // replaces fetch with createPost action
      window.test();
  }

  onReset(e){ // sets status to no action
    this.setState({status:'noReboot'})
    this.onSubmit(e);
  }

  onStart(e){ // starting 
      const newSetup =
        {
          status:this.state.status,
          date: this.state.date,
          currentReboots: 0,
          maxReboots: parseInt(this.state.maxReboots, 10),
          switchIP: this.state.switchIP,
          user: this.state.user,
          pass: this.state.pass,
          UIO8IP: this.state.UIO8IP,
          onTime:this.state.onTime,
          offTime:this.state.offTime,
          email:this.state.email,
          isPassed: true,
      };
      this.props.updateSetup(newSetup); // replaces fetch with createPost action
      // var shell = window.WScript.CreateObject("WScript.Shell");
      // shell.Run("H:\\UIO8_Project\\client\\UI\\src\\src.exe");
     window.open('H:\\UIO8_Project\\client\\UI\\src\\src.exe')
  }

    render() {

        return(
            <Styles>
            <div className="Setup" id="setup">
                <h2>Reboot:</h2>
                <Form onSubmit={this.onSubmit}> 
                
                  <Form.Group >
                    Selected value: <b>{this.state.status}</b>
                  </Form.Group>
                  <Form.Row >
                  <Form.Group as={Col } sm="1" >
                    <Checkbox
                      radio
                      label='SRX-Pro'
                      name='status'
                      value= 'SRX-Pro'
                      checked={this.state.status === 'SRX-Pro'}
                      onChange={this.onChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col} sm="2">
                    <Form.Label>Reboot Date and Time</Form.Label>
                  <DateTimePicker
                  onChange={this.handleChange}
                  value={this.state.date}
                />
                 </Form.Group>

                 <Form.Group as={Col} sm="2">
                    <Form.Label>Time Interval</Form.Label>
                    <Form.Control type="interval" placeholder="hh:mm:ss" />
                  </Form.Group>


                  {/*<Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group> */}
                  </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} sm="1" >
                    <Checkbox
                      radio
                      label='Switch'
                      name='status'
                      value='Switch'
                      checked={this.state.status === 'Switch'}
                      onChange={this.onChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col} sm="2">
                    <Form.Label>IP</Form.Label>
                    <Form.Control name="switchIP" onChange={this.onChange} value={this.state.switchIP} placeholder="192.168.0.0" />
                  </Form.Group>

                  <Form.Group as={Col} sm="2">
                    <Form.Label>Time Interval</Form.Label>
                    <Form.Control name="interval" placeholder="hh:mm:ss" />
                  </Form.Group>

                </Form.Row>

                  <Form.Row>
                  <Form.Group as={Col} sm="1">
                    <Checkbox
                      radio
                      label='UIO8'
                      name='status'
                      value='UIO8'
                      checked={this.state.status === 'UIO8'}
                      onChange={this.onChange}
                    />
                  </Form.Group>


                  <Form.Group as={Col} sm="2">
                    <Form.Label>IP</Form.Label>
                    <Form.Control name="UIO8IP" onChange={this.onChange} value={this.state.UIO8IP} placeholder="192.168.0.0" />
                  </Form.Group>

                  <Form.Group as={Col} sm="1">
                    <Form.Label>ON Time</Form.Label>
                    <Form.Control name="onTime" onChange={this.onChange} value={this.state.onTime} placeholder="hh:mm:ss" />
                  </Form.Group>
                  <Form.Group as={Col} sm="1">
                    <Form.Label>OFF Time</Form.Label>
                    <Form.Control name="offTime" onChange={this.onChange} value={this.state.offTime} placeholder="hh:mm:ss" />
                  </Form.Group>

                  </Form.Row>

                  <Form.Row>
                  
                  <Form.Group as={Col} sm="1">
                    <Form.Label>Number of Reboots</Form.Label>
                    <Form.Control name="maxReboots" onChange={this.onChange} value={this.state.maxReboots} placeholder="0-1000" />
                  </Form.Group>
                </Form.Row>
                <Button variant="primary" type="submit">
                  Save
                </Button>

            </Form>
            <div className="actions">
              <Button variant="primary" type="button" onClick={this.onStart} >
                  Start
                </Button>
                <Button variant="outline-primary" type="button" onClick={this.onReset}>
                  Cancel
                </Button>
            </div>
            
            </div>
            </Styles>
        );
    }
}


Setup.propTypes = {
  fetchSetup: PropTypes.func.isRequired,
  updateSetup: PropTypes.func.isRequired,
  setup: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  setup: state.setup.item
});

export default connect (mapStateToProps, {fetchSetup, updateSetup})(Setup);