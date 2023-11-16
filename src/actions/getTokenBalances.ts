import { PublicClient, type Address, Client } from "viem";
import { type AddressOrEnsName, isEnsName } from "../utils/ens";
import { normalize } from "path";
import { AlchemyClient } from "../client/createAlchemyClient";

export type GetTokenBalancesParameters = {
  addressOrEnsName: AddressOrEnsName;
};

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

export interface GetTokenBalancesReturnType {
  address: string;
  tokenBalances: TokenBalance[];
}

const METHOD = "alchemy_getTokenBalances";

export type GetTokenBalancesRpcSchema = {
  Method: typeof METHOD;
  Parameters: [Address];
  ReturnType: GetTokenBalancesReturnType;
};

/**
 * Returns the balance of an address in wei.
 *
 * - Docs: https://viem.sh/docs/actions/public/getBalance.html
 * - JSON-RPC Methods: [`eth_getBalance`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getbalance)
 *
 * You can convert the balance to ether units with [`formatEther`](https://viem.sh/docs/utilities/formatEther.html).
 *
 * ```ts
 * const balance = await getBalance(client, {
 *   address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   blockTag: 'safe'
 * })
 * const balanceAsEther = formatEther(balance)
 * // "6.942"
 * ```
 *
 * @param client - Client to use
 * @param parameters - {@link GetBalanceParameters}
 * @returns The balance of the address in wei. {@link GetBalanceReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getBalance } from 'viem/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const balance = await getBalance(client, {
 *   address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 * })
 * // 10000000000000000000000n (wei)
 */

export async function getTokenBalances(
  client: PublicClient,
  { addressOrEnsName }: GetTokenBalancesParameters
): Promise<GetTokenBalancesReturnType> {
  let address: Address;

  if (isEnsName(addressOrEnsName)) {
    // TODO: implement ens resolution
    const ensAddress = await client.getEnsAddress({
      name: normalize(addressOrEnsName),
    });
    if (!ensAddress) {
      throw new Error(`Could not resolve ENS name ${addressOrEnsName}`);
    }
    console.debug(`[ens] Resolved ${addressOrEnsName} to ${ensAddress}.`);
    address = ensAddress;
  } else {
    address = addressOrEnsName as Address;
  }

  const res = await (client as AlchemyClient).request({
    method: "alchemy_getTokenBalances",
    params: [address],
  });
  return res;
}
