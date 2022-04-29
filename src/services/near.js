import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import { getConfig } from './config'

const nearConfig = getConfig(process.env.NODE_ENV || 'development')
export async function initContract() {
    const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))
    window.near = near;
    window.walletConnection = new WalletConnection(near)
    window.accountId = await window.walletConnection.getAccountId();
    window.contract = new Contract(window.walletConnection.account(), nearConfig.contractName, {
      viewMethods: [
        'storage_balance_of',
        'get_deposited_tokens', 
        'get_pool', 
        'get_pools', 
        'get_number_of_pools', 
        'get_pool_shares', 
        'get_pool_total_shares', 
        'get_account_balance'],
      changeMethods: ['new', 'create_new_pool', 'add_liquidity', 'storage_deposit', 'withdraw', 'add_simple_pool', 'remove_liquidity', 'register_tokens', 'swap'],
    })
}



