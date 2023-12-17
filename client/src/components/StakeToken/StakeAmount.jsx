import { useContext, useRef } from "react";
import { ethers } from "ethers";
import Web3Context from "../../context/Web3context";
import StakingContext from "../../context/StakingContext";
import { toast } from "react-hot-toast";

const StakeAmount = () => {
  const { stakingContract } = useContext(Web3Context);
  const { isReload, setIsReload } = useContext(StakingContext);
  const stakeAmountRef = useRef();

  const stakeToken = async (e) => {
    e.preventDefault();
    const amount = stakeAmountRef.current.value.trim();
    
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid positive number.");
      return;
    }

    const amountToStake = ethers.parseUnits(amount, 18).toString();

    try {
      const transaction = await stakingContract.stake(amountToStake);
      await toast.promise(transaction.wait(), {
        loading: "Staking in progress...",
        success: "Staking successful 🚀",
        error: "Staking failed 🛑",
      });

      stakeAmountRef.current.value = "";
    } catch (error) {
      toast.error("Staking failed. Please try again.");
      console.error(error.message);
    }
  };

  return (
    <form
      onSubmit={stakeToken}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#2c3e50", // Dark background color
        borderRadius: "10px",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
        margin: "20px",
        maxWidth: "300px",
        margin: "auto",
      }}
    >
      <label
        style={{
          fontSize: "18px",
          marginBottom: "10px",
          color: "#ecf0f1", // Light text color
        }}
      >
        Enter Staked Amount:
      </label>
      <input
        type="text"
        ref={stakeAmountRef}
        style={{
          padding: "10px",
          fontSize: "16px",
          marginBottom: "20px",
          border: "1px solid #34495e", // Border color
          borderRadius: "5px",
          color: "white", // Text color
        }}
      />
      <button
        onClick={stakeToken}
        type="submit"
        style={{
          padding: "12px",
          fontSize: "16px",
          fontWeight: "bold",
          backgroundColor: "#27ae60",
          color: "#fff",
          borderRadius: "5px",
          cursor: "pointer",
          border: "none",
        }}
      >
        Stake Token
      </button>
    </form>
  );
};

export default StakeAmount;
