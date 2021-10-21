const hre = require("hardhat");

const bookLibrary = require("../artifacts/contracts/BookLibrary.sol/BookLib.json");

const run = async function () {
  const provider = new hre.ethers.providers.InfuraProvider(
    "ropsten",
    "40c2813049e44ec79cb4d7e0d18de173"
  );

  const wallet = new hre.ethers.Wallet(
    "not giving my private key at public repo",
    provider
  );

  const balance = await wallet.getBalance();
  console.log(hre.ethers.utils.formatEther(balance, 18));

  const BookLibraryContract = new hre.ethers.Contract(
    "0xc9707E1e496C12f1Fa83AFbbA8735DA697cdBf64",
    bookLibrary.abi,
    wallet
  );

  const transactionCreateBook = await BookLibraryContract.addBook("Book", 2);

  const transactionReceipt = await transactionCreateBook.wait();
  if (transactionReceipt.status != 1) {
    console.log("Transaction was not successfull");
    return;
  } else {
    console.log(" SUCCES TRANSACTION");
  }
};

run();
