import {
  Commitment,
  Finality,
  GetAccountInfoConfig,
  GetBalanceConfig,
  GetBlockHeightConfig,
  GetBlockProductionConfig,
  GetEpochInfoConfig,
  GetInflationRewardConfig,
  GetLargestAccountsConfig,
  GetLatestBlockhashConfig,
  GetSlotConfig,
  GetSlotLeaderConfig,
  GetStakeActivationConfig,
  GetTokenAccountsByOwnerConfig,
  GetVersionedBlockConfig,
  GetVersionedTransactionConfig,
  LargestAccountsFilter,
  Message,
  PublicKey,
  SignaturesForAddressOptions,
  SignatureStatusConfig,
  TokenAccountsFilter,
} from '@solana/web3.js';

import { LibraryConfig } from 'domains/requestComposer/types/solana';
import { SolanaMethod } from 'domains/requestComposer/constants/solana';
import { isBase58 } from './validators/isBase58';
import { isBase64 } from './validators/isBase64';
import { isCommitment } from './validators/isCommitment';
import { isEd25519 } from './validators/isEd25519';
import { isFinality } from './validators/isFinality';
import { isGreaterThanOrEqualTo } from './validators/isGreaterThanOrEqualTo';
import { isInteger } from './validators/isInteger';
import { isLargestAccountsFilter } from './validators/isLargestAccountsFilter';
import { isLessThanOrEqualTo } from './validators/isLessThanOrEqualTo';

