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

    // bring Tether and RWD contracts into DecentralBank contract
    constructor(Tether _tether, RWD _rwd) {
        tether = _tether;
        rwd = _rwd;
    }
}
