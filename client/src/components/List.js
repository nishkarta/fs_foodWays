import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { partners } from '../dataDummy/partners'


function List(props) {
    return (
        <Container className='my-5'>
            <Card >
                <Row>
                    <Col><Card.Img variant="top" src={props.image} style={{ width: '4rem' }} /></Col>
                    <Col>                        <Card.Body>
                        <Card.Title>{props.name}</Card.Title>
                    </Card.Body>
                    </Col>
                </Row>
            </Card>
            {/* {partners.map((item, index) => (

                <div key={index}>
                    <List name={item.name} image={item.image} />
                </div>
            ))} */}
        </Container>

    );
}

export default List;