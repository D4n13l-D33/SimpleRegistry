import logo from './logo.svg';
import './App.css';
import {ethers} from 'ethers';
import contractABI from './abi.json';

function App() {

  const contractAddress = "0x700208630f12EE196dA6067633c0850d41b48f79";

  async function requestAccount(){
    await window.ethereum.request({ method: 'eth_requestAccounts'});
  }
  
  async function updateName(){
    await requestAccount();
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const userInput = prompt("Enter New Entity Name");
    const transaction = await contract.updateName(userInput);
    await transaction.wait();
    console.log('Entity Name Updated');
  }

  async function updateAge(){
    await requestAccount();
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const userAge = prompt("Enter New User Age");
    const transaction = await contract.updateAge(userAge);
    await transaction.wait();
    console.log('Entity Age Updated!');
  }

  async function getEntityDetails(){
    await requestAccount();
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const transaction = await contract.getEntityDetails();
     console.log(`Entity Details are: ${transaction}`);
    
   }

  return (
    <div className="App">
      <header className="App-header">
      <div>
          <button onClick={updateName}> Update Name </button>
        </div>
      <div>
          <button onClick={updateAge}> Update Age </button>
      </div>
      
      <div>
          <button onClick={getEntityDetails}> Get Details </button>
      </div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
