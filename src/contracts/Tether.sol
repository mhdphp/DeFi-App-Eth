// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


contract Tether {
    string public name = 'Mock Tether Token';
    string public symbol = 'USDT';
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8 public decimals = 18;

    event Transfer (
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval (
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    // first address is the owner the second mapping are the list of addresses with
    // their allowances to transfer
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    // transfer from owner to other address
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    // approve by the owner to third party to spend (_spender) in his behalf the _value
    function approve(address _spender, uint256 _value) public returns (bool success){
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    // transfer inter third parties
    // initiate transfer by third party(msg.sender) to transfer funds _from (owner), _to (recipient)
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        // _from is the owner of the token account
        // _ to is the recipient of the transfer
        // msg.sender is the third party approved to make the transfer on behalf of the owner (_from)
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

}
