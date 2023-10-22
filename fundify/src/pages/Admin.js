import React, { useState } from 'react';
import './Admin.css';
import { Database } from "@tableland/sdk";
import { providers } from "ethers";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'

// Connect to provider from browser and get accounts
const provider = new providers.Web3Provider(window.ethereum);
await provider.send("eth_requestAccounts", []);

// Pass the signer to the Database
const signer = provider.getSigner();
const db = new Database({ signer });

function Form() {
  const mintPkpWithRelayer = async (credentialResponse) => {
    console.log("Minting PKP with relayer...");

    const mintRes = await fetch(`aab4328cf79540ada27d3fbe55d3c14777da9a4d_conf/auth/google`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idToken: credentialResponse.credential
      }),
    });

    if (mintRes.status < 200 || mintRes.status >= 400) {
      alert("Uh oh, something's not quite right.");
      return null;
    } else {
      const resBody = await mintRes.json();
      alert("Successfully initiated minting PKP with relayer.")
      return resBody.requestId;
    }
  }

  const pollRequestUntilTerminalState = async (requestId) => {
    if (!requestId) {
      return;
    }

    const maxPollCount = 20;
    for (let i = 0; i < maxPollCount; i++) {
      console.log(`Waiting for auth completion (poll #${i+1})`);
      const getAuthStatusRes = await fetch(`aab4328cf79540ada27d3fbe55d3c14777da9a4d_conf/auth/status/${requestId}`);

      if (getAuthStatusRes.status < 200 || getAuthStatusRes.status >= 400) {
        console.log("Uh oh, something's not quite right.");
        return;
      }

      const resBody = await getAuthStatusRes.json();

      if (resBody.error) {
        // exit loop since error
        return;
      } else if (resBody.status === "Succeeded") {
        // exit loop since success
        console.log(resBody.pkpEthAddress);
        console.log(resBody.pkpPublicKey);
        return;
      }

      // otherwise, sleep then continue polling
      await new Promise(r => setTimeout(r, 15000));
    }

    // at this point, polling ended and still no success, set failure status
    console.log(`Hmm this is taking longer than expected...`)
  }

  const handleLoggedInToGoogle = async (credentialResponse) => {
    console.log("Logged in to Google");
    // setGoogleCredentialResponse(credentialResponse);
    const requestId = await mintPkpWithRelayer(credentialResponse);
    await pollRequestUntilTerminalState(requestId);
  };
  


  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone: '',
    description: '',
    address: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    createRecord();

    setFormData({
      id: '',
      name: '',
      phone: '',
      description: '',
      address: ''
    });
    alert("Added Successfully!")
  }

  const myStyle = {
    textAlign: 'center',
    fontSize : '20px',
    color : "#fff",
  };

  async function createRecord () {
    const info = await db
    .prepare("INSERT INTO startups_11155111_83 (id, name, phone, description, address) VALUES (?1, ?2, ?3, ?4, ?5)")
    .bind(formData.id, formData.name, formData.phone, formData.description, formData.address)
    .run();
    console.log(info);
  }

  return (
    <div>
      <br></br>
      <div className="form-container">
        <center><b><p style={myStyle}>Add Your Idea/Startup</p></b></center>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">Enter Your Unique ID:</label>
          <input className='inp' type="text" id="id" name="id" value={formData.id} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="name">Enter Your Startup Name:</label>
          <input className='inp' type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Mention Your Active Phone Number:</label>
          <input className='inp' type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Give A Description Of Your Startup:</label>
          <input className='inp' type="text" id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="address">Add Your Public Address:</label>
          <input className='inp' type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <button class="button-19" type="submit">Submit</button><br></br><br></br>
        <label align='left'>Not having pkp?</label>
        <center><GoogleLogin onSuccess={handleLoggedInToGoogle}/></center>
      </form>
    </div>
    </div>
  );
}

export default Form;