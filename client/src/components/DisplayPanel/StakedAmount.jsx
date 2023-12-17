import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import { ethers } from 'ethers';
import Web3Context from '../../context/Web3context';
import StakingContext from '../../context/StakingContext';

const StakedAmount = () => {
  const { stakingContract, selectedAccount } = useContext(Web3Context);
  const { isReload } = useContext(StakingContext);
  const [stakedAmount, setStakedAmount] = useState('0');

  useEffect(() => {
    const fetchStakedBalance = async () => {
      try {
        const amountStakedWei = await stakingContract.stakedBalance(selectedAccount);
        const amountStakedEth = ethers.formatUnits(amountStakedWei.toString(), 18);
        setStakedAmount(amountStakedEth);
      } catch (error) {
       
        toast.error('Error fetching staked amount');
        console.error(error.message);
      }
    };
    stakingContract && fetchStakedBalance();
  }, [stakingContract, selectedAccount, isReload]);

  return (
    <div
      style={{
        backgroundColor: 'black',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        margin: '20px',
      }}
    >
      <p style={{ fontSize: '18px', marginBottom: '8px' }}>Staked Amount:</p>
      <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#e74c3c' }}>{stakedAmount}</span>
    </div>
  );
};

export default StakedAmount;
