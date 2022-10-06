import { PublicKey } from '@solana/web3.js';

export const isEd25519 = (value: string): boolean => {
  try {
    return PublicKey.isOnCurve(new PublicKey(value).toBuffer());
  } catch {
    return false;
  }
};
