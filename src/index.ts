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
  public _clients: AlchemyClient[];

  constructor({ networks, apiKey }: Config) {
    this._clients = initalizeClients({ networks, apiKey });
  }
}

function initalizeClients({ networks, apiKey }: Config) {
  return networks.map((network) => {
    return createAlchemyClient({
      network,
      apiKey,
    });
  });
}
