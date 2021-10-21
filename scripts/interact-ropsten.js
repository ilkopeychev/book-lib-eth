const hre = require("hardhat");

const bookLibrary = require("../artifacts/contracts/BookLibrary.sol/BookLib.json");

const run = async function () {
  const provider = new hre.ethers.providers.InfuraProvider(
    "ropsten",
    "40c2813049e44ec79cb4d7e0d18de173"
  );

  const wallet = new hre.ethers.Wallet(
    "a6c462ccb0db176d8ed1f21d1623d0972950499cb930e4a1a437f06f69f7e0b3",
    provider
  );

  const balance = await wallet.getBalance();

  const BookLibraryContract = new hre.ethers.Contract(
    "0xCd95e965f2edaA5f9227d3bC35160CA58a47151C",
    bookLibrary.abi,
    wallet
  );

  const transactionCreateBook = await BookLibraryContract.addBook("Book", 2);
  const transactionCreateBook2 = await BookLibraryContract.addBook("Kop", 5);

  const transactionReceipt = await transactionCreateBook.wait();
  const transactionReceipt2 = await transactionCreateBook2.wait();
  if (transactionReceipt.status != 1) {
    console.log("Transaction was not successfull");
    return;
  } else {
    console.log(" SUCCES TRANSACTION");
  }
  console.log(hre.ethers.utils.formatEther(balance, 18));
};

run();
