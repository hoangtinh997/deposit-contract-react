import { Form, Button, Container, Row, Col, ButtonGroup, ToggleButton } from 'react-bootstrap';
import styled from 'styled-components';
import { useState } from 'react';

const StyledContainer = styled(Container)`
    margin: 9%;
    max-width: 800px;
`

const Pool = () => {

    const [radioValue, setRadioValue] = useState('0.2');

    const radios = [
        { lable: '0.2%', value: '0.2' },
        { lable: '0.3%', value: '0.3' },
        { lable: '0.6%', value: '0.6' },
    ];
    
    return (
        <>
        <StyledContainer>
            <Form>
                <h1>Create New Pool</h1>
                <Row className="justify-content-md-center">
                    <Col>
                        <select class="form-select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </Col>
                    <Col>
                        <select class="form-select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <div>
                            <span>Total fee</span>
                        </div>
                    </Col>
                    <Col>
                        <ButtonGroup>
                            {radios.map((radio, idx) => (
                                <ToggleButton
                                    key={idx}
                                    id={`radio-${idx}`}
                                    type="radio"
                                    variant={idx % 2 ? 'outline-info' : 'outline-info'}
                                    name="radio"
                                    value={radio.value}
                                    checked={radioValue === radio.value}
                                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                                >
                                    {radio.lable}
                                </ToggleButton>
                            ))}
                            <input value={radioValue}/>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Button className="mt-4" type="submit">Submit</Button>
            </Form>
        </StyledContainer>
        </>
    )
}

export default Pool