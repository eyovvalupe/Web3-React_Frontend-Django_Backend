import React, { useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import useUser from '../hooks/useUser';
import { ethers, getDefaultProvider, formatEther, isAddress } from 'ethers';
import { useState } from 'react';

export default function Home() {
    const [balance, setBalance] = useState(null);
    const [provider, setProvider] = useState(null);
    const { user } = useAuth();
    const getUser = useUser()

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
    }, []);

    useEffect(() => {
        if(user.wallet_address) {
            getBalance()
        }
    }, [provider, user]);

    const getBalance = async () => {
        if(provider) {
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

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className='container mt-3'>
            <h2>
                <div className='row'>
                    <div className="mb-12">
                        {user?.email !== undefined ? 'List user Ethereum balance' : 'Please login first'} {balance}
                    </div>
                </div>
            </h2>
        </div>
    )
}
