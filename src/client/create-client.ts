import {
  Address,
  Chain,
  Client,
  PublicClient,
  Transport,
  createPublicClient,
  http,
} from "viem";
import { Network, getNetworkChainAndUrl } from "./networks";
import { normalize } from "viem/ens";

type EnsName = `${string}.eth`;

type AddressOrEnsName = Address | EnsName;

type GetTokenBalancesParameters = {
  addressOrEnsName: AddressOrEnsName;
};

export interface GetTokenBalancesReturnType {
  address: string;
  tokenBalances: TokenBalance[];
}

type TokenBalance = TokenBalanceSuccess | TokenBalanceFailure;

interface TokenBalanceSuccess {
  contractAddress: string;
  tokenBalance: string;
  error: null;
}

interface TokenBalanceFailure {
  contractAddress: string;
  tokenBalance: null;
  error: string;
}

type GetTokenBalancesRpcSchema = {
  Method: "alchemy_getTokenBalances";
  Parameters: [Address];
  ReturnType: GetTokenBalancesReturnType;
};

type AlchemyRpcSchema = [GetTokenBalancesRpcSchema];

const isEnsName = (addressOrEnsName: AddressOrEnsName): boolean =>
  addressOrEnsName.endsWith(".eth");

const alchemyActions = (client: PublicClient) => {
  const clientAdapter = client as Client<
    Transport,
    Chain,
    undefined,
    AlchemyRpcSchema
  >;

  return {
    async getTokenBalances(
      args: GetTokenBalancesParameters
    ): Promise<GetTokenBalancesReturnType> {
      let address: Address;

      if (isEnsName(args.addressOrEnsName)) {
        // TODO: implement ens resolution
        const ensAddress = await client.getEnsAddress({
          name: normalize(args.addressOrEnsName),
        });
        if (!ensAddress) {
          throw new Error(
            `Could not resolve ENS name ${args.addressOrEnsName}`
          );
        }
        console.debug(`[ens] Resolved ${args.addressOrEnsName} to ${ensAddress}.`);
        address = ensAddress;
      } else {
        address = args.addressOrEnsName as Address;
      }

      return clientAdapter.request({
        method: "alchemy_getTokenBalances",
        params: [address],
      });
    },
  };
};

export const createAlchemyClient = ({
  network,
  apiKey = "alch-demo",
}: {
  network: Network;
  apiKey: string | undefined;
}) => {
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
