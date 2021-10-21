const hre = require("hardhat");

const bookLibrary = require("../artifacts/contracts/BookLibrary.sol/BookLib.json");

const run = async function () {
  const provider = new hre.ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  const latestBlock = await provider.getBlock("latest");
  console.log(latestBlock.hash);

  const wallet = new hre.ethers.Wallet(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
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
