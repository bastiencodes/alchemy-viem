import {
  Address,
  Chain,
  Client,
  Transport,
  createPublicClient,
  http,
} from "viem";

type EnsName = `${string}.eth`;

type AddressOrEnsName = Address | EnsName;

type GetTokenBalancesParameters = {
  address: AddressOrEnsName;
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

const alchemyActions = (client: Client) => {
  const clientAdapter = client as Client<
    Transport,
    Chain,
    undefined,
    AlchemyRpcSchema
  >;

  return {
    getTokenBalances(
      args: GetTokenBalancesParameters
    ): Promise<GetTokenBalancesReturnType> {
      let address: Address;

      if (isEnsName(args.address)) {
        // TODO: implement ens resolution
        address = `0x1234...`;
      } else {
        address = args.address as Address;
      }

      return clientAdapter.request({
        method: "alchemy_getTokenBalances",
        params: [address],
      });
    },
  };
};

export const createAlchemyClient = (
  {
    apiKey = "alch-demo",
  }: {
    apiKey: string | undefined;
  } = { apiKey: "alch-demo" }
) => {
  return createPublicClient({
    transport: http(),
  }).extend(alchemyActions);
};
