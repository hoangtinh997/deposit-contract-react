import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import React, { useState } from 'react';
import { getConfig } from '../../../services/config';
import { executeMultipleTransactions } from '../../../services/near';

const config = getConfig('testnet')

const Deposit = ({ item, tokens }) => {
  const [show, setShow] = useState(false);
  const [amountDeposit, setAmountDeposit] = useState('');
  const handleClose = () => setShow(false);
  const tokenContract = window.tokenContract;

  const handleShow = () => {
    setShow(true)
  };


  const configContract = 'dev-1646701624418-65193707375662'
  const ONE_YOCTO_NEAR = '0.000000000000000000000001';
  const decimals = item.decimals;
  const STORAGE_TO_REGISTER_WITH_FT = '0.1';

  const ftViewFunction = async (
    tokenId,
    { methodName, args }
  ) => {

    // console.log('config contract', args);
    return await window.walletConnection.account(args.account_id).viewFunction(tokenId, methodName, args);
  };

  const ftGetStorageBalance = async (
    tokenId
    // accountId = configContract
  ) => {
    // const s = await ftViewFunction(tokenId, {
    //   methodName: 'storage_balance_of',
    //   args: { account_id: configContract },
    // });
    // console.log('s', s)
    return await ftViewFunction(tokenId, {
      methodName: 'storage_balance_of',
      args: { account_id: configContract },
    });
  };

  const ftTransferCall = async () => {
    // console.log('s', data);
    await tokenContract.ft_transfer_call({
      receiver_id: config.contractName,
      amount: `${amountDeposit}00000000`,
      msg: ""
    },
    "300000000000000",
    "1"
    )
  }


  const deposit = async({ amount, id }) => {
    let transactions = [];

    transactions.unshift({
        receiverId: id,
        functionCalls: [
          {
            methodName: 'ft_transfer_call',
            args: {
              receiver_id: config.contractName,
              amount: (10**decimals * amount).toString(),
              msg: '',
            },
            amount: "1",
            gas: "100000000000000",
          },
        ],
    })
    if(tokens.filter(t => t.id === id).length === 0) {
        transactions.unshift({
            receiverId: id,
            functionCalls: [
                {
                    methodName: 'storage_deposit',
                    args: {
                        account_id: config.contractName 
                    },
                    amount: "0.0125",
                    gas: "100000000000000",
                },
            ]
        })
    }
    return executeMultipleTransactions(transactions)
  }
  const handleChange = (e) => {
    setAmountDeposit(e.target.value);
  }


  return (
    <>
      <Button variant="success" onClick={() => handleShow()}>
        Deposit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deposit {item.symbol} token to exchange</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">{item.symbol}</InputGroup.Text>
            <FormControl
              // aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              type="number"
              // value={amount}
              // onChange={e => setAmount(e.target.value)}
              onChange={handleChange}
            />

          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => deposit({ id: item.id, amount: item.balance })}>
            Deposit
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Deposit