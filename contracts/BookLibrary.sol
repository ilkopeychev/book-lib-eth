// SPDX-License-Indentifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;

import "@openzeppelin/contracts/access/Ownable.sol";

contract BookLib {     //  REMINDER DO NOT USE ARRAYs, care with mapping sync, try to use memory instead of storrage whereven you can, watch transaction expence
    uint id; // id for the books
    // address
    
 
    address public administrator;        // address of the administrator
    address[] public peopleAddresses;      // address of all people entered
    
    mapping(address=>uint[]) private addressToOwner; // addresses of the owners of the books
    
    // COUNT BOOKS
    mapping(uint => uint) public bookIdToCount;     // mapping that will help me check the count of the books.
    
    // BOOKS name
    mapping(string => uint) private bookNameToId;   // mapping that will store idS under names TO DO// display the book names to the user
    
    constructor() {      
        administrator = msg.sender; // I assume that the administrator will be the BookLib creator se everytime somebody creates lib the user will be the owner
        id=1; // book ID
    }
    
    // only administrator can add books
    function addBook(string memory _name, uint _count) public  { 
        require(msg.sender==administrator);
        bookIdToCount[id]=_count;
        bookNameToId[_name] = id;
        id++;
    }
    
   // if there is books in the map under key ID the ID will added to the result, else the number will be 0
   function getAllAvailableBooksIds() public view returns (uint[] memory){
        uint[] memory result = new uint[](id-1);   // do memory copy of the array in storrage do the checks and return the memory copy
        for(uint i=0; i< id-1; i++) {
            if(bookIdToCount[i+1]>0){
                 result[i]=i+1;
            } else {
                 result[i]=0;
            }
        }
        return result;
    }
    
    // borrowBook
    function borrowBook(uint _id) public  {
        
        require(bookIdToCount[_id]>0); // check if there is books left in the mapping
        // push book address if its new
        if(addressToOwner[msg.sender].length <=0) {
             peopleAddresses.push(msg.sender);
        }
        
        // check if there is no already borrowed book id in owner list
        uint arrayLength = addressToOwner[msg.sender].length;
        bool found=false;
        for (uint i=0; i<arrayLength; i++) {
            if(addressToOwner[msg.sender][i]==_id){
                found=true;
                break;
            }
        }
        require(!found);

            addressToOwner[msg.sender].push(_id);
    
        
        bookIdToCount[_id]--;
        
    }
    
    // show ownerBorrowedBooks 
     function getOwnersAdrressesBooks() public view returns (address[] memory){
        return peopleAddresses;
    }
    
     // return borrowBook use the same logic with the zeros, so we will know that 
    function returnBorrowedBook(uint _id) public {
        addressToOwner[msg.sender][_id-1]=0;
        bookIdToCount[_id]++;
    }
    
    function viewIdsOfOwnerBooks() public view returns (uint[] memory) { // func helper remove it later
        return addressToOwner[msg.sender];
    }
    
     function viewIdsOfOwnerLenght() public view returns (uint) { // func helper remove it later
        return addressToOwner[msg.sender].length;
    }
    
}