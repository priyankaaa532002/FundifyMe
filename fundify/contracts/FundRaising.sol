//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

contract FundRaising {
    struct Transaction{
        address from;
        string to;
        uint amt;
        uint time;
        string currency;
    }

    Transaction[] transactions;
    
    event newTransaction(address indexed from, string to, uint amt, uint timestamp, string currency);

    function makeTransaction(string memory add, uint amt, string memory curr) public {
        Transaction memory temp = Transaction(msg.sender, add, amt, block.timestamp, curr);
        transactions.push(temp);
        emit newTransaction(msg.sender, add, amt, block.timestamp, curr);
    }

    function getAllTransactions() public view returns(Transaction[] memory){
        return transactions;
    }
}