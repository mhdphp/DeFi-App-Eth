import React, { Component } from 'react';
import './Navbar.js';
import Navbar from './Navbar.js';
import Web3 from 'web3';


class App extends Component {

    // call the loadWeb3 function
    async componentDidMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    // connect the app to the blockchain
    async loadWeb3() {
       if(window.ethereum){
           window.web3 = new Web3(window.ethereum);
           await window.ethereum.enable();
           console.log('window.ethereum found - aka wallet')
       } else if(window.web3) {
           window.web3 = new Web3(window.web3.currentProvider);
           console.log('window.web3 found - aka wallet')
       } else {
           console.log('No Ethereum Provider Found! Check Metamask!')
       }
    }

    async loadBlockchainData() {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);
    }

   
    constructor(props) {
        super(props);
        this.state = {
            account : '0x0'
        }
    }

    render() {
        return(
            <div>
                <Navbar account={this.state.account}>
                    <div className='text-center'>
                        <h2> Sa Te Alerg </h2>
                    </div>
                </Navbar>
            </div>
        );
    }
}


export default App;