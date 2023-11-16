import {
  createPublicClient,
  http,
  type Chain,
  type Client,
  type PublicActions,
  type PublicRpcSchema,
  type Transport,
} from "viem";
import { GetTokenBalancesRpcSchema } from "../actions/getTokenBalances";
import { AlchemyActions, alchemyActions } from "./decorators/alchemy";
import { Network, getNetworkChainAndUrl } from "./networks";

type AlchemyRpcSchema = [GetTokenBalancesRpcSchema];

export type AlchemyClient<
  TTransport extends Transport = Transport,
  TChain extends Chain | undefined = Chain | undefined
> = Client<
  TTransport,
  TChain,
  undefined,
  [...PublicRpcSchema, ...AlchemyRpcSchema],
  PublicActions<TTransport, TChain> & AlchemyActions
>;

export const createAlchemyClient = ({
  network,
  apiKey,
}: {
  network: Network;
  apiKey: string;
}): AlchemyClient => {
  const { chain, rpcUrl } = getNetworkChainAndUrl({
    network,
    apiKey,
  });
  return createPublicClient({
    chain,
    // TODO: support websocket
    transport: http(rpcUrl),
  }).extend(alchemyActions);
};
