import RewardRate from "./RewardRate";
import StakedAmount from "./StakedAmount";
import EarnedReward from "./EarnedReward";

const DisplayPanel = ()=>{
  return(   
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <StakedAmount />
      <RewardRate />
      <EarnedReward />
    </div>
  )
}
export default DisplayPanel;