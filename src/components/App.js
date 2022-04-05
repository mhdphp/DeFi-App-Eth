import React, { Component } from 'react';
import './Navbar.js';
import Navbar from './Navbar.js';
import Web3 from 'web3';
// import Tether.json from abis
import Tether from '../abis/Tether.json';
import RWD from '../abis/RWD.json';
import DecentralBank from '../abis/DecentralBank.json';


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
        this.setState({account:accounts[0]})
        console.log('account 0', accounts[0]);
        // get the network ID in our case Ganache network
        const networkId = await web3.eth.net.getId();
        //console.log(networkId);

        // Tether contract
        const tetherData = Tether.networks[networkId];
        // console.log(tetherData);
        if (tetherData) {
            // load the Tether contract
            const tether =  new web3.eth.Contract(Tether.abi,tetherData.address);
            // update the state
            this.setState({tether}); // {tether:tether} -> {tether}
            // run the balanceOf() function in tether contract - since
            // we are using web3 the syntax is a little different
            let tetherBalance = await tether.methods.balanceOf(this.state.account).call();
            // let tetherBalanceC = web3.utils.fromWei(tetherBalance);
            console.log({'balanceTether' : tetherBalance});
            // update the state variable
            this.setState({tetherBalance : tetherBalance.toString()});
        } else {
            window.alert('Error: Tether contract not deployed - no detected network');
        }

        // RWD contract
        const rwdData = RWD.networks[networkId];
        // console.log(rwdData);
        if (rwdData) {
            // load the EWD contract
            const rwd =  new web3.eth.Contract(RWD.abi,rwdData.address);
            // update the state
            this.setState({rwd});
            let rwdBalance = await rwd.methods.balanceOf(this.state.account).call();
            console.log({'balanceRWD' : rwdBalance});
            // update the state variable
            this.setState({rwdBalance : rwdBalance.toString()});
        } else {
            window.alert('Error: RWD contract not deployed - no detected network');
        }
        
        // DecentralBank contract
        const decentralBankData = DecentralBank.networks[networkId];
        // console.log(rwdData);
        if (decentralBankData) {
            // load the EWD contract
            const decentralBank =  new web3.eth.Contract(DecentralBank.abi,decentralBankData.address);
            // update the state
            this.setState({decentralBank});
            let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call();
            console.log({'stakingBalance' : stakingBalance});
            // update the state variable
            this.setState({stakingBalance : stakingBalance.toString()});
        } else {
            window.alert('Error: DecentralBank contract not deployed - no detected network');
        }
    }

   
    constructor(props) {
        super(props);
        this.state = {
            account : '0x0',
            tether: {},
            rwd: {},
            decentralBank: {},
            tetherBalance: '0',
            rwdBalance: '0',
            stakingBalance: '0',
            loading: true
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