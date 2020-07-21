import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
 import {fetchCameras, deleteCamera} from '../actions/cameraActions';
import styled from 'styled-components';
import { Form, FormControl, InputGroup, Row, Col, Button, Table } from 'react-bootstrap';

const Styles = styled.div`
margin: 2em;
height:100vh;
width:100%;
 border:0;
 z-index: 5;
`;

class Results extends Component{
    constructor(props){
        super(props);
        this.onDeleteClick = this.onDeleteClick.bind(this)
    }


componentDidMount(){
    this.props.fetchCameras();
}

onDeleteClick (id) {
    console.log('Deleted ', id)
    this.props.deleteCamera(id);
};

    render(){
        const cameraItems= this.props.cameras.map(camera => 
            <tr>
                <td>{camera.ip}</td>
                <td>{camera.user}</td>
                <td>{camera.pass}</td>
                <td>{camera.ping}</td>
                <td>{camera.video}</td>
                <td><Button className="remove-btn" size="sm" onClick={this.onDeleteClick(camera.id)}>{camera.id}</Button></td>
            </tr>);

        return(
            <Styles>
            <div className="Results" id="results">
                    <h2>Testing Results: </h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>IP Address</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Ping</th>
                            <th>Video Loss</th>
                            <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cameraItems}
                            
                        </tbody>
                        </Table>
            </div>
            </Styles>
        )
    }
}


Results.propTypes = {
    fetchCameras: PropTypes.func.isRequired,
    cameras: PropTypes.array.isRequired,
    newCamera: PropTypes.object
}

const mapStateToProps = state => ({
     cameras:  state.cameras.items,
    newCamera: state.cameras.item
});

export default connect (mapStateToProps, {fetchCameras, deleteCamera})(Results);