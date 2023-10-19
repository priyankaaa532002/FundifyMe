import {useState} from 'react';
import './boxes.css'
import image from './rocket.png'
export default function Home() {

    // const [walletAddress, setWalletAddress] = useState("");
    // async function requestAccount(){
    //     console.log('Request acc');
    //     if(window.ethereum){
    //         console.log('detected')

    //         try{
    //             const accounts = await window.ethereum.request({
    //                 method : "eth_requestAccounts",
    //             });
    //             setWalletAddress(accounts[0]);
    //             console.log(accounts);
    //         }catch(error){
    //             console.log('error');
    //         }
    //     }else{
    //         console.log('Metamask not there')
        // }
    // }
    return (
        <div>
            <br></br><br></br><br></br><br></br><br></br><br></br>
            <div className='title'>
                Revolutionizing Funding:<br></br>
                <span className='spann'>Fundify Me</span>, Where Blockchain Meets Dreams
            </div>
            {/* <img src={image}/> */}
            <ul className="circles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
            </ul>
        </div>
    )
}