const hre = require("hardhat");
const ethers = hre.ethers;

async function deployElectionContract() {
  await hre.run("compile"); // We are compiling the contracts using subtask
  const [deployer] = await ethers.getSigners(); // We are getting the deployer

  console.log("Deploying contracts with the account:", deployer.address); // We are printing the address of the deployer
  console.log("Account balance:", (await deployer.getBalance()).toString()); // We are printing the account balance

  const BookLibrary = await ethers.getContractFactory("BookLib"); //
  const BookLibraryContract = await BookLibrary.deploy();
  console.log("Waiting for BookLibrary deployment...");
  await BookLibraryContract.deployed();

  console.log("BookLibrary Contract address: ", BookLibraryContract.address);
  console.log("Done!");
  await hre.run("verify:verify", {
    address: BookLibrary.address,
    constructorArguments: [
      // if any
    ],
  });
}

module.exports = deployElectionContract;
