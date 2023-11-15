import { Alchemy } from "alchemy-sdk";

const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_API_KEY,
});

const blockNumber = await alchemy.core.getBlockNumber();
console.log(`Current block number: ${blockNumber}`);
