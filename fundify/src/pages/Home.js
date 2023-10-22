import {useState} from 'react';
import './boxes.css'
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
            Empowering Dreams with Blockchain:<br></br><span className='spann'>Fundify Me</span>, Your Path to Funding Success!
            <div className='sub'>
            Discover the most inspiring ideas that fuel your passion and support them to reach new heights, or step up and be the visionary who shares your own innovation!
            <br></br><br></br>
            <button className='button-19'>GET STARTED</button>
            </div>
            </div>
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