import { useState, useEffect } from "react";
import {ethers} from "ethers";

const contractAddress = "0xbDe118fE19d8eD04cEaC35A22dA7759b576D76Ac";
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

export default function Mantle() {
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
    
      const tableRowStyle = {
        backgroundColor: '#393E46',
      };
    
      const tableRowStyle2 = {
        backgroundColor: '#222831',
      };
    
      const tableCellStyle = {
        padding: '10px',
        borderBottom: '2px solid black',
        textAlign: 'center',
      };
  
      
    useEffect(() => {
        getAllTransactions();
    }, []);
    return (
        <div className="about">
            <br></br>
            {/* <button onClick={getAllTransactions}>Get Mantle</button> */}
            <br></br>
            <center>
            <table className="table" style={myStyle}>
            <thead>
        <tr style={tableRowStyle2}>
            <th style={tableCellStyle}>FROM ADDRESS</th>
            <th style={tableCellStyle}>TO ADDRESS</th>
            <th style={tableCellStyle}>AMOUNT(in wei)</th>
            <th style={tableCellStyle}>TIME</th>
          </tr>
        </thead>
        <tbody>
          {
            arr.map(
              (info, ind) => {
                return (
                  <tr style={tableRowStyle}>
                    <td style={tableCellStyle}>{info[0]}</td>
                    <td style={tableCellStyle}>{info[1]}</td>
                    <td style={tableCellStyle}>{info[2].toNumber()}</td>
                    <td style={tableCellStyle}>{info[3].toNumber()}</td>
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