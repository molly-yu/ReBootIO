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
`;

class Setup extends Component{
  // constructor(props){
  //   super(props);

  //   this.onChange=this.onChange.bind(this);
  //   this.handleChange=this.handleChange.bind(this);
  //    this.onSubmit= this.onSubmit.bind(this);
  // }
  
    componentDidMount(){
      this.props.fetchSetup();
    }
      
    // componentDidUpdate(nextProps){ // receive a new post
    //   if(nextProps.setup){
            
    //   }
    // }


    // handleChange = date => this.setState({ date })
    onChange(e) {
      //this.setState({[e.target.name]: e.target.value}); // set the state of the particular component
      let data = {}
      data.name = e.target.name
      data.value = e.target.value
      this.props.saveValue(data)
    }

    onSubmit(e){
      e.preventDefault();
      const newSetup =
        {
          status:this.state.status,
          date: this.state.date,
          currentReboots: this.state.currentReboots,
          maxReboots: this.state.maxReboots,
          switchIP: this.state.switchIP,
          UIO8IP: this.state.UIO8IP,
          onTime:this.state.onTime,
          offTime:this.state.offTime,
          email:this.state.email,
          isPassed: this.state.isPassed,
      };
      this.props.updateSetup(newSetup); // replaces fetch with createPost action
      
  }

    render() {

        return(
            <Styles>
            <div className="Setup" id="setup">
                <h2>Reboot:</h2>
                <Form onSubmit={this.onSubmit}> 
                
                  <Form.Group >
                    Selected value: <b>{this.props.setup.status}</b>
                  </Form.Group>
                  <Form.Row >
                  <Form.Group as={Col}>
                    <Checkbox
                      radio
                      label='SRX-Pro'
                      name='status'
                      value= 'SRX-Pro'
                      checked={this.props.setup.status === 'SRX-Pro'}
                      onChange={this.onChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Reboot Date and Time</Form.Label>
                  <DateTimePicker
                  onChange={this.handleChange}
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
                      name='status'
                      value='Switch'
                      checked={this.state.status === 'Switch'}
                      onChange={this.onChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>IP</Form.Label>
                    <Form.Control name="ip" onChange={this.onChange} value={this.state.switchIP} defaultValue={this.props.setup.switchIP} placeholder="192.168.0.0" />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Time Interval</Form.Label>
                    <Form.Control name="interval" placeholder="hh:mm:ss" />
                  </Form.Group>

                </Form.Row>

                  <Form.Row>
                  <Form.Group as={Col}>
                    <Checkbox
                      radio
                      label='UIO8'
                      name='status'
                      value='UIO8'
                      checked={this.state.status === 'UIO8'}
                      onChange={this.onChange}
                    />
                  </Form.Group>


                  <Form.Group as={Col} >
                    <Form.Label>IP</Form.Label>
                    <Form.Control name="ip" onChange={this.onChange} value={this.state.UIO8IP} placeholder="192.168.0.0" />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>ON Time</Form.Label>
                    <Form.Control name="onTime" onChange={this.onChange} value={this.state.onTime} placeholder="hh:mm:ss" />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>OFF Time</Form.Label>
                    <Form.Control name="offTime" onChange={this.onChange} value={this.state.offTime} placeholder="hh:mm:ss" />
                  </Form.Group>

                  </Form.Row>

                  <Form.Row>
                  
                  <Form.Group as={Col}>
                    <Form.Label>Number of Reboots</Form.Label>
                    <Form.Control name="maxReboots" onChange={this.onChange} value={this.state.maxReboots} placeholder="0-1000" />
                  </Form.Group>
                </Form.Row>
                <Button variant="primary" type="submit">
                  Start
                </Button>
                <Button variant="outline-primary" type="reset">
                  Cancel
                </Button>

            </Form>
            
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
  setup: state.setup
});

export default connect (mapStateToProps, {fetchSetup, updateSetup})(Setup);