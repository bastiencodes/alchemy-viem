import {
  Chain,
  arbitrum,
  arbitrumGoerli,
  arbitrumSepolia,
  astar,
  base,
  baseGoerli,
  goerli,
  mainnet,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  polygonZkEvm,
  polygonZkEvmTestnet,
  sepolia,
} from "viem/chains";

export enum Network {
  ARB_MAINNET = "arb-mainnet",
  ARB_GOERLI = "arb-goerli",
  ARB_SEPOLIA = "arb-sepolia",
  ASTAR_MAINNET = "astar-mainnet",
  BASE_MAINNET = "base-mainnet",
  BASE_GOERLI = "base-goerli",
  ETH_MAINNET = "eth-mainnet",
  ETH_GOERLI = "eth-goerli",
  ETH_SEPOLIA = "eth-sepolia",
  MATIC_MAINNET = "polygon-mainnet",
  MATIC_MUMBAI = "polygon-mumbai",
  OPT_MAINNET = "opt-mainnet",
  OPT_GOERLI = "opt-goerli",
  POLYGONZKEVM_MAINNET = "polygonzkevm-mainnet",
  POLYGONZKEVM_TESTNET = "polygonzkevm-testnet",
}

/* TODOs: 
 - add alchemy urls to chains without config (Arb Sepolia, Astar Mainnet, Polygon zkEvm)
 - add Astar testnet?
 - add websocket urls
*/
const chainToUrl: Record<Network, { chain: Chain; url: string }> = {
  [Network.ARB_MAINNET]: {
    chain: arbitrum,
    url: arbitrum.rpcUrls.alchemy.http as unknown as string,
  },
  [Network.ARB_GOERLI]: {
    chain: arbitrumGoerli,
    url: arbitrumGoerli.rpcUrls.alchemy.http as unknown as string,
  },
  [Network.ARB_SEPOLIA]: {
    chain: arbitrumSepolia,
    url: "https://arb-sepolia.g.alchemy.com/v2",
  },
  [Network.ASTAR_MAINNET]: {
    chain: astar,
    url: "https://astar-mainnet.g.alchemy.com/v2",
  },
  [Network.BASE_MAINNET]: {
    chain: base,
    url: base.rpcUrls.alchemy.http as unknown as string,
  },
  [Network.BASE_GOERLI]: {
    chain: baseGoerli,
    url: baseGoerli.rpcUrls.alchemy.http as unknown as string,
  },
  [Network.ETH_MAINNET]: {
    chain: mainnet,
    url: mainnet.rpcUrls.alchemy.http as unknown as string,
  },
  [Network.ETH_GOERLI]: {
    chain: goerli,
    url: goerli.rpcUrls.alchemy.http as unknown as string,
  },
  [Network.ETH_SEPOLIA]: {
    chain: sepolia,
    url: sepolia.rpcUrls.alchemy.http as unknown as string,
  },
  [Network.MATIC_MAINNET]: {
    chain: polygon,
    url: polygon.rpcUrls.alchemy.http as unknown as string,
  },
  [Network.MATIC_MUMBAI]: {
    chain: polygonMumbai,
    url: polygonMumbai.rpcUrls.alchemy.http as unknown as string,
  },
  [Network.OPT_MAINNET]: {
    chain: optimism,
    url: optimism.rpcUrls.alchemy.http as unknown as string,
  },
  [Network.OPT_GOERLI]: {
    chain: optimismGoerli,
    url: optimismGoerli.rpcUrls.alchemy.http as unknown as string,
  },
  [Network.POLYGONZKEVM_MAINNET]: {
    chain: polygonZkEvm,
    url: "https://polygonzkevm-mainnet.g.alchemy.com/v2",
  },
  [Network.POLYGONZKEVM_TESTNET]: {
    chain: polygonZkEvmTestnet,
    url: "https://polygonzkevm-testnet.g.alchemy.com/v2",
  },
};

export const getNetworkChainAndUrl = ({
  network,
  apiKey,
}: {
  network: Network;
  apiKey: string;
}): { chain: Chain; rpcUrl: string } => {
  const found = chainToUrl[network];
  if (!found) {
    throw new Error(`${network} not supported!`);
  }
  return {
    chain: found.chain,
    rpcUrl: found.url + `/${apiKey}`,
  };
};
