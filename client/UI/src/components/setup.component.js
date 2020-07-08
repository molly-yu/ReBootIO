import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
// import Checkbox from "./checkbox.component";
import { Form, Checkbox } from 'semantic-ui-react';

const Styles = styled.div`
text-align:left;
background: white;
width:100%;
 border:0;
 height:100vh;
 position:relative;
 z-index: 5;
`;

// const items = [
//     '1',
//     '2',
//     '3'
// ];

export default class Setup extends Component{
    state = {}
    handleChange = (e, { value }) => this.setState({ value })
    // componentDidMount = () => {
    //     this.selectedCheckboxes = new Set();
    // }
    // // state = { checked: false }

    // // handleCheckboxChange = event => {
    // //     this.setState({ checked: event.target.checked })
    // // }

    // toggleCheckbox = label => {
    //     if (this.selectedCheckboxes.has(label)){
    //         this.selectedCheckboxes.delete(label);
    //     } else {
    //         this.selectedCheckboxes.add(label);
    //     }
    // }

    // handleFormSubmit = formSubmitEvent => {
    //     formSubmitEvent.preventDefault();

    //     for (const checkbox of this.selectedCheckboxes){
    //         console.log(checkbox, ' is selected');
    //     }
    // }

    // createCheckbox = label => {
    //     <Checkbox
    //     label = { label }
    //     handleCheckboxChange = { this.toggleCheckbox }
    //     key = { label }
    //     />
    // }
    
    // createCheckboxes = () => {
    //     items.map(this.createCheckbox)
    // }


    render() {
        return(
            <Styles>
            <div className="Setup" id="setup">
                <h2>Reboot:</h2>
                {/* // <label>
                // <Checkbox */}
                {/* // checked={this.state.checked}
                // onChange={this.handleCheckboxChange}/>
                // <span style={{marginLeft:8}}>1 - </span>
                // </label> */}
                {/* <div className="col-sm-12">

                <form onSubmit={this.handleFormSubmit}>
                {this.createCheckboxes()}

                <button className="btn btn-default" type="submit">Save</button>
                </form>

                </div> */}
                <Form>
        <Form.Field>
          Selected value: <b>{this.state.value}</b>
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label='Choose this'
            name='checkboxRadioGroup'
            value='this'
            checked={this.state.value === 'this'}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label='Or that'
            name='checkboxRadioGroup'
            value='that'
            checked={this.state.value === 'that'}
            onChange={this.handleChange}
          />
        </Form.Field>
      </Form>
            </div>
            </Styles>
        );
    }
}