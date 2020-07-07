import React, {Component} from 'react';
import styled from 'styled-components';
const Styles = styled.div`
text-align:left;
background: white;
width:100%;
 border:0;
 height:100vh;
 position:relative;
 z-index: 5;
`;

const Checkbox = props => (
    <input type="checkbox" {...props} />
)