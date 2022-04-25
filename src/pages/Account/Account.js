import { Table, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import styled from 'styled-components';
import loading from '../../assets/loading-gift.gif'
import { TokenResults } from '../../context/TokenResultsContext';

const StyledLoading = styled.div`
    position: relative;
    margin: 0 auto;
    left: 45%;
`

const Account = () => {

    const {result} = useContext(TokenResults)

    return (
        <Container fluid>
            <h1>Account details</h1>
            {result ? result.length > 0 ? 
            <Table striped hover bordered responsive>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Symbol</th>
                        <th>Token name</th>
                        <th>Token ID</th>
                        <th>NEAR wallet</th>
                        <th>Decimals</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{++index}</td>
                                <td>{item.symbol}</td>
                                <td>{item.name}</td>
                                <td>{item.id}</td>
                                <td>{item.balanceAccount * (10 ** -item.decimals) ? item.balanceAccount * (10 ** -item.decimals) : 0}</td>
                                <td>{item.decimals}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>: (
                <StyledLoading>
                    <img src={loading}/>
                </StyledLoading>
            ) : null}
            
        </Container>
    )
}

export default Account