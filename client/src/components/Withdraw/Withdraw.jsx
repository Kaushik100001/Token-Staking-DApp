import { useContext, useRef } from "react";
import { ethers } from "ethers";
import Web3Context from "../../context/Web3context";
import StakingContext from "../../context/StakingContext";
import { toast } from "react-hot-toast";

const WithdrawStakeAmount = () => {
  const { stakingContract } = useContext(Web3Context);
  const withdrawStakeAmountRef = useRef();

  const withdrawStakeToken = async (e) => {
    e.preventDefault();
    const amount = withdrawStakeAmountRef.current.value.trim();

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid positive number.");
      return;
    }

    const amountToWithdraw = ethers.parseUnits(amount, 18).toString();

    try {
      const transaction = await stakingContract.withdrawStakedTokens(amountToWithdraw);
      await toast.promise(transaction.wait(), {
        loading: "Withdrawal in progress...",
        success: "Withdrawal successful 🌟",
        error: "Withdrawal failed ❌",
      });

      withdrawStakeAmountRef.current.value = "";
    } catch (error) {
      toast.error("Withdrawal failed. Please try again.");
      console.error(error.message);
    }
  };

  return (
    <form
      className="withdraw-form"
      onSubmit={withdrawStakeToken}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#34495e", // Dark background color
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
        Withdraw Token:
      </label>
      <input
        type="text"
        ref={withdrawStakeAmountRef}
        style={{
          padding: "10px",
          fontSize: "16px",
          marginBottom: "20px",
          border: "1px solid #2c3e50", // Border color
          borderRadius: "5px",
          color: "white", // Text color
        }}
      />
      <button
        onClick={withdrawStakeToken}
        type="submit"
        style={{
          padding: "12px",
          fontSize: "16px",
          fontWeight: "bold",
          backgroundColor: "#e74c3c", // Red color
          color: "#fff", // Text color
          borderRadius: "5px",
          cursor: "pointer",
          border: "none",
        }}
      >
        Withdraw Staked Token
      </button>
    </form>
  );
};

export default WithdrawStakeAmount;
