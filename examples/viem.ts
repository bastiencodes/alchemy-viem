import { Alchemy } from "../src";
import { createAlchemyClient } from "../src/client/createAlchemyClient";
import { Network } from "../src/client/networks";

// const viemClient = createAlchemyClient({
//   network: Network.ETH_MAINNET,
//   apiKey: process.env.ALCHEMY_API_KEY
// });

// const address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
// const ensName = "vitalik.eth";

// // TODO: add pagination
// const tokenBalances = await viemClient.getTokenBalances({
//   addressOrEnsName: ensName
// });
// console.log("Result", tokenBalances);

const alchemy = new Alchemy({
  networks: [Network.ETH_MAINNET, Network.OPT_MAINNET],
  apiKey: process.env.ALCHEMY_API_KEY as string,
});

// const address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
const ensName = "vitalik.eth";

// // TODO: add pagination
const tokenBalances = await alchemy.core.getTokenBalances();
console.log("Result", tokenBalances);
