import { useState, useEffect } from "react";
import {ethers} from "ethers";
import './table.css';

const contractAddress = "0xEf6bb08dbDb43cb6633F84876E34853309366bd9";
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

export default function Scroll() {
    const [arr, set_array] = useState([]);

    async function getAllTransactions() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const sig = provider.getSigner();        
        const contract = new ethers.Contract(contractAddress, abi, sig);
        const tx1 = await contract.getAllTransactions();
        set_array(tx1)
        console.log(tx1)
      }

      const myStyle = {
        borderCollapse: 'collapse',
        borderSpacing: '0',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
      };

    useEffect(() => {
        getAllTransactions();
    }, []);
      

    return (
        <div className="about">
            <br></br>
            <br></br>
            <center>
            <table className="cotainer" style={myStyle}>
            <thead>
        <tr >
            <th>FROM ADDRESS</th>
            <th>TO ADDRESS</th>
            <th>AMOUNT(in wei)</th>
            <th>TIME</th>
          </tr>
        </thead>
        <tbody>
          {
            arr.map(
              (info, ind) => {
                return (
                  <tr>
                    <td>{info[0]}</td>
                    <td>{info[1]}</td>
                    <td>{info[2].toNumber()}</td>
                    <td>{info[3].toNumber()}</td>
                  </tr>
                )
              }
            )
          }
        </tbody>
    </table>
    </center>
    <br></br><br></br>
    </div>
    )
}
