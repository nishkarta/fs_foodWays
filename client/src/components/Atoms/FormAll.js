import React from 'react'
import { Form, FloatingLabel } from 'react-bootstrap'

function FormAll({ label, ...rest }) {
    return (
        <Form.Group >
            <FloatingLabel label={label} className='text-grey3 f-18' >
                <Form.Control autoFocus {...rest}></Form.Control>
            </FloatingLabel>
        </Form.Group>
    )
}

export default FormAll