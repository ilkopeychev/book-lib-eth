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
    const deployElectionContract = require("./scripts/deploy");
    await deployElectionContract(taskArguments);
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
        "96bd1a183b1a8452ccd3f3aacdeed094551c06b5185919521ef2be7f5621206b",
      ],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "C493V9JU8SAN8HFZTHKC6G8ZT6BYYPR1P7",
  },
};
