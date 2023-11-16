import { createAlchemyClient } from "../src";
import { Network } from "../src/client/networks";

const alchemy = createAlchemyClient({
  network: Network.ETH_MAINNET,
  apiKey: process.env.ALCHEMY_API_KEY
});

const address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
const ensName = "vitalik.eth";

// TODO: add pagination
const tokenBalances = await alchemy.getTokenBalances({
  addressOrEnsName: ensName
});
console.log("Result", tokenBalances);