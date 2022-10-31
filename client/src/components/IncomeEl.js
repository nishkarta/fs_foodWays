import React from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import { income } from '../dataDummy/income'

function IncomeEl() {
    return (
        <div className="container-grey h-page">
            <Container className='p-5 ff-avenir'>
                <h3 className='mb-4 mt-3 ff-abhaya fw-extra-bold f-36 text-center text-lg-start'>Income Transaction</h3>

                <Table responsive bordered className='bg-white ff-inter f-14' style={{ borderColor: '#828282' }}>
                    <thead>
                        <tr style={{ background: '#d4cfcf' }}>
                            <th>No</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Products Order</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>

                        {income.map((data, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>

                                <td >{data.name}</td>
                                <td >{data.address}</td>
                                <td >{data.products}</td>
                                <td className={data.className} >{data.status}</td>
                                <td className='d-flex justify-content-center' >
                                    {data.follup !== '' ? <img src={data.follup} alt="" /> : (
                                        <>
                                            <Button variant="danger">cancel</Button>
                                            <Button variant="success" className="ms-2">approve</Button>
                                        </>
                                    )}

                                </td>

                            </tr>
                        ))}

                    </tbody>
                </Table>

            </Container>
        </div >
    )
}

export default IncomeEl