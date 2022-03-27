// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


contract Tether {
    string name = 'Tether';
    string symbol = 'USDT';
    uint256 totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8 public decimals = 18;
}
