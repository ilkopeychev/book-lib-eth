const hre = require("hardhat");

const bookLibrary = require("../artifacts/contracts/BookLibrary.sol/BookLib.json");

const run = async function () {
  const provider = new hre.ethers.providers.InfuraProvider(
    "ropsten",
    "40c2813049e44ec79cb4d7e0d18de173"
  );

  const wallet = new hre.ethers.Wallet("my key", provider);

  const balance = await wallet.getBalance();
  console.log(hre.ethers.utils.formatEther(balance, 18));

  const BookLibraryContract = new hre.ethers.Contract(
    "0x3d73c9522a534BfC66D46B1Ad4A34C983D7d9D60",
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
};

run();
