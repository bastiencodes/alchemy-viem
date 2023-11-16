import { Address } from "viem";
import {
  AlchemyClient,
  createAlchemyClient,
} from "./client/createAlchemyClient";
import { Network } from "./client/networks";

type Config = {
  apiKey: string;
  networks: Network[];
};

export class Alchemy {
  private _config: Config;
  public _client: AlchemyClient;
  public _clients: Map<Network, AlchemyClient>;

  constructor({ networks, apiKey }: Config) {
    this._config = { networks, apiKey };
    this._client = createAlchemyClient({ network: networks[0], apiKey });
    this._clients = initalizeClients({ networks, apiKey });
  }

  get core() {
    const client = this._client;
    const clients = this._clients;
    return {
      async getTokenBalances(owner: string) {
        // const map = new Map();
        // for (const [network, client] of clients) {
        //   map.set(
        //     network,
        //     await client.getTokenBalances({
        //       addressOrEnsName: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        //     })
        //   );
        // }
        // return Object.fromEntries(map.entries());
        return await client.getTokenBalances({
          addressOrEnsName: owner as Address,
        });
      },
    };
  }

  get nft() {
    const that = this;
    return {
      getNfts(owner: string) {
        const apiKey = that._config.apiKey;
        const url = `https://eth-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner?owner=${owner}&withMetadata=true&pageSize=100`;
        return fetch(url);
      },
    };
  }

  get wallet() {
    const that = this;
    return {
      async getBalances(address: string) {
        const erc20 = await that.core.getTokenBalances(address);
        const nfts = await that.nft.getNfts(address).then((res) => res.json());
        return { erc20, nfts };
      },
    };
  }
}

function initalizeClients({ networks, apiKey }: Config) {
  return new Map<Network, AlchemyClient>(
    networks.map((network) => [
      network,
      createAlchemyClient({ network, apiKey }),
    ])
  );
}
