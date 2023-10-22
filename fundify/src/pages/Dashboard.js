import { Database } from "@tableland/sdk";
import { providers } from "ethers";
import { useState, useEffect } from "react";
import './Dashboard.css';
import { ethers } from "ethers";

// const provider = new providers.Web3Provider(window.ethereum);
// await provider.send("eth_requestAccounts", []);

// const signer = provider.getSigner();
// const db = new Database({ signer });
const db = new Database();
// const results = []
const {results} = await db.prepare("SELECT * FROM startups_11155111_83;").all();

const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "to",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amt",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "currency",
				"type": "string"
			}
		],
		"name": "newTransaction",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "add",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amt",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "curr",
				"type": "string"
			}
		],
		"name": "makeTransaction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllTransactions",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "to",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "amt",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "time",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "currency",
						"type": "string"
					}
				],
				"internalType": "struct FundRaising.Transaction[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const contractAddressScroll = "0xEf6bb08dbDb43cb6633F84876E34853309366bd9";
const contractAddressMantle = "0xbDe118fE19d8eD04cEaC35A22dA7759b576D76Ac";

export default function Dashboard() {
    const [amt, setAmt] = useState();
    const [selectedOption, setSelectedOption] = useState('Scroll');

    const handleChange = event => {
        setAmt(event.target.value);
    
        console.log('value is:', event.target.value);
        };
  
    const myStyleBox = {
      width: '300px',
      height: '30px',
      borderRadius: '5px',
      border: '1px solid #303245',
      padding: '5px',
      fontSize: '16px',
      marginLeft : '.9rem',
      background : '#303245',
      color: '#fff'
    };
  
    function donateNGO(address) {
      donate(address)
    } 

    async function donate(address){
      console.log(address.toString())
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract1 = new ethers.Contract(contractAddressScroll, abi, signer);
      const contract2 = new ethers.Contract(contractAddressMantle, abi, signer);
      
      const addressToValue = address;
      const ETHAmountValue = amt;
      console.log(addressToValue + " " + ETHAmountValue);
      // Calculate amount to transfer in wei
      const weiAmountValue = ethers.utils.parseEther(ETHAmountValue) //parseInt(ETHAmountValue) * 10**18

      // // Form the transaction request for sending ETH
      const transactionRequest = {
        to: addressToValue.toString(),
        value: weiAmountValue.toString()
      }

      // // Send the transaction and log the receipt
      const receipt = await signer.sendTransaction(transactionRequest);
      console.log(receipt);

      if(selectedOption === "Scroll"){
        const eth = "ETH"
        const tx = await contract1.makeTransaction(addressToValue, weiAmountValue, eth);
        console.log(tx);
      }else{
        const mnt = "MNT"
        const tx = await contract2.makeTransaction(addressToValue, weiAmountValue, mnt);
        console.log(tx);
      }
      
      alert("You have donated " + ETHAmountValue + " ETH to " + addressToValue + " wei !")
    }

    return (
    <div className="about">
      <center>
      <div>
      <p>Enter amount you wish to fund : </p> 
      <input type="text" style={myStyleBox} onChange={handleChange} value={amt} placeholder="Enter your amount in ETH" autoComplete="off"></input>
      </div>
      <br></br>
      <div>
      <label>
        <input
          type="radio"
          className="check"
          value="Scroll"
          checked={selectedOption === 'Scroll'}
          onChange={() => setSelectedOption('Scroll')}
        />
        Scroll
      </label>
      <label>
        <input
          type="radio"
          value="Mantle"
          className="check"
          checked={selectedOption === 'Mantle'}
          onChange={() => setSelectedOption('Mantle')}
        />
        Mantle
      </label>
      <div>
        Selected option: {selectedOption}
      </div>
    </div>
      </center>
    <br></br>
      <center>
      <div className="flex-container">
      {results.map((obj, index) => (
          <div className="card" key={index}>
            <b><p id="title_para">{obj.name} ID : {obj.id}</p></b>
            <div className="card-in">
              <p><b>Startup Idea:</b> {obj.description}</p>
              <p><b>Phone Number:</b> {obj.phone}</p>
              <p><b>Wallet Address:</b> {obj.address}</p>
            </div>
          <center><button class="button-19" onClick={() => donateNGO(obj.address)}>FUND HERE</button> </center>
          </div>
      ))}
      </div>
      </center>
  </div>
    )
}