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
  public _clients: Map<Network, AlchemyClient>;

  constructor({ networks, apiKey }: Config) {
    this._clients = initalizeClients({ networks, apiKey });
  }

  get core() {
    const clients = this._clients;
    return {
      async getTokenBalances() {
        const map = new Map();
        for (const [network, client] of clients) {
          map.set(
            network,
            await client.getTokenBalances({
              addressOrEnsName: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
            })
          );
        }
        return Object.fromEntries(map.entries());
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
