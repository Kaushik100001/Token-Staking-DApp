import { useState,useContext,useEffect } from "react";
import {ethers} from "ethers"
import Web3Context from "../../context/Web3context";


const EarnedReward = () => {
  const { stakingContract, selectedAccount } = useContext(Web3Context);
  const [rewardVal, setRewardVal] = useState("0");

  useEffect(() => {
    const fetchStakeRewardInfo = async () => {
      try {
        //fetching earned amount of a user
        const rewardValueWei = await stakingContract.earned(selectedAccount);
        const rewardValueEth = ethers.formatUnits(rewardValueWei, 18).toString();
        const roundedReward = parseFloat(rewardValueEth).toFixed(2);
        setRewardVal(roundedReward);
      } catch (error) {
        console.error(error.message);
      }
    };

    const interval = setInterval(() => {
      stakingContract && fetchStakeRewardInfo();
    }, 20000);

    return () => clearInterval(interval);
  }, [stakingContract, selectedAccount]);

  return (
    <div
      style={{
        backgroundColor: "black",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        margin: "20px",
      }}
    >
      <p style={{ fontSize: "16px", marginBottom: "5px" }}>Earned Reward:</p>
      <span style={{ fontSize: "24px", fontWeight: "bold", color: "#3498db" }}>
        {rewardVal}
      </span>
    </div>
  );
};

export default EarnedReward;
