import React, { useEffect } from 'react'
import useAuth from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';
import { ethers, getDefaultProvider, formatEther, isAddress } from 'ethers';
import { useState } from 'react';

export default function Balance() {
    const [balance, setBalance] = useState(null);
    const [walletAddress, setWalletAddress] = useState('');
    const [provider, setProvider] = useState(null);
    const { user } = useAuth();
    const getUser = useUser()

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        if(user.wallet_address) {
            const initProvider = () => {
            // Connect to the Ethereum network
            const provider = getDefaultProvider('mainnet'); // Use 'ropsten', 'rinkeby', etc. for testnets
            setProvider(provider);
            };
            initProvider();
        }

        if(user.wallet_address) {
            getBalance()
        }
    }, [user]);

    useEffect(() => {
        if(user.wallet_address) {
            getBalance()
        }
    }, [provider]);

    const getBalance = async () => {
        if(provider) {
            console.log('user address = ', user?.wallet_address)
            if (!isAddress(user?.wallet_address)) {
                alert('Please enter a valid wallet address');
                return;
            }
            
            try {
            // Fetch the balance
            const balance = await provider.getBalance(user?.wallet_address);

            // Convert balance from Wei to Ether
            const balanceInEther = formatEther(balance);

            // Update state
            setBalance(balanceInEther);
            } catch (error) {
            console.error('Error fetching balance:', error);
                alert('Error fetching balance');
            }
        }
    };

    return (
        <p>{balance}</p>
    )
}
