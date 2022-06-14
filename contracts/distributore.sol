//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract DistributoreAutomaticoDEFI{
    address public gestore;
    mapping(address => uint) public counterLitri;

    constructor(){
        gestore = msg.sender;
        counterLitri[address(this)] = 100;
    }

    function getQuantitaBenzinaInStock() public view returns (uint) {
        require(msg.sender == gestore, "Accesso riservato al gestore");
        return counterLitri[address(this)];
    }

    function restock(uint amount) public {
        require(msg.sender == gestore, "Solo il gestore puo ricaricare la stazione di servizio");
        counterLitri[address(this)]+= amount;
    }

    function acquista(uint amount) public payable{
        require(msg.value >= amount * 0.001 ether, "Importo troppo basso");
        require(counterLitri[address(this)] >= amount, "Benzina finita");
        counterLitri[address(this)] -= amount;
        counterLitri[address(msg.sender)] += amount;
    }
}