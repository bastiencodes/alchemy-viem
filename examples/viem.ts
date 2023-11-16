import { createAlchemyClient } from "../src";

const alchemy = createAlchemyClient();
const address = "0x5e6ef723dd07eabab5b5d21f031b17fca91c8e3a";
const tokenBalances = await alchemy.getTokenBalances({ address});
console.log("tokenBalances", tokenBalances);