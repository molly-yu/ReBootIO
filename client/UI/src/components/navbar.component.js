import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';


const Styles = styled.div`
    .brand{
        text-align:left;
        color: #f2f2f2;
        font-size:17px;
    }
     .navbar{
        text-align:center;
        background: #213168;
        width: 100%;
        margin:0;
        border:0;
        height:55px;
        z-index:10;
    }
    .navbar-brand, .navbar-nav, .nav-link .navbar-collapse{
        float: left;
        color: #f2f2f2;
        &:hover{
            color: #A4CCEB;
            border-bottom: 3px;
        }
    }
    .navbar a {
        
        display: block;
        color: #f2f2f2;
        text-align: right;
        font-family: "Yu Gothic UI", sans-serif;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 17px;
        border-bottom: 3px solid transparent;
        &:hover {
            border-bottom: 3px;
            color: #A4CCEB;
          }
          
          &.active {
            border-bottom: 3px;
            color: #74AAD5;
          }
      }
      
      .tab{
        float: right;
      }
      
`;


export default class Navbar extends Component{

    render(){
        return(
            <Styles>
            <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="#">ARBSUtility</a>
                <div className="collapse navbar-collapse">
                    {/* <ul className="navbar-nav mr-auto">
                     <li className="navbar-item">
                            <Link to="/" className="nav-link">Setup</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/results" className="nav-link">Results</Link>
                        </li> 
                        
                    </ul> */}
                
                <Link to="/results" className="tab">Results</Link>
                <Link to="/cameras" className="tab">Cameras</Link>
                <Link to="/setup" className="tab">Setup</Link>
                
                </div>
            </nav>
            </Styles>
        );
    }

}