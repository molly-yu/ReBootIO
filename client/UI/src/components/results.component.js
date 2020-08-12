import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
 import {fetchCameras, deleteCamera} from '../actions/cameraActions';
import styled from 'styled-components';
import { Form, FormControl, InputGroup, Row, Col, Button, Table } from 'react-bootstrap';
import { Modal1 } from './modal.component';

const Styles = styled.div`
margin: 2em;
padding-right: 10em;
height:100vh;
 border:0;
 z-index: 5;
`;

class Results extends Component{
    constructor(props){
        super(props);
        this.state = {
            addModalShow: false,
            camip: null
        }
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

componentDidMount(){
    this.props.fetchCameras();
}

onDeleteClick = id => {
    console.log('Deleted ', id)
    this.props.deleteCamera(id);
};

    render(){
        const cameraItems= this.props.cameras.map(camera => 
            <tr>
                <td>{camera.ip}</td>
                <td>{camera.user}</td>
                <td>{camera.pass}</td>
                { camera.ping &&
                    <td><span >&#10003;</span></td>
                }
                { (!camera.ping) &&
                    <td><span >&#9747;</span></td>
                }
                { camera.video &&
                    <td><span >&#10003;</span></td>
                }
                { (!camera.video) &&
                    <td><span >&#9747;</span></td>
                }
                <td><Button className="remove-btn" size="sm" onClick={() => this.onDeleteClick(camera.id) }>{camera.id}</Button></td>
                <td><Button className="display-btn" size="sm" onClick={() => this.setState({addModalShow: true, camip: camera.ip}) }>View</Button></td>
                
            </tr>);

            let addModalClose = () => this.setState({addModalShow: false, camid:null});

        return(
            <Styles>
            <div className="Results" id="results">
                    <h2>Testing Results </h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>IP Address</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Ping</th>
                            <th>Video Loss</th>
                            <th>Delete</th>
                            <th>Display</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cameraItems}      
                        </tbody>
                        </Table>
                        <Modal1
                        show={this.state.addModalShow}
                        onHide={addModalClose}
                        cameraip= {this.state.camip}
                    />
                        
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