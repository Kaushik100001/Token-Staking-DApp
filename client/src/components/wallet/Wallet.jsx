import React, { useState, useEffect } from 'react';
import connectWallet from '../../utils/connectWallet';
import Web3Context from '../../context/Web3context';
import { handleAccountChange } from '../../utils/handleAccountChange';
import { handleChainChange } from '../../utils/handleChainChange';

const Wallet = ({ children }) => {
  const [state, setState] = useState({
    provider: null,
    account: null,
    stakingContract: null,
    stakeTokenContract: null,
    chainId: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false); // Added state for connection status

  useEffect(() => {
    window.ethereum.on('accountsChanged', () => handleAccountChange(setState, setIsConnected));
    window.ethereum.on('chainChanged', () => handleChainChange(setState));
    return () => {
      window.ethereum.removeListener('accountsChanged', () => handleAccountChange(setState, setIsConnected));
      window.ethereum.removeListener('chainChanged', () => handleChainChange(setState));
    };
  }, []);

  const handleWallet = async () => {
    try {
      setIsLoading(true);
      const { provider, selectedAccount, stakingContract, stakeTokenContract, chainId } = await connectWallet();
      console.log(provider, selectedAccount, stakingContract, stakeTokenContract, chainId);
      setState({ provider, selectedAccount, stakingContract, stakeTokenContract, chainId });
      setIsConnected(true); // Set connection status to true after successful connection
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Connect-Wallet">
      <Web3Context.Provider value={state}>{children}</Web3Context.Provider>
      {!isConnected && <button onClick={handleWallet}>Connect Wallet</button>}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default Wallet;
