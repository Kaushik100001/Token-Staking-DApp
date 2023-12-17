
import './App.css'
import Wallet from './components/wallet/Wallet'
import Navigation from './components/Navigation/Navigation'
import DisplayPanel from './components/DisplayPanel/DisplayPanel'
import TokenApproval from './components/StakeToken/TokenApproval'
import StakeAmount from './components/StakeToken/StakeAmount'
import WithdrawStakeAmount from './components/Withdraw/Withdraw'
import ClaimReward from './components/ClaimReward/ClaimReward'
import { StakingProvider } from './context/StakingContext'

function App() {

  return (
    <>
      <Wallet>
        <Navigation/>
        <StakingProvider>
        <DisplayPanel/>
        <TokenApproval/>
        <StakeAmount/>
        <WithdrawStakeAmount/>
        </StakingProvider>
       
        
        <ClaimReward/>
      
      </Wallet>
    </>
  )
}

export default App