export const solanaWeb3Config: LibraryConfig = {
  [SolanaMethod.getAccountInfo]: {
    exec: (
      provider,
      publicKey: string,
      commitment?: string,
      minContextSlot?: string,
    ) => {
      const config: GetAccountInfoConfig = {
        commitment: commitment as Commitment,
        minContextSlot: minContextSlot ? Number(minContextSlot) : undefined,
      };

      return provider.getAccountInfo(new PublicKey(publicKey), config);
    },
    codeSample: () => {},
    args: [
      {
        description: 'A public key for accessing an account',
        placeholder: 'i.e. FfyafED6kiJUFwEhogyTRQHiL6NguqNg9xcdeoyyJs33',
        type: 'textfield',
        validate: isEd25519,
      },
      {
        description: 'The level of commitment desired',
        placeholder: 'i.e. processed, confirmed etc',
        type: 'textfield',
        validate: value => !value || isCommitment(value),
      },
      {
        description: 'The minimum slot that the request can be evaluated at',
        placeholder: 'i.e. 2',
        type: 'textfield',
        validate: value => !value || isInteger(value),
      },
    ],
  },
  [SolanaMethod.getBalance]: {
    exec: (
      provider,
      publicKey: string,
      commitment?: string,
      minContextSlot?: string,
    ) => {
      const config: GetBalanceConfig = {
        commitment: commitment as Commitment,
        minContextSlot: minContextSlot ? Number(minContextSlot) : undefined,
      };

      return provider.getBalance(new PublicKey(publicKey), config);
    },
    codeSample: () => {},
    args: [
      {
        description: 'A public key for accessing an account',
        placeholder: 'i.e. FfyafED6kiJUFwEhogyTRQHiL6NguqNg9xcdeoyyJs33',
        type: 'textfield',
        validate: isEd25519,
      },
      {
        description: 'The level of commitment desired',
        placeholder: 'i.e. processed, confirmed etc',
        type: 'textfield',
        validate: value => !value || isCommitment(value),
      },
      {
        description: 'The minimum slot that the request can be evaluated at',
        placeholder: 'i.e. 2',
        type: 'textfield',
        validate: value => !value || isInteger(value),
      },
    ],
  },
  [SolanaMethod.getBlock]: {
    exec: (
      provider,
      rawSlot: string,
      commitment?: string,
      rawMaxSupportedTransactionVersion?: string,
    ) => {
      const config: GetVersionedBlockConfig = {
        commitment: commitment as Finality,
        maxSupportedTransactionVersion: rawMaxSupportedTransactionVersion
          ? Number(rawMaxSupportedTransactionVersion)
          : undefined,
      };

      return provider.getBlock(Number(rawSlot), config);
    },
    codeSample: () => {},
    args: [
      {
        description: 'The slot, as integer',
        placeholder: 'i.e. 2',
        type: 'textfield',
        validate: isInteger,
      },
      {
        description: 'The level of finality desired',
        placeholder: 'i.e. confirmed or finalized',
        type: 'textfield',
        validate: value => !value || isFinality(value),
      },
      {
        description:
          'The max transaction version to return in responses. If the requested transaction is a higher version, an error will be returned',
        placeholder: 'i.e. 2',
        type: 'textfield',
        validate: value => !value || isInteger(value),
      },
    ],
  },
  [SolanaMethod.getBlockCommitment]: {
    exec: () => new Promise((_, reject) => reject(new Error('Not Supported'))),
    codeSample: () => '/* Not Supported */',
    args: [],
  },
  [SolanaMethod.getBlockHeight]: {
    exec: (provider, commitment?: string, minContextSlot?: string) => {
      const config: GetBlockHeightConfig = {
        commitment: commitment as Commitment,
        minContextSlot: minContextSlot ? Number(minContextSlot) : undefined,
      };

      return provider.getBlockHeight(config);
    },
    codeSample: () => {},
    args: [
      {
        description: 'The level of commitment desired',
        placeholder: 'i.e. processed, confirmed etc',
        type: 'textfield',
        validate: value => !value || isCommitment(value),
      },
      {
        description: 'The minimum slot that the request can be evaluated at',
        placeholder: 'i.e. 2',
        type: 'textfield',
        validate: value => !value || isInteger(value),
      },
    ],
  },
  [SolanaMethod.getBlockProduction]: {
    exec: (
      provider,
      commitment?: string,
      firstSlot?: string,
      lastSlot?: string,
      identity?: string,
    ) => {
      const isNotCommitmentOnly = [firstSlot, lastSlot, identity].some(Boolean);
      const config: GetBlockProductionConfig = {
        commitment: commitment as Commitment,
        identity,
        range: firstSlot
          ? {
              firstSlot: Number(firstSlot),
              lastSlot: Number(lastSlot),
            }
          : undefined,
      };

      const configOrCommitment = isNotCommitmentOnly
        ? config
        : (commitment as Commitment);

      return provider.getBlockProduction(configOrCommitment);
    },
    codeSample: () => {},
    args: [
      {
        description: 'The level of commitment desired',
        placeholder: 'i.e. processed, confirmed etc',
        type: 'textfield',
        validate: value => !value || isCommitment(value),
      },
      {
        description:
          'First slot to return block production information for (inclusive)',
        placeholder: 'i.e. 3',
        type: 'textfield',
        validate: value => !value || isInteger(value),
      },
      {
        description:
          'Last slot to return block production information for (inclusive). If parameter not provided, defaults to the highest slot',
        placeholder: 'i.e. 8',
        type: 'textfield',
        validate: value => !value || isInteger(value),
      },
      {
        description: 'Only return results for this validator identity',
        placeholder: 'i.e. FfyafED6kiJUFwEhogyTRQHiL6NguqNg9xcdeoyyJs33',
        type: 'textfield',
        validate: value => !value || isEd25519(value),
      },
    ],
  },
  [SolanaMethod.getBlocks]: {
    exec: (
      provider,
      startSlot: string,
      endSlot?: string,
      commitment?: string,
    ) => {
      const parsedStartSlot = Number(startSlot);
      const parsedEndSlot = endSlot ? Number(endSlot) : undefined;
      const finality = commitment as Finality;

      return provider.getBlocks(parsedStartSlot, parsedEndSlot, finality);
    },
    codeSample: () => {},
    args: [
      {
        description: 'The start slot number, as integer',
        placeholder: 'i.e. 4',
        type: 'textfield',
        validate: isInteger,
      },
      {
        description: 'The end slot number, as integer',
        placeholder: 'i.e. 8',
        type: 'textfield',
        validate: value => !value || isInteger(value),
      },
      {
        description: 'The level of finality desired',
        placeholder: 'i.e. confirmed or finalized',
        type: 'textfield',
        validate: value => !value || isFinality(value),
      },
    ],
  },
  [SolanaMethod.getBlocksWithLimit]: {
    exec: () => new Promise((_, reject) => reject(new Error('Not Supported'))),
    codeSample: () => '/* Not Supported */',
    args: [],
  },
  [SolanaMethod.getBlockTime]: {
    exec: (provider, slot: string) => {
      const parsedSlot = Number(slot);

      return provider.getBlockTime(parsedSlot);
    },
    codeSample: () => {},
    args: [
      {
        description: 'The slot number, as integer',
        placeholder: 'i.e. 4',
        type: 'textfield',
        validate: isInteger,
      },
    ],
  },
  [SolanaMethod.getClusterNodes]: {
    exec: provider => provider.getClusterNodes(),
    codeSample: () => {},
    args: [],
  },
  [SolanaMethod.getEpochInfo]: {
    exec: (provider, commitment?: string, minContextSlot?: string) => {
      const config: GetEpochInfoConfig = {
        commitment: commitment as Commitment,
        minContextSlot: minContextSlot ? Number(minContextSlot) : undefined,
      };

      return provider.getEpochInfo(config);
    },
    codeSample: () => {},
    args: [
      {
        description: 'The level of commitment desired',
        placeholder: 'i.e. processed, confirmed etc',
        type: 'textfield',
        validate: value => !value || isCommitment(value),
      },
      {
        description: 'The minimum slot that the request can be evaluated at',
        placeholder: 'i.e. 4',
        type: 'textfield',
        validate: value => !value || isInteger(value),
      },
    ],
  },
  [SolanaMethod.getEpochSchedule]: {
    exec: provider => provider.getEpochSchedule(),
    codeSample: () => {},
    args: [],
  },
  [SolanaMethod.getFeeForMessage]: {
    exec: (provider, message: string, commitment?: string) => {
      const parsedMessage = Message.from(Buffer.from(message));

      return provider.getFeeForMessage(parsedMessage, commitment as Commitment);
    },
    codeSample: () => {},
    args: [
      {
        description: 'Base-64 encoded Message',
        placeholder:
          'i.e. AQABAgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQAA',
        type: 'textfield',
        validate: isBase64,
      },
      {
        description:
          'The level of commitment desired, used for retrieving blockhash',
        placeholder: 'i.e. processed, confirmed etc',
        type: 'textfield',
        validate: value => !value || isCommitment(value),
      },
    ],
  },
  [SolanaMethod.getFirstAvailableBlock]: {
    exec: provider => provider.getFirstAvailableBlock(),
    codeSample: () => {},
    args: [],
  },
  [SolanaMethod.getGenesisHash]: {
    exec: provider => provider.getGenesisHash(),
    codeSample: () => {},
    args: [],
  },
  [SolanaMethod.getHealth]: {
    exec: () => new Promise((_, reject) => reject(new Error('Not Supported'))),
    codeSample: () => '/* Not Supported */',
    args: [],
  },
  [SolanaMethod.getHighestSnapshotSlot]: {
    exec: () => new Promise((_, reject) => reject(new Error('Not Supported'))),
    codeSample: () => '/* Not Supported */',
    args: [],
  },
  [SolanaMethod.getIdentity]: {
    exec: () => new Promise((_, reject) => reject(new Error('Not Supported'))),
    codeSample: () => '/* Not Supported */',
    args: [],
  },
  [SolanaMethod.getInflationGovernor]: {
    exec: (provider, commitment?: string) =>
      provider.getInflationGovernor(commitment as Commitment),
    codeSample: () => {},
    args: [
      {
        description: 'The level of commitment desired',
        placeholder: 'i.e. processed, confirmed etc',
        type: 'textfield',
        validate: value => !value || isCommitment(value),
      },
    ],
  },
  [SolanaMethod.getInflationRate]: {
    exec: () => new Promise((_, reject) => reject(new Error('Not Supported'))),
    codeSample: () => '/* Not Supported */',
    args: [],
  },
  [SolanaMethod.getInflationReward]: {
    exec: (
      provider,
      addresses: string,
      epoch?: string,
      commitment?: string,
      minContextSlot?: string,
    ) => {
      const parsedAddresses = addresses
        .split(',')
        .map(address => new PublicKey(address));
      const parsedEpoch = epoch ? Number(epoch) : undefined;
      const parsedMinContextSlot = minContextSlot
        ? Number(minContextSlot)
        : undefined;

      const config: GetInflationRewardConfig = {
        epoch: parsedEpoch,
        commitment: commitment as Commitment,
        minContextSlot: parsedMinContextSlot,
      };

      return provider.getInflationReward(parsedAddresses, parsedEpoch, config);
    },
    codeSample: () => {},
    args: [
      {
        description: 'Comma separated list of public keys',
        placeholder:
          'i.e. FfyafED6kiJUFwEhogyTRQHiL6NguqNg9xcdeoyyJs33, HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH',
        type: 'textarea',
        validate: value => !!value && value.split(',').every(isEd25519),
      },
      {
        description:
          'An epoch for which the reward occurs. If omitted, the previous epoch will be used',
        placeholder: 'i.e. 2',
        type: 'textfield',
        validate: value => !value || isInteger(value),
      },
      {
        description: 'The level of commitment desired',
        placeholder: 'i.e. processed, confirmed etc',
        type: 'textfield',
        validate: value => !value || isCommitment(value),
      },
      {
        description: 'The minimum slot that the request can be evaluated at',
        placeholder: 'i.e. 4',
        type: 'textfield',
        validate: value => !value || isInteger(value),
      },
    ],
  },
  [SolanaMethod.getLargestAccounts]: {
    exec: (provider, commitment?: string, filter?: string) => {
      const config: GetLargestAccountsConfig = {
        commitment: commitment as Commitment,
        filter: filter as LargestAccountsFilter,
      };

      return provider.getLargestAccounts(config);
    },
    codeSample: () => {},
    args: [
      {
        description: 'The level of commitment desired',
        placeholder: 'i.e. processed, confirmed etc',
        type: 'textfield',
        validate: value => !value || isCommitment(value),
      },
      {
        description:
          'Filter largest accounts by whether they are part of the circulating supply',
        placeholder: 'i.e. circulating or nonCirculating',
        type: 'textfield',
        validate: value => !value || isLargestAccountsFilter(value),
      },
    ],
  },
  [SolanaMethod.getLatestBlockhash]: {
    exec: (provider, commitment?: string, minContextSlot?: string) => {
      const config: GetLatestBlockhashConfig = {
        commitment: commitment as Commitment,
        minContextSlot: minContextSlot ? Number(minContextSlot) : undefined,
      };

      return provider.getLatestBlockhash(config);
    },
    codeSample: () => {},
    args: [
      {
        description: 'The level of commitment desired',
        placeholder: 'i.e. processed, confirmed etc',
        type: 'textfield',
        validate: value => !value || isCommitment(value),
      },
      {
        description: 'The minimum slot that the request can be evaluated at',
        placeholder: 'i.e. 4',
        type: 'textfield',
        validate: value => !value || isInteger(value),
      },
    ],
  },
  [SolanaMethod.getLeaderSchedule]: {
    exec: provider => provider.getLeaderSchedule(),
    codeSample: () => {},
    args: [],
  },
  [SolanaMethod.getMaxRetransmitSlot]: {
    exec: () => new Promise((_, reject) => reject(new Error('Not Supported'))),
    codeSample: () => '/* Not Supported */',
    args: [],
  },
  [SolanaMethod.getMaxShredInsertSlot]: {
    exec: () => new Promise((_, reject) => reject(new Error('Not Supported'))),
    codeSample: () => '/* Not Supported */',
    args: [],
  },
  [SolanaMethod.getMinimumBalanceForRentExemption]: {
    exec: (provider, dataLength: string, commitment?: string) =>
      provider.getMinimumBalanceForRentExemption(
        Number(dataLength),
        commitment as Commitment,
      ),
    codeSample: () => {},
    args: [
      {
        description: 'The size from rent',
        placeholder: 'i.e. 430',
        type: 'textfield',
        validate: isInteger,
      },
      {
        description: 'The level of commitment desired',
        placeholder: 'i.e. processed, confirmed etc',
        type: 'textfield',
        validate: value => !value || isCommitment(value),
      },
    ],
  },
  [SolanaMethod.getMultipleAccounts]: {
    exec: () => new Promise((_, reject) => reject(new Error('Not Supported'))),
    codeSample: () => '/* Not Supported */',
    args: [],
  },
  [SolanaMethod.getProgramAccounts]: {
    exec: () => new Promise((_, reject) => reject(new Error('Not Supported'))),
    codeSample: () => '/* Not Supported */',
    args: [],
  },
  [SolanaMethod.getRecentPerformanceSamples]: {
    exec: (provider, limit?: string) =>
      provider.getRecentPerformanceSamples(limit ? Number(limit) : undefined),
    codeSample: () => {},
    args: [
      {
        description: 'The limit, as integer',
        placeholder: 'i.e. 20',
        type: 'textfield',
        validate: value => !value || isInteger(value),
      },
    ],
  },
  [SolanaMethod.getSignaturesForAddress]: {
    exec: (
      provider,
      address: string,
      before?: string,
      until?: string,
      limit?: string,
      minContextSlot?: string,
      commitment?: string,
    ) => {
      const options: SignaturesForAddressOptions = {
        before,
        until,
        limit: limit ? Number(limit) : undefined,
        minContextSlot: minContextSlot ? Number(minContextSlot) : undefined,
      };

      return provider.getSignaturesForAddress(
        new PublicKey(address),
        options,
        commitment as Finality,
      );
    },
    codeSample: () => {},
    args: [
      {
        description: 'A queried address',
        placeholder: 'i.e. FfyafED6kiJUFwEhogyTRQHiL6NguqNg9xcdeoyyJs33',
        type: 'textfield',
        validate: isEd25519,
      },
      {
        description:
          'Start searching backwards from this transaction signature. Base-58 encoded string',
        placeholder:
          'i.e. 5h6xBEauJ3PK6SWCZ1PGjBvj8vDdWG3KpwATGy1ARAXFSDwt8GFXM7W5Ncn16wmqokgpiKRLuS83KUxyZyv2sUYv',
        type: 'textfield',
        validate: value => !value || isBase58(value),
      },
      {
        description:
          'Search until this transaction signature is reached, if found before limit. Base-58 encoded string',
        placeholder:
          'i.e. 5h6xBEauJ3PK6SWCZ1PGjBvj8vDdWG3KpwATGy1ARAXFSDwt8GFXM7W5Ncn16wmqokgpiKRLuS83KUxyZyv2sUYv',
        type: 'textfield',
        validate: value => !value || isBase58(value),
      },
      {
        description:
          'The Limit, maximum transaction signatures to return (between 1 and 1,000, default: 1,000).',
        placeholder: 'i.e. 500',
        type: 'textfield',
        validate: value =>
          !value ||
          (isInteger(value) &&
            isGreaterThanOrEqualTo(value, 1) &&
            isLessThanOrEqualTo(value, 1000)),
      },
      {
        description: 'The minimum slot that the request can be evaluated at',
        placeholder: 'i.e. 4',
        type: 'textfield',
        validate: value => !value || isInteger(value),
      },
      {
        description: 'The level of finality desired',
        placeholder: 'i.e. confirmed or finalized',
        type: 'textfield',
        validate: value => !value || isFinality(value),
      },
    ],
  },
  [SolanaMethod.getSignatureStatuses]: {
    exec: (
      provider,
      rawSignatures: string,
      searchTransactionHistory = false,
    ) => {
      const signatures = rawSignatures.split(',');

      const config: SignatureStatusConfig = { searchTransactionHistory };

      return provider.getSignatureStatuses(signatures, config);
    },
    codeSample: () => {},
    args: [
      {
        description:
          'Comma separated list transaction signatures as base-58 encoded strings',
        placeholder:
          'i.e. 5h6xBEauJ3PK6SWCZ1PGjBvj8vDdWG3KpwATGy1ARAXFSDwt8GFXM7W5Ncn16wmqokgpiKRLuS83KUxyZyv2sUYv, 5j7s6NiJS3JAkvgkoc18WVAsiSaci2pxB2A6ueCJP4tprA2TFg9wSyTLeYouxPBJEMzJinENTkpA52YStRW5Dia7',
        type: 'textarea',
        validate: value => !!value && value.split(',').every(isBase64),
      },
      {
        description:
          'If checked, a Solana node will search its ledger cache for any signatures not found in the recent status cache',
        type: 'checkbox',
      },
    ],
  },
  [SolanaMethod.getSlot]: {
    exec: (provider, commitment?: string, minContextSlot?: string) => {
      const config: GetSlotConfig = {
        commitment: commitment as Commitment,
        minContextSlot: minContextSlot ? Number(minContextSlot) : undefined,
      };

      return provider.getSlot(config);
    },
    codeSample: () => {},
    args: [
      {
        description: 'The level of commitment desired',
        placeholder: 'i.e. processed, confirmed etc',
        type: 'textfield',
        validate: value => !value || isCommitment(value),
      },
      {
        description: 'The minimum slot that the request can be evaluated at',
        placeholder: 'i.e. 4',
        type: 'textfield',
        validate: value => !value || isInteger(value),
      },
    ],
  },
  [SolanaMethod.getSlotLeader]: {
    exec: (provider, commitment?: string, minContextSlot?: string) => {
      const config: GetSlotLeaderConfig = {
        commitment: commitment as Commitment,
        minContextSlot: minContextSlot ? Number(minContextSlot) : undefined,
      };

      return provider.getSlotLeader(config);
    },
    codeSample: () => {},
    args: [
      {
        description: 'The level of commitment desired',
        placeholder: 'i.e. processed, confirmed etc',
        type: 'textfield',
        validate: value => !value || isCommitment(value),
      },
      {
        description: 'The minimum slot that the request can be evaluated at',
        placeholder: 'i.e. 4',
        type: 'textfield',
        validate: value => !value || isInteger(value),
      },
    ],
  },
  [SolanaMethod.getSlotLeaders]: {
    exec: (provider, startSlot: string, limit: string) =>
      provider.getSlotLeaders(Number(startSlot), Number(limit)),
    codeSample: () => {},
    args: [
      {
        description: 'The start slot, as integer',
        placeholder: 'i.e. 100',
        type: 'textfield',
        validate: isInteger,
      },
      {
        description: 'The limit, as integer (between 1 and 5,000)',
        placeholder: 'i.e. 10',
        type: 'textfield',
        validate: value =>
          !!value &&
          isInteger(value) &&
          isGreaterThanOrEqualTo(value, 1) &&
          isLessThanOrEqualTo(value, 5000),
      },
    ],
  },
  [SolanaMethod.getStakeActivation]: {
    exec: (
      provider,
      rawPublicKey: string,
      commitment?: string,
      rawEpoch?: string,
      minContextSlot?: string,
    ) => {
      const publicKey = new PublicKey(rawPublicKey);
      const epoch = rawEpoch ? Number(rawEpoch) : undefined;

      const config: GetStakeActivationConfig = {
        commitment: commitment as Commitment,
        epoch,
        minContextSlot: minContextSlot ? Number(minContextSlot) : undefined,
      };

      return provider.getStakeActivation(publicKey, config, epoch);
    },
    codeSample: () => {},
    args: [
      {
        description: 'A public key of stake account to query',
        placeholder: 'i.e. FfyafED6kiJUFwEhogyTRQHiL6NguqNg9xcdeoyyJs33',
        type: 'textfield',
        validate: isEd25519,
      },
      {
        description:
          'An epoch for which to calculate activation details. If parameter not provided, defaults to current epoch',
        placeholder: 'i.e. 4',
        type: 'textfield',
        validate: value => !value || isInteger(value),
      },
      {
        description: 'The level of commitment desired',
        placeholder: 'i.e. processed, confirmed etc',
        type: 'textfield',
        validate: value => !value || isCommitment(value),
      },
      {
        description: 'The minimum slot that the request can be evaluated at',
        placeholder: 'i.e. 4',
        type: 'textfield',
        validate: value => !value || isInteger(value),
      },
    ],
  },
  [SolanaMethod.getStakeMinimumDelegation]: {
    exec: (provider, commitment?: string) =>
      provider.getStakeMinimumDelegation({
        commitment: commitment as Commitment,
      }),
    codeSample: () => {},
    args: [
      {
        description: 'The level of commitment desired',
        placeholder: 'i.e. processed, confirmed etc',
        type: 'textfield',
        validate: value => !value || isCommitment(value),
      },
    ],
  },
  [SolanaMethod.getSupply]: {
    exec: (
      provider,
      commitment?: string,
      excludeNonCirculatingAccountsList?: boolean,
    ) =>
      provider.getSupply({
        commitment: commitment as Commitment,
        excludeNonCirculatingAccountsList,
      }),
    codeSample: () => {},
    args: [
      {
        description: 'The level of commitment desired',
        placeholder: 'i.e. processed, confirmed etc',
        type: 'textfield',
        validate: value => !value || isCommitment(value),
      },
      {
        description: 'Exclude non circulating accounts list from response',
        type: 'checkbox',
      },
    ],
  },
  [SolanaMethod.getTokenAccountBalance]: {
    exec: (provider, rawTokenAddress: string, commitment?: string) =>
      provider.getTokenAccountBalance(
        new PublicKey(rawTokenAddress),
        commitment as Commitment,
      ),
    codeSample: () => {},
    args: [
      {
        description: 'A public key of a token account to query',
        placeholder: 'i.e. FfyafED6kiJUFwEhogyTRQHiL6NguqNg9xcdeoyyJs33',
        type: 'textfield',
        validate: isEd25519,
      },
      {
        description: 'The level of commitment desired',
        placeholder: 'i.e. processed, confirmed etc',
        type: 'textfield',
        validate: value => !value || isCommitment(value),
      },
    ],
  },
  [SolanaMethod.getTokenAccountsByDelegate]: {
    exec: () => new Promise((_, reject) => reject(new Error('Not Supported'))),
    codeSample: () => '/* Not Supported */',
    args: [],
  },
  [SolanaMethod.getTokenAccountsByOwner]: {
    exec: (
      provider,
      rawOwnerAddress: string,
      rawMintOrProgramId: string,
      commitment?: string,
      minContextSlot?: string,
    ) => {
      const ownerAddress = new PublicKey(rawOwnerAddress);
      const mintOrProgramId = new PublicKey(rawMintOrProgramId);

      const filter: TokenAccountsFilter = {
        mint: mintOrProgramId,
        programId: mintOrProgramId,
      };

      const config: GetTokenAccountsByOwnerConfig = {
        commitment: commitment as Commitment,
        minContextSlot: minContextSlot ? Number(minContextSlot) : undefined,
      };

      return provider.getTokenAccountsByOwner(ownerAddress, filter, config);
    },
    codeSample: () => {},
    args: [
      {
        description: 'A public key of an owner account to query',
        placeholder: 'i.e. FfyafED6kiJUFwEhogyTRQHiL6NguqNg9xcdeoyyJs33',
        type: 'textfield',
        validate: isEd25519,
      },
      {
        description:
          'A public key of the specific token Mint to limit accounts to or a public key of the Token program that owns the accounts',
        placeholder: 'i.e. FfyafED6kiJUFwEhogyTRQHiL6NguqNg9xcdeoyyJs33',
        type: 'textfield',
        validate: value => !value || isEd25519(value),
      },
      {
        description: 'The level of commitment desired',
        placeholder: 'i.e. processed, confirmed etc',
        type: 'textfield',
        validate: value => !value || isCommitment(value),
      },
      {
        description: 'The minimum slot that the request can be evaluated at',
        placeholder: 'i.e. 4',
        type: 'textfield',
        validate: value => !value || isInteger(value),
      },
    ],
  },
  [SolanaMethod.getTokenLargestAccounts]: {
    exec: (provider, mintAddress: string, commitment?: string) =>
      provider.getTokenLargestAccounts(
        new PublicKey(mintAddress),
        commitment as Commitment,
      ),
    codeSample: () => {},
    args: [
      {
        description: 'A public key of the specific token Mint',
        placeholder: 'i.e. FfyafED6kiJUFwEhogyTRQHiL6NguqNg9xcdeoyyJs33',
        type: 'textfield',
        validate: isEd25519,
      },
      {
        description: 'The level of commitment desired',
        placeholder: 'i.e. processed, confirmed etc',
        type: 'textfield',
        validate: value => !value || isCommitment(value),
      },
    ],
  },
  [SolanaMethod.getTokenSupply]: {
    exec: (provider, mintAddress: string, commitment?: string) =>
      provider.getTokenSupply(
        new PublicKey(mintAddress),
        commitment as Commitment,
      ),
    codeSample: () => {},
    args: [
      {
        description: 'A public key of the specific token Mint',
        placeholder: 'i.e. FfyafED6kiJUFwEhogyTRQHiL6NguqNg9xcdeoyyJs33',
        type: 'textfield',
        validate: isEd25519,
      },
      {
        description: 'The level of commitment desired',
        placeholder: 'i.e. processed, confirmed etc',
        type: 'textfield',
        validate: value => !value || isCommitment(value),
      },
    ],
  },
  [SolanaMethod.getTransaction]: {
    exec: (
      provider,
      signature: string,
      commitment?: string,
      maxSupportedTransactionVersion?: string,
    ) => {
      const config: GetVersionedTransactionConfig = {
        commitment: commitment as Finality,
        maxSupportedTransactionVersion: maxSupportedTransactionVersion
          ? Number(maxSupportedTransactionVersion)
          : undefined,
      };

      return provider.getTransaction(signature, config);
    },
    codeSample: () => {},
    args: [
      {
        description: 'Transaction signature as base-58 encoded string',
        placeholder:
          'i.e. 2nBhEBYYvfaAe16UMNqRHre4YNSskvuYgx3M6E4JP1oDYvZEJHvoPzyUidNgNX5r9sTyN1J9UxtbCXy2rqYcuyuv',
        type: 'textfield',
        validate: isBase58,
      },
      {
        description: 'The level of finality desired',
        placeholder: 'i.e. confirmed or finalized',
        type: 'textfield',
        validate: value => !value || isFinality(value),
      },
      {
        description:
          'The max transaction version to return in responses. If the requested transaction is a higher version, an error will be returned',
        placeholder: 'i.e. 2',
        type: 'textfield',
        validate: value => !value || isInteger(value),
      },
    ],
  },
  [SolanaMethod.getTransactionCount]: {
    exec: (provider, commitment?: string, minContextSlot?: string) =>
      provider.getTransactionCount({
        commitment: commitment as Commitment,
        minContextSlot: minContextSlot ? Number(minContextSlot) : undefined,
      }),
    codeSample: () => {},
    args: [
      {
        description: 'The level of commitment desired',
        placeholder: 'i.e. processed, confirmed etc',
        type: 'textfield',
        validate: value => !value || isCommitment(value),
      },
      {
        description: 'The minimum slot that the request can be evaluated at',
        placeholder: 'i.e. 4',
        type: 'textfield',
        validate: value => !value || isInteger(value),
      },
    ],
  },
  [SolanaMethod.getVersion]: {
    exec: provider => provider.getVersion(),
    codeSample: () => {},
    args: [],
  },
  [SolanaMethod.getVoteAccounts]: {
    exec: (provider, commitment?: string) =>
      provider.getVoteAccounts(commitment as Commitment),
    codeSample: () => {},
    args: [
      {
        description: 'The level of commitment desired',
        placeholder: 'i.e. processed, confirmed etc',
        type: 'textfield',
        validate: value => !value || isCommitment(value),
      },
    ],
  },
  [SolanaMethod.isBlockhashValid]: {
    exec: () => new Promise((_, reject) => reject(new Error('Not Supported'))),
    codeSample: () => '/* Not Supported */',
    args: [],
  },
  [SolanaMethod.minimumLedgerSlot]: {
    exec: () => new Promise((_, reject) => reject(new Error('Not Supported'))),
    codeSample: () => '/* Not Supported */',
    args: [],
  },
  [SolanaMethod.requestAirdrop]: {
    exec: (provider, to: string, lamports: string) =>
      provider.requestAirdrop(new PublicKey(to), Number(lamports)),
    codeSample: () => {},
    args: [
      {
        description: 'A public key of an account to receive lamports',
        placeholder: 'i.e. FfyafED6kiJUFwEhogyTRQHiL6NguqNg9xcdeoyyJs33',
        type: 'textfield',
        validate: isEd25519,
      },
      {
        description: 'Lamports, as integer',
        placeholder: 'i.e. 1000000000',
        type: 'textfield',
        validate: isInteger,
      },
    ],
  },
  [SolanaMethod.sendTransaction]: {
    exec: () => new Promise((_, reject) => reject(new Error('Not Supported'))),
    codeSample: () => '/* Not Supported */',
    args: [],
  },
  [SolanaMethod.simulateTransaction]: {
    exec: () => new Promise((_, reject) => reject(new Error('Not Supported'))),
    codeSample: () => '/* Not Supported */',
    args: [],
  },
};
