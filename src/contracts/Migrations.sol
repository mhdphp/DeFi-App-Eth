// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contrac Migrations {
    address public owner;
    uint public last_completed_migration;

    constructor() {
        owener = msg.sender;
    }

    modifier restricted() {
        // _ in solidity means continue
        // if is true continue
        if(msg.sender == owner) _;
    }

    function set_completed(uint completed) public restricted {
        last_completed_migration = completed;
    }

    function upgrade(address new_address) public restricted {
        // instantiate new Migrations contract with new_address
        Migrations upgraded = Migrations(new_address);
        // set_completed to the new address in the new contract
        upgraded.set_completed(new_address);
    }
}