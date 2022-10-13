import Web3 from 'web3';

interface IGenerateLogIdArgs {
  blockHash?: string;
  transactionHash?: string;
  logIndex?: string;
}

/**
 * @return  custom log id
 */
export const generateLogId = ({
  blockHash,
  transactionHash,
  logIndex,
}: IGenerateLogIdArgs): string | null => {
  const hasAllArgs =
    typeof blockHash === 'string' &&
    typeof transactionHash === 'string' &&
    typeof logIndex === 'string';

  if (!hasAllArgs) {
    return null;
  }

  const shaId = Web3.utils.sha3(
    blockHash.replace('0x', '') +
      transactionHash.replace('0x', '') +
      logIndex.replace('0x', ''),
  );

  return shaId ? `log_${shaId.replace('0x', '').substr(0, 8)}` : null;
};
