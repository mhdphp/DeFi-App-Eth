// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import './Tether.sol';
import './RWD.sol';

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    // define contract Tether and RWD objects
    Tether public tether;
    RWD public rwd;

    address[] public stakers;
    // keeping track of staking address and amounts
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    // bring Tether and RWD contracts into DecentralBank contract
    constructor(Tether _tether, RWD _rwd) {
        tether = _tether;
        rwd = _rwd;
        owner = msg.sender;
    }

    // staking function
    // investors deposit a Mock Tether coin to the address of this contract
    // DecentralBank contract
    function depositTokens(uint256 _amount) public{
        require(_amount >0, 'amount can not be 0');
        // transfer Mock Tether coins to this contract address for staking
        tether.transferFrom(msg.sender, address(this), _amount);
        // update stakingBalanace
        stakingBalance[msg.sender] += _amount;
        // check if the sender has already staked (is in stakers array)
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

     // issue token rewards - RWD
     // the staker deposit Mock Tether Token and as a reward receives the 1/9 * ammount but
     // in Reward Token
        function issueTokens() public {
            // require that only the contract owner to be able to issue tokens
            require(msg.sender == owner, 'caller must be the contract owner');
            // loop to stakers array
            for (uint i=0; i<stakers.length; i++){
                address recipient = stakers[i];
                // each staker receives 1/9 of its balance staked in RWD tokens
                uint balance = stakingBalance[recipient] / 9;
                if (balance > 0){
                    rwd.transfer(recipient, balance);
                }
            }
    }

    // Unstake tokens
    function unstakedTokens() public{
        uint balance = stakingBalance[msg.sender];
        require(balance > 0,'staking balance can not be less than zero');
        // transfer the tokens to the specified contract address from decentral bank
        tether.transfer(msg.sender, balance);
        stakingBalance[msg.sender] = 0;
        isStaking[msg.sender] = false;
    }

}
