import React,{Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
const JSMpeg = require('./jsmpeg.min.js');
//import './Modal.css';
//import Carousel1 from './Carousel1';
//var canvas = document.getElementById('canvas');
//const ws = new WebSocket('ws://127.0.0.1:3030')

export class Modal1 extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
        // const script = document.createElement('script');
        // script.src = __dirname + '\\..\\..\\ui\\src\\components\\jsmpeg.min.js'
        // document.body.appendChild(script);
    }

    render(){
        
        // ws.onopen = function(){
        //     console.log('ok');
        // }

        // const options ={
        //     name: 'name',
        //     streamUrl: 'rtsp://' + this.props.cameraip + '/stream1',
        //     wsPort:3030,
        //     ffmpegOptions: { // options ffmpeg flags
        //         '-stats': '', // an option with no neccessary value uses a blank string
        //         '-r': 30 // options with required values specify the value after the key
        //     }
        // }
        // stream = new Stream(options)
        // stream.start()

        return(
            <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Video Display
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>Displaying: {this.props.cameraip}</div>
        <div>
        <canvas id="canvas" width="100%" height="100%"></canvas>
        <div className="jsmpeg" data-url="'ws://localhost:8000" data-autoplay="true"></div>
            </div>

        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
        )
    }

}