import { useContext } from "react"
import Web3Context from "../../context/Web3context";
const ConnectedAccount = ()=>{
    const {selectedAccount}=useContext(Web3Context);
    return (
        <div>
          <p>
            {selectedAccount ? selectedAccount : "Connect Account"}
          </p>
        </div>
      );

}
export default ConnectedAccount