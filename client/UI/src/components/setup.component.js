import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
 import {fetchSetup, updateSetup} from '../actions/setupActions';
import styled from 'styled-components';
import {Row, Col, Form, Button} from 'react-bootstrap';
import { Checkbox } from 'semantic-ui-react';
import DateTimePicker from 'react-datetime-picker';
import emailjs from 'emailjs-com';
const { spawn } = require('child_process');

const Styles = styled.div`
  margin: 2em;
  .section {
    padding-top: 0.5em;
    padding-bottom: 2em;
  }
   .actions{
    padding-top: 2em;
  }

  Form.Row {
    padding-top: 1em;
  }
`;

class Setup extends Component{
  _isMounted = false;
  constructor(props){
    super(props);
    this.state = {
      status: this.props.setup.status,
      date:this.props.setup.date,
      currentReboots: this.props.currentReboots,
      maxReboots: this.props.setup.maxReboots,
      switchIP: this.props.setup.switchIP,
      user : this.props.setup.user,
      pass : this.props.setup.pass,
      UIO8IP: this.props.setup.UIO8IP,
      onTime:this.props.setup.onTime,
      offTime:this.props.setup.offTime,
      time1: this.props.setup.time1,
      time2: this.props.setup.time2,
      email:this.props.setup.email,
      isPassed:this.props.setup.isPassed,

      pids: []
    }

    this.onChange=this.onChange.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.onSave= this.onSave.bind(this);
    this.onReset= this.onReset.bind(this);
    this.onStart= this.onStart.bind(this);
    this.sendEmail= this.sendEmail.bind(this);
  }
  
    componentDidMount(){
      this._isMounted = true;
      this.props.fetchSetup();
      if(this._isMounted){
      this.setState({
        status: this.props.setup.status,
        date:this.props.setup.date,
        currentReboots: this.props.currentReboots,
        maxReboots: this.props.setup.maxReboots,
        switchIP: this.props.setup.switchIP,
        user : this.props.setup.user,
        UIO8IP: this.props.setup.UIO8IP,
        pass : this.props.setup.pass,
        onTime:this.props.setup.onTime,
        offTime:this.props.setup.offTime,
        time1: this.props.setup.time1,
        time2: this.props.setup.time2,
        email:this.props.setup.email,
        isPassed:this.props.setup.isPassed,
      })
    }
    }

    componentWillUnmount(){
      this._isMounted = false;
    }

    handleChange = date => this.setState({ date })
    onChange(e) {
      this.setState({[e.target.name]: e.target.value}); // set the state of the particular component
    }

    onSave(){ // save form except status (no action yet)
      this.setState({status:'noReboot', isPassed:true})
      this.onSend();
    }

  onSend(){

    const newSetup =
        {
          status: this.state.status,
          date: this.state.date,
          currentReboots: 0,
          maxReboots:  parseInt(this.state.maxReboots, 10),
          switchIP: this.state.switchIP,
          user: this.state.user,
          pass: this.state.pass,
          UIO8IP: this.state.UIO8IP,
          onTime:parseInt(this.state.onTime,10),
          offTime:parseInt(this.state.offTime,10),
          time1:this.state.time1,
          time2:this.state.time2,
          email:this.state.email,
          isPassed: this.state.isPassed,
      };
      this.props.updateSetup(newSetup); // replaces fetch with createPost action
      window.test();
  }
  
  onReset(){ // sets status to no action
    console.log('Cancelling')
    this.setState({status:'noReboot'})
    this.onSend();
    var pid = this.state.pids.shift()
    console.log('Stopped: ', pid)
  }

  onStart(){ // starting 
      console.log('Starting: ', __dirname) // dirname is client\.gotron\assets
      this.setState({isPassed:true})
      this.onSend(); 
      if(this.state.pids.length >=1){ // if a process is already running, don't start another
        alert('Error: Too many processes. Please close the current process to continue.', 'Error')
      }
      else if (!this.handleValidation()){ // checks if everything is filled out
        alert('The form is incomplete. Cannot reboot.', 'Error');
    }
      else {
      const child = spawn(__dirname + '\\..\\..\\ui\\src\\Go\\Go.exe', {detached: true});
      this.state.pids.push(child.pid)

      child.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
      });
      
