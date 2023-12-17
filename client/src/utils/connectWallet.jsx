import React from 'react'
import { ethers , Contract } from 'ethers';

import stakingABI from '../ABI/stakingABI.json'
import stakeTokenABI from '../ABI/stakeTokenABI.json'

const connectWallet = async () => {
  try{
 let [signer , provider , stakingContract , stakeTokenContract , chainId] = [null,null,null,null,null];
 if (window.ethereum == null) {
  throw new Error("MetaMask not installed; using read-only defaults")
 }
 const accounts = await window.ethereum.request({
  method:'eth_requestAccounts'
 })

 let chainIdHex= await window.ethereum.request({
  method:'eth_chainId'
 })
 chainId= parseInt(chainIdHex,16)

 let selectedAccount =accounts[0];
 if(!selectedAccount){
  throw new Error("No ethereum accounts available")
 } 

 provider = new ethers.BrowserProvider(window.ethereum);
 signer = await provider.getSigner();

 const stakingContractAddress="0x4E8F038E158E1F4cf2e824289DB2F8c57426F2E5"
 const stakeTokenContractAddress="0x643cc1f7ae6fadc8f62f2418aa2e885a6a4adfec"

 stakingContract= new Contract(stakingContractAddress,stakingABI,signer);
 stakeTokenContract=new Contract(stakeTokenContractAddress,stakeTokenABI,signer);

 return {provider,selectedAccount,stakeTokenContract,stakingContract,chainId}
 

}catch(error){
    console.log(error)
  }
}

export default connectWallet