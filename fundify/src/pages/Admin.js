import React, { useState } from 'react';
import './Admin.css';
import { Database } from "@tableland/sdk";
import { providers } from "ethers";

// Connect to provider from browser and get accounts
const provider = new providers.Web3Provider(window.ethereum);
await provider.send("eth_requestAccounts", []);

// Pass the signer to the Database
const signer = provider.getSigner();
const db = new Database({ signer });

function Form() {
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
    fontSize : '30px',
    color : "#3C6255",
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
    <div className="form-container">
        <center><b><p style={myStyle}>Add New Relief Request</p></b></center>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Location</label>
          <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="address">Public Address</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <button class="button-19" type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default Form;