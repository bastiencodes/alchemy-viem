import { Address } from "viem";

const ENS_SUFFIX = ".eth";

export type EnsName = `${string}.eth`;

export type AddressOrEnsName = Address | EnsName;

export const isEnsName = (addressOrEnsName: AddressOrEnsName): boolean =>
  addressOrEnsName.endsWith(ENS_SUFFIX);
