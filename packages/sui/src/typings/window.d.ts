export {};

declare global {
  interface Window {
    suiWallet?: {
      getAccounts(): Promise<string[]>;
      requestPermissions(): Promise<void>;
      hasPermissions(): Promise<boolean>;
    };
  }
}
