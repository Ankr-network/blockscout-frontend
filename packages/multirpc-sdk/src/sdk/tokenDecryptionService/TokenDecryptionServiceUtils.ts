import { Web3KeyWriteProvider } from '@ankr.com/provider';
import * as ethUtil from 'ethereumjs-util';
import * as sigUtil from 'eth-sig-util';

const removeHexPrefix = (hex: string): string => {
  return hex.toLowerCase().replace('0x', '');
};

const hashPersonalMessage = (msg: string): string => {
  const buffer = Buffer.from(msg);
  const result = ethUtil.hashPersonalMessage(buffer);
  const hash = ethUtil.bufferToHex(result);

  return hash;
};

const recoverPublicKey = (sig: string, hash: string): string => {
  const sigParams = ethUtil.fromRpcSig(sig);
  const hashBuffer = Buffer.from(hash.replace('0x', ''), 'hex');
  const result = ethUtil.ecrecover(
    hashBuffer,
    sigParams.v,
    sigParams.r,
    sigParams.s,
  );
  const signer = ethUtil.bufferToHex(ethUtil.publicToAddress(result));

  return signer;
};

const recoverPersonalSignature = (sig: string, msg: string): string => {
  const hash = hashPersonalMessage(msg);
  const signer = recoverPublicKey(sig, hash);

  return signer;
};

export const getEncryptionPublicKey = async (
  keyProvider: Web3KeyWriteProvider,
) => {
  const { currentAccount: address } = keyProvider;
  const { utils, eth } = keyProvider.getWeb3();

  const messageForPersonalSign = `DO NOT SIGN THIS MESSAGE IF YOU ARE NOT SURE THAT SIGN REQUEST CAME FROM ANKR. Your address ${address.toLowerCase()}`;

  // encode message (hex)
  const dataToSign = utils.utf8ToHex(messageForPersonalSign);

  const result = await eth.personal.sign(dataToSign, address, '');

  // verify signature
  const signer = recoverPersonalSignature(result, messageForPersonalSign);
  const isVerified = signer.toLowerCase() === address.toLowerCase();

  if (!isVerified) {
    throw new Error('The signer and the address are not the same');
  }

  let derivedPrivateKey = utils.sha3(result);

  if (derivedPrivateKey == null) {
    throw new Error('Failed to generate derived private key');
  }

  derivedPrivateKey = removeHexPrefix(derivedPrivateKey);

  const derivedEncryptionPublicKey =
    sigUtil.getEncryptionPublicKey(derivedPrivateKey);

  return {
    privateKey: derivedPrivateKey,
    publicKey: derivedEncryptionPublicKey,
  };
};

export const base64StrToUtf8String = (str: string) => {
  return Buffer.from(str, 'base64').toString('utf8');
};

export const REJECTED_OPERATION_CODE = 4001;
