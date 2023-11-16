import { PublicClient } from "viem";
import {
  type GetTokenBalancesParameters,
  type GetTokenBalancesReturnType,
  getTokenBalances,
} from "../../actions/getTokenBalances";

export type AlchemyActions = {
  /**
   * Returns the balance of an address in wei.
   *
   * - Docs: https://viem.sh/docs/actions/public/getBalance.html
   * - JSON-RPC Methods: [`eth_getBalance`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getbalance)
   *
   * @remarks
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
   * @param args - {@link GetBalanceParameters}
   * @returns The balance of the address in wei. {@link GetBalanceReturnType}
   *
   * @example
   * import { createPublicClient, http } from 'viem'
   * import { mainnet } from 'viem/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const balance = await client.getBalance({
   *   address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
   * })
   * // 10000000000000000000000n (wei)
   */
  getTokenBalances: (
    args: GetTokenBalancesParameters
  ) => Promise<GetTokenBalancesReturnType>;
};

export const alchemyActions = (client: PublicClient): AlchemyActions => ({
  getTokenBalances: (args) => getTokenBalances(client, args),
});
