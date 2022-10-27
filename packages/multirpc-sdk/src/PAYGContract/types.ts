import { PrefixedHex } from '../common';

export interface IPAYGContractManagerConfig {
  payAsYouGoAnkrTokenContractAddress: PrefixedHex;
  payAsYouGoContractAddress: PrefixedHex;
  payAsYouGoContractCreationBlockNumber: number;
}
