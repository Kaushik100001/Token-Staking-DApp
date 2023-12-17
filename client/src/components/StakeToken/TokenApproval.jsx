import React, { useContext, useRef } from "react";
import { ethers } from "ethers";
import Web3Context from "../../context/Web3context";
import { toast } from "react-hot-toast";

const TokenApproval = () => {
  const { stakeTokenContract, stakingContract } = useContext(Web3Context);
  const approvedTokenRef = useRef();

  const approveToken = async (e) => {
    e.preventDefault();
    const amount = approvedTokenRef.current.value.trim();

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid positive number.");
      return;
    }

    const amountToSend = ethers.parseUnits(amount, 18).toString();

    try {
      const transaction = await stakeTokenContract.approve(stakingContract.target, amountToSend);
      await toast.promise(transaction.wait(), {
        loading: "Transaction is pending...",
        success: "Transaction successful 👌",
        error: "Transaction failed 🤯",
      });

      approvedTokenRef.current.value = "";
    } catch (error) {
      toast.error("Token Approval Failed");
      console.error(error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#34495e",
        borderRadius: "10px",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
        margin: "20px",
        maxWidth: "300px",
        margin: "auto",
      }}
    >
      <form onSubmit={approveToken} style={{ width: "100%" }}>
        <label
          htmlFor="approvedToken"
          style={{ fontSize: "18px", marginBottom: "10px", color: "white" }}
        >
          Token Approval:
        </label>
        <input
          type="text"
          id="approvedToken"
          ref={approvedTokenRef}
          placeholder="Enter amount"
          style={{
            padding: "10px",
            fontSize: "16px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "#3498db",
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer",
            border: "none",
          }}
        >
          Token Approval
        </button>
      </form>
    </div>
  );
};

export default TokenApproval;
