import styled from "styled-components/macro"
import { Button } from "react-bootstrap"
import ButtonViewAccount from "../Buttons/ButtonViewAccount"
import { login, logout } from '../../../services/near'
import { useContext } from 'react'
import { AuthContext } from '../../../context/authContext'

const DetailCover = styled.div`
    display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    justify-self: flex-end;
    `
    
    const DetailFlex = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    gap: 5px;
    `
    const AccountDetails = () => {
        
        const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

    const login = () => {
        window.walletConnection.requestSignIn()
    }

    const logout = () => {
        window.walletConnection.signOut()
        setIsLoggedIn(false)
        /*global event, fdescribe*/
        /*eslint no-restricted-globals: ["error", "event", "fdescribe"]*/
        location.reload()
    }

    return (
        <DetailCover>
            <DetailFlex>
                {!isLoggedIn && <Button onClick={login}>Connect to NEAR wallet</Button>}
                {isLoggedIn &&
                    <>
                        <Button variant="info">{window.accountId}</Button>
                        <ButtonViewAccount></ButtonViewAccount>
                        <Button variant="dark" onClick={logout}> Logout</Button>
                    </>}
            </DetailFlex>
        </DetailCover>
    )
}

export default AccountDetails