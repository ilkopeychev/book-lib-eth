require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("deploy-testnets", "Deploys contract on a provided network").setAction(
  async (taskArguments, hre, runSuper) => {
    const deployBookLibContract = require("./scripts/deploy");
    await deployBookLibContract(taskArguments);
  }
);

subtask("print", "Prints a message")
  .addParam("message", "The message to print")
  .setAction(async (taskArgs) => {
    console.log(taskArgs.message);
  });

task("deploy-mainnet", "Deploys contract on a provided network")
  .addParam("privateKey", "Please provide the private key")
  .setAction(async ({ privateKey }) => {
    const deployElectionContract = require("./scripts/deploy-with-param");
    await deployElectionContract(privateKey);
  });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.5.7",
      },
      {
        version: "0.8.0",
      },
      {
        version: "0.6.12",
      },
    ],
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  networks: {
    ropsten: {
      url: "https://ropsten.infura.io/v3/6c17c4a175c64100b9d624c48f8e0a80",
      accounts: [
        "a6c462ccb0db176d8ed1f21d1623d0972950499cb930e4a1a437f06f69f7e0b3",
      ],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "C493V9JU8SAN8HFZTHKC6G8ZT6BYYPR1P7",
  },
};
