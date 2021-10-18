// SPDX-License-Indentifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;
import "./Ownable.sol";

contract BookLib is Ownable {     //  REMINDER DO NOT USE ARRAYs, care with mapping sync, try to use memory instead of storrage whereven you can, watch transaction expence

    // address
    
 

    address[] private peopleAddresses;      // address of all people that took books
    
    mapping(address=>BorrowedBook) private addressToOwner; // addresses of the owners of the books
    mapping(bytes32=>Book) private bytesToBooks;
    
    bytes32[] private availableBooksIds;
    
    struct Book {
        string name;
        uint count;
        // mapping(address=>mapping(bytes32=>Book)) bookOwners;
    }
    
    struct BorrowedBook {
        bytes32 id;
        bool isBorrowed;
        bool isValue; 
    }
    
    
    // only administrator can add books
    function addBook(string calldata _name, uint _count) public onlyOwner {
        bytes32 bookByteId = stringToBytes32(_name); 
        bytesToBooks[bookByteId]=Book(_name,_count);     // BOOKS name to bytes and use it for ID
        availableBooksIds.push(bookByteId);
    }

    // user can borrow just 1 copy of a book
    function borrowBook(bytes32 _id) public  {
        require(bytesToBooks[_id].count>0 && addressToOwner[msg.sender].isBorrowed==false);
        if(!addressToOwner[msg.sender].isValue) {
             peopleAddresses.push(msg.sender);
        }
        
        bytesToBooks[_id].count--;
        addressToOwner[msg.sender]=BorrowedBook(_id,true,true);
    }
    
    // return borrowBook
    function returnBorrowedBook(bytes32 _id) public {
        addressToOwner[msg.sender].isBorrowed=false;
        bytesToBooks[_id].count++;
    }
    
    // show all owners that BorrowedBooks 
     function getOwnersAdrressesBooks() public view returns (address[] memory){
        return peopleAddresses;
    }
    
    // return available books
    function getAvailableBookIds() public view returns (bytes32[] memory bookIDS) {
        bookIDS = availableBooksIds;
    }
    
    // function getBook(bytes32 _id) public view returns(Book memory) {
    //     return bytesToBooks[_id];
    // }

    function stringToBytes32(string memory source) private pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }
}