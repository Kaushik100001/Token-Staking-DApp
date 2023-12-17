import { useContext } from "react"
import Web3Context from "../../context/Web3context";

const ConnectedNetwork = ()=>{
   const {chainId}=useContext(Web3Context);
   if(chainId===null){
      return <p className="network">Not connected</p>;
   }
   else if (chainId === 5) {
      return <p className="network">Goerli</p>;
    } else {
      return <p className="network">Change to Goerli</p>;
    }
}
export default ConnectedNetwork