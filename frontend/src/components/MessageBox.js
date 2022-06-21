import React from 'react';
import Alert from 'react-bootstrap/Alert';

export default function MessageBox(props) {
    return (
        // set alert to props.variant if exist else promps info
        <Alert variant={props.variant || 'info'}>{props.children}</Alert>
    )
}