      child.on('exit', (code) => { // exits and removes current process from array
        console.log(`child process exited with code ${code}`);
        this.sendEmail(this.state.isPassed, code)
        this.onReset()
      });
      }
  }

  sendEmail(isPassed, code) {
    var template_params = {
    }
    var service_id = "outlook";
    var user_id = ""; // enter user id here

    if(isPassed && code==0){
      var template_id = "success"; // pass
    }
    else{
      var template_id = "success_clone"; // fail
    }
    emailjs.send(service_id, template_id, template_params, user_id)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  handleValidation(){ // whether or not form is valid
    let status=this.state.status
    let date = this.state.date
    let user=this.state.user
    let pass=this.state.pass
    let maxReboots=this.state.maxReboots
    let switchIP= this.state.switchIP
    let UIO8IP= this.state.UIO8IP
    let onTime=this.state.onTime
    let offTime=this.state.offTime
    let time1=this.state.time1
    let time2=this.state.time2
    let email=this.state.email
    let isValid = true

    if (status=='noReboot' || maxReboots == null || email == undefined || user == undefined || pass == undefined){
      isValid = false
    }
    else if (status == 'SRX-Pro' && (date == undefined || time1 == undefined)){
      isValid = false
    }
    else if (status=="Switch" && (switchIP == undefined ||time2 ==undefined)){
      isValid = false
    }
    else if (status=="UIO8" && (UIO8IP == undefined||onTime == null ||offTime ==null)){
      isValid = false
    }
    return isValid;
}

    render() {

        return(
            <Styles>
            <div className="Setup" id="setup">
                <h2>Reboot</h2>
                
                <Form > 
                <div className="section">
                <Form.Row><h3>User Information</h3></Form.Row>
                <Form.Row >
                  <Form.Group as={Col} sm="2">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="user" onChange={this.onChange} value={this.state.user} placeholder="i3admin" />
                  </Form.Group>
                  <Form.Group as={Col} sm="2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="pass" onChange={this.onChange} value={this.state.pass} placeholder="i3admin" />
                  </Form.Group>
                  <Form.Group as={Col} sm="2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" onChange={this.onChange} value={this.state.email} placeholder="Email" />
                  </Form.Group>
                  </Form.Row>
                  </div>

                {/* <Form.Row>
                  <Form.Group >
                    Selected value: <b>{this.state.status}</b>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group >
                    Current processes running: <b>{this.state.pids.length}</b>
                  </Form.Group>
                </Form.Row> */}
                <div className="section">

                <Form.Row><h3>Testing Configuration</h3></Form.Row>
                
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
                  <Form.Group as={Col} xl="2" sm="3">
                    <Form.Label>Reboot Date and Time </Form.Label>
                  <DateTimePicker
                  onChange={this.handleChange}
                  value={this.state.date}
                  />
                  </Form.Group>
                  <Form.Group as={Col} xl="3" sm="2">
                    <Form.Label>Time Interval</Form.Label>
                    <Form.Control name="time1" onChange={this.onChange} value={this.state.time1} placeholder="mm:ss" />
                  </Form.Group>
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
                  <Form.Group as={Col} sm="3">
                    <Form.Label>IP</Form.Label>
                    <Form.Control name="switchIP" onChange={this.onChange} value={this.state.switchIP} placeholder="192.168.0.0" />
                  </Form.Group>
                  <Form.Group as={Col} sm="2">
                    <Form.Label>Time Interval</Form.Label>
                    <Form.Control name="time2" onChange={this.onChange} value={this.state.time2} placeholder="mm:ss" />
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
                  <Form.Group as={Col} sm="3">
                    <Form.Label>IP</Form.Label>
                    <Form.Control name="UIO8IP" onChange={this.onChange} value={this.state.UIO8IP} placeholder="192.168.0.0" />
                  </Form.Group>
                  <Form.Group as={Col} sm="1">
                    <Form.Label>ON Time</Form.Label>
                    <Form.Control name="onTime" onChange={this.onChange} value={this.state.onTime} placeholder="seconds" />
                  </Form.Group>
                  <Form.Group as={Col} sm="1">
                    <Form.Label>OFF Time</Form.Label>
                    <Form.Control name="offTime" onChange={this.onChange} value={this.state.offTime} placeholder="seconds" />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} sm="1">
                    <Form.Label>Number of Reboots</Form.Label>
                    <Form.Control name="maxReboots" onChange={this.onChange} value={this.state.maxReboots} placeholder="0-1000" />
                  </Form.Group>
                </Form.Row>
                
                <Button variant="primary" type="button" onClick={() => this.onSave()}>
                  Save
                </Button>
                </div>

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