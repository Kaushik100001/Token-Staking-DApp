import React from "react";
import ConnectedAccount from "./ConnectedAccount";
import ConnectedNetwork from "./ConnectedNetwork";

const Navigation = () => {
  return (
    <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px", backgroundColor: "#3498db", color: "#fff" }}>
      <ConnectedAccount />
      <div style={{ marginLeft: "20px" }}> {/* Adjust the margin based on your preference */}
        <ConnectedNetwork />
      </div>
    </nav>
  );
};

export default Navigation;
