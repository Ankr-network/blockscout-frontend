// Request encryption public key
// Allowance
// Deposit
// Blocks counting
// Request encryption public key (optional)
// Decrypt request

export enum TopUpStep {
  start,
  publicKey,
  allowance,
  deposit,
  waitTransactionConfirming,
  login,
  done,
}
