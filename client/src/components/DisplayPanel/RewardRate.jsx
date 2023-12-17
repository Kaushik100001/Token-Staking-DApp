import { useState, useEffect, useContext } from "react";
import Web3Context from "../../context/Web3context";
import { ethers } from "ethers";

const RewardRate = () => {
  const { stakingContract, selectedAccount } = useContext(Web3Context);
  const [rewardRate, setRewardRate] = useState("0");

  useEffect(() => {
    const fetchRewardRate = async () => {
      try {
        const rewardRateWei = await stakingContract.REWARD_RATE();
        const rewardRateEth = ethers.formatUnits(rewardRateWei.toString(), 18);
        setRewardRate(rewardRateEth);
      } catch (error) {
        console.error(error.message);
      }
    };
    stakingContract && fetchRewardRate();
  }, [stakingContract, selectedAccount]);

  return (
    <div
      style={{
        backgroundColor: "black",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        margin: "20px",
      }}
    >
      <p style={{ fontSize: "18px", marginBottom: "8px" }}>Reward Rate:</p>
      <span style={{ fontSize: "24px", fontWeight: "bold", color: "#27ae60" }}>
        {rewardRate} token/sec
      </span>
    </div>
  );
};

export default RewardRate;